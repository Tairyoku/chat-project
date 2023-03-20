<template>
  <div class="user__message">
    <div class="user__data" :style="isBottomLeftRadiusEnable()">
      <div class="container__icon" v-if="chat.types == `public`">
        <div style="width: 48px;" v-if="user.icon == ``">
          {{ getChatIcon }}
        </div>
          <el-image v-else
            class="container__image"
            :src="getImageUrl"
            :fit="fit"
          />
      </div>
      <div class="user__info">
        <div class="user__name" v-if="chat.types == `public`">
          <em>{{ user.username }}</em>
        </div>
        <div class="user__text">
          {{ message.text }}
        </div>
        <div class="user__time">
          {{ getTime() }}
        </div>
      </div>
    </div>
    <div class="user__tail" v-if="tail">
      <div class="user__lasts"></div>
      <div class="user__clean"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE_SMALL } from "@/api/routes";
import { IChat, IUser } from "@/store/models";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    message: Object,
    tail: Boolean,
  },
  data():{
      fit: string,
      user: IUser,
      chat: IChat,
    } {
    return {
      fit: "cover",
      user: {} as IUser,
      chat: {} as IChat,
    };
  },
  computed: {
    ...mapGetters(["UPDATER",]),
    getImageUrl(): string {
      if (this.user.icon) return IMAGE_SMALL(this.user.icon);
      return ""
    },
     getChatIcon(): string {
      return this.user.username?.length < 4
        ? this.user.username
        : this.user.username?.split("").slice(0, 3).join("");
    },
  },
  watch: {
    message() {
      this.getUser();
      this.getChat()
      this.getTime()
    },
    UPDATER() {
      this.getUser();
      this.getChat()
      this.getTime()
    }
  },
  methods: {
    isBottomLeftRadiusEnable() {
      if (this.tail) return "border-bottom-left-radius: 0; border-bottom: 0";
    },
    getTime() {
      let date = new Date(Date.parse(this.message.sent_at));
      return date.toTimeString().replace(/:[0-9]{2,2} .*/, "");
    },
    getUser() {
      this.$store
        .dispatch("getUser", this.message.author)
        .then((res) => this.user = res);
    },
    getChat() {
      this.$store
        .dispatch("getChat", this.message.chat_id)
        .then((res) => this.chat = res);
    },
  },
  mounted() {
    this.getUser();
  },
});
</script>

<style scoped>
.user__message {
  margin: 16px;
  width: 45%;
  cursor: default;
}
.user__data {
  display: flex;
  background-color: #d5d54070;
  padding: 8px 16px;
  border-radius: 8px;
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
  background-color: rgb(232, 97, 47);
}
.container__image {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
}
.user__info {
  width: calc(100% - 48px);
  padding-left: 16px;
}
.user__name {
  text-align: left;
  font-size: 14px;
  margin-bottom: 8px;
}
.user__text {
  text-align: justify;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  width: 80%;
  font-size: 18px;
}
.user__time {
  text-align: right;
  font-size: 12px;
}

.user__tail {
  width: 100%;
  background-color: #d5d54070;
  height: 16px;
  display: flex;
}
.user__clean {
  width: 100%;
  background-color: #f2e8c2;
  border-top-left-radius: 16px;
}
.user__lasts {
  width: 0%;
}
</style>
