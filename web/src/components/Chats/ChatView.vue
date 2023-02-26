<template>
  <div class="chat-view">
    <Search />
    <div class="chat__list">
      <ul>
        <li class="chat__create">
          <div
            v-if="!inputChatVisible"
            @click="setInputChatVisible"
            style="height: 40px"
            class="chat__create-button"
          >
            <span slot="label">
              <i class="el-icon-circle-plus-outline"></i>
              Новий чат
            </span>
          </div>
          <div v-else>
            <el-input
              class="chat__create-form"
              v-model="chatName"
              style="margin-bottom: 4px"
              placeholder="Введіть назву"
            />
            <div style="display: flex; justify-content: space-between">
              <el-button class="chat__create-form" v-on:click="createChat">
                Створити
              </el-button>
              <el-button class="chat__create-form" v-on:click="cancelCreate">
                Назад
              </el-button>
            </div>
          </div>
        </li>
        <li v-for="item in PUBLIC_CHAT_LIST" :key="item.id">
          <div @click="openChat(item.id)">
            <ChatContainer :chat="item" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Search from "@/components/Chats/Search.vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";

export default Vue.extend({
  data(): {
    chatName: string;
    inputChatVisible: boolean;
  } {
    return {
      chatName: "",
      inputChatVisible: false,
    };
  },
  components: {
    ChatContainer,
    Search,
  },
  computed: {
    ...mapGetters(["PUBLIC_CHAT_LIST", "USER_ID", "CHAT_ID", "UPDATER"]),
  },
  methods: {
    openChat(chatId: number) {
      if (this.CHAT_ID != chatId) {
        this.$router
          .push(`/chat/${chatId}`)
          .then(() => this.$store.commit("setChatId", chatId));
      }
    },
    setInputChatVisible() {
      this.inputChatVisible = !this.inputChatVisible;
    },
    createChat() {
      if (this.chatName?.length == 0) return;
      this.$store
        .dispatch("createPublicChat", this.chatName)
        .then(() => this.$store.dispatch("getUserPublicChats", this.USER_ID));
      this.cancelCreate();
    },
    cancelCreate() {
      this.chatName = "";
      this.setInputChatVisible();
    },
  },
  watch: {
    UPDATER() {
      this.$store.dispatch("getUserPublicChats", this.USER_ID);
    },
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 16px;
}
ul {
  padding-inline-start: 0px;
  margin-block-start: 0;
  margin-block-end: 0;
}
.chat-view {
  height: calc(100vh - 32px - 2px);
  width: inherit;
}
.chat__list {
  overflow-x: hidden;
  overflow-y: auto;
  height: -webkit-fill-available;
}
.chat__create {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 12px;
  background-color: rgba(207, 49, 186, 0);
  border: 2px solid #c1ab18;
  box-shadow: 2px -2px 4px 4px #c1ab1882;
  margin: 8px;
  color: #245f1a;
  margin-bottom: 16px;
}
.chat__create-button {
  height: 48px;
  cursor: pointer;
  font-size: 24px;
  display: contents;
}
.chat__create-form {
  box-shadow: 0px 0px 2px 2px #c1ab1882;
  color: #245f1a;
  border-radius: 8px;
}
:deep(.el-input__inner:focus),
:deep(.el-input__inner:hover) {
  border-color: #afec4d;
}
:deep(.el-input__inner) {
  color: #245f1a;
}
:deep(.el-input__inner::placeholder) {
  color: #245f1a8c;
}
:deep(.el-button:hover),
:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
}
.chat__list::-webkit-scrollbar {
  width: 12px;
}
.chat__list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.chat__list::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  /* outline: 1px solid rgb(182, 20, 20); */
  border-radius: 4px;
}
</style>
