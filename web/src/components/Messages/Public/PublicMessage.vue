<template>
    <div class="message__public">
      <div class="public__data" :style="clearBottomLeftRadius()">
        <div class="container__icon">
      <div class="" v-if="user.icon == ''">
        {{ getChatIcon() }}
      </div>
      <div class="" v-else>
        <el-image
          class="container__image"
          :src="imgUrl"
          :fit="fit"
        ></el-image>
      </div>
    </div>
        <div class="public__info">
          <div class="public__name">
            {{ user.username }} 
          </div>
          <div class="public__text">
            {{ message.text }}
          </div>
          <div class="public__time">
            {{ getTime() }}
          </div>
        </div>
      </div>
      <div class="public__tail" v-if="tail">
        <div class="public__lasts"></div>
        <div class="public__clean"></div>
      </div>
    </div>
</template>

<script lang="ts">
import { IMessage, IUser } from "@/store/models";
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMAGE_SMALL } from "@/api/routes";

export default Vue.extend({
  props: {
    message: Object,
    tail: Boolean,
  },
  data() {
    return {
      fit: "cover",
      user: {} as IUser,
    };
  },
  components: {},
  computed: {
imgUrl():string {
      return IMAGE_SMALL(this.user.icon)
    }
  },
  watch: {
    message() {
      this.getUser()
      this.getTime()
      this.getChatIcon()
    }
  },
  methods: {
    clearBottomLeftRadius() {
      if (this.tail) return "border-bottom-left-radius: 0; border-bottom: 0";
    },
    getTime() {
      let date = new Date( Date.parse(this.message.sent_at) )
      return date
        .toTimeString()
        .replace(/:[0-9]{2,2} .*/, "")
    },
    getUser() {
      this.$store
        .dispatch("getUser", this.message.author)
        .then((res) => (this.user = res));
    },
    getChatIcon(): string {
      return this.user.username?.length < 4 ? this.user.username : this.user.username?.split("").slice(0, 3).join("");
    },
  },
  mounted() {
    this.getUser();
  },
});
</script>

<style scoped>
.message__public {
  margin: 16px;
  width: 45%;
}
.public__data {
  display: flex;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgb(66, 168, 241);
  box-shadow: 0px 0px 10px rgb(66, 168, 241, 0.3);
}
.container__icon {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 20px;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  color: white;
  background-color: rgb(207, 49, 186);
}
.container__image {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  display: flex;
}
.public__info{
  width: calc(100% - 48px);
  padding-left: 16px;
}
.public__name {
  text-align: left;
  font-size: 12px;
}
.public__text {
  text-align: justify;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  width: 80%;
}
.public__time {
  text-align: right;
  font-size: 12px;
}
.public__tail {
  width: 100%;
  height: 16px;
  display: flex;
}
.public__lasts {
  width: 0%;
  border-left: 1px solid rgb(66, 168, 241);
  box-shadow: 0px 0px 10px rgb(66, 168, 241, 0.3) inset;
}
.public__clean {
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-left: 1px solid rgb(66, 168, 241);
  border-top: 1px solid rgb(66, 168, 241);
  margin-right: 8px;
  z-index: -1;
}
</style>
