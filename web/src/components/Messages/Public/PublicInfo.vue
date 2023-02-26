<template>
  <div class="info">
    <el-image
      v-if="chat.icon?.length != 0"
      class="container__image"
      :src="getImageUrl"
      :fit="fit"
    />
    <div class="container__none" v-else>
      <i class="el-icon-picture-outline"></i>
    </div>
    <div class="info__username">
      {{ chat.name }}
    </div>
    <span>Користувачі</span>
    <div class="info__list">
      <ul class="info__users-list">
        <li v-for="item in usersList" :key="item.id">
            <UserContainer @click="getChat(item.id)" :user="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMAGE } from "@/api/routes";
import { IChat, IUser } from "@/store/models";
import UserContainer from "@/components/Users/UserContainer.vue";
import UploadImage from "@/components/Messages/UploadImage.vue";

export default Vue.extend({
  data():{
      fit: string,
      usersList: IUser[],
      chat: IChat,
    } {
    return {
      fit: "cover",
      usersList: [] as IUser[],
      chat: {} as IChat,
    };
  },
  components: {
    UploadImage,
    UserContainer,
  },
  computed: {
    ...mapGetters(["WEB_SOCKET", "USER_ID", "CHAT_ID"]),
    getImageUrl(): string {
      if (this.chat.icon) return IMAGE(this.chat.icon);
      return "";
    },
  },
  methods: {
    getUsersList() {
      this.$store.dispatch("getChatUsers", this.CHAT_ID)
      .then((res) => this.usersList = res.list);
    },
    getChat(id: number) {
      this.$store.dispatch("createPrivateChat", id)
      .then((res) => {
        this.$router.push(`/chat/${res}`);
        this.$store.commit("setChatId", res);
        if (this.WEB_SOCKET.readyState != undefined) {
          this.$store.commit("closeSocket");
        }
        this.$store.dispatch("openWebsocket", res);
        this.$store.dispatch("getUserPrivateChats", this.USER_ID);
      });
    },
  },
  watch: {
    CHAT_ID() {
      this.$store.dispatch("getChat", this.CHAT_ID)
      .then((res) => this.chat = res);
      this.getUsersList();
    },
  },
  mounted() {
    this.$store
      .dispatch("getChat", this.CHAT_ID)
      .then((res) => this.chat = res);
    this.getUsersList();
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 8px;
}
span {
  display: flex;
  margin: 8px 20px; 
  font-size: 20px;
}
.info {
  margin-top: -20px;
  min-width: 200px;
  min-height: 200px;
  width: inherit;
  color: #14340e;
  height: inherit;
  max-height: 100vh;
}
.container__image {
  height: 25vh;
}
.info__username {
  margin: 16px 20px;
  font-size: 24px;
  text-align: start;
}
.info__list {
  border-radius: 12px;
  border: 2px solid rgb(166, 228, 41);
}
.info__users-list {
  overflow: auto;
  height: 35vh;
  margin-left: 0;
  padding-left: 0;
}
.container__none {
  height: 25vh;
  background-color: rgb(236, 239, 197);
  color: rgb(103, 138, 32);
  font-size: 40px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-form-item__content) {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
:deep(.el-col-8) {
  width: 80%;
  margin: 0 auto;
}
:deep(.el-card__body) {
  padding: 8px;
}
:deep(.el-card__body) {
  display: flex;
  margin: 0 auto;
  padding: 8px;
  width: 80%;
  justify-content: space-between;
}

:deep(.el-form-item) {
  margin-bottom: 8px;
}
.info__users-list::-webkit-scrollbar {
  width: 12px;
}
.info__users-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.info__users-list::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>
