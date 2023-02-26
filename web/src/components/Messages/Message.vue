<template>
  <div id="message">
    <div class="message__personal" v-if="USER_ID == message.author">
      <!-- Мої повідомлення -->
      <div class="personal__data" :style="isRightRadius()">
        <div class="personal__text">
          {{ message.text }}
        </div>
        <div class="sent__time">
          {{ getTime() }}
        </div>
      </div>
      <div class="sent__tail" v-if="tail">
        <div class="sent__clean"></div>
        <div class="sent__lasts"></div>
      </div>
    </div>
    <div class="got" v-else @click="getTime()">
      <div class="got__data" :style="isLeftRadius()">
        <div class="container__icon">
          {{ getChatIcon() }} 
        </div>
        <div class="got__info">
          <div class="sent__name">
            {{ user.username }} 
          </div>
          <div class="sent__text">
            {{ message.text }}
          </div>
          <div class="sent__time">
            {{ getTime() }}
          </div>
        </div>
      </div>
      <div class="got__tail" v-if="tail">
        <div class="got__lasts"></div>
        <div class="got__clean"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMessage, IUser } from "@/store/models";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    message: Object,
    tail: Boolean,
  },
  data() {
    return {
      messag: {} as IMessage,
      userId: 0,
      user: {} as IUser,
    };
  },
  components: {},
  computed: {
...mapGetters([
  'USER_ID'
]),
  },
  watch: {
    message() {
      this.getUser()
      this.getTime()
      this.getChatIcon()
    }
  },
  methods: {
    isRightRadius() {
      if (this.tail) return "border-bottom-right-radius: 0; ";
    },
    isLeftRadius() {
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
      // if (this.message.name === undefined) return "";
      return this.user.username?.length < 4 ? this.user.username : this.user.username?.split("").slice(0, 3).join("");
    },
  },
  mounted() {
    this.getUser();
  },
});
</script>

<style>
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
.message__personal {
  margin: 16px;
  width: 45%;
  margin-left: auto;
}
.personal__data {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #aeeb4d7a;;
}
.personal__text,
.got__text {
  text-align: justify;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  width: 80%;
}
.sent__name {
  text-align: left;
  font-size: 12px;
}
.sent__time,
.got__time {
  text-align: right;
  font-size: 12px;
}
.sent__tail {
  width: 100%;
  height: 16px;
  display: flex;
  background-color: rgb(66, 168, 241);
}
.sent__clean {
  width: 100%;
  background-color: white;
  border-top-right-radius: 16px;
}
.sent__lasts {
  width: 0%;
}

.got {
  margin: 16px;
  width: 45%;
}
.got__data {
  display: flex;
  background-color: #d5d54070;
    box-shadow: 0px 0px 10px rgb(173 255 0 / 51%);
  padding: 8px 16px;
  border-radius: 8px;
}
.got__tail {
  width: 100%;
  height: 16px;
  display: flex;
}
.got__clean {
  width: 100%;
  background-color: white;
  border-top-left-radius: 16px;
  border-left: 1px solid rgb(66, 168, 241);
  border-top: 1px solid rgb(66, 168, 241);
  margin-right: 8px;

  z-index: -1;
}
.got__lasts {
  width: 0%;
  border-left: 1px solid rgb(66, 168, 241);
  box-shadow: 0px 0px 10px rgb(66, 168, 241, 0.3) inset;
}
.got__info{
  width: calc(100% - 48px);
  padding-left: 16px;
}
</style>
