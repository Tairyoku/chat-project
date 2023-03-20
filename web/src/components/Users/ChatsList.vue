<template>
  <div class="chatlist">
    <ul>
      <li v-for="item in PRIVATE_CHAT_LIST" :key="item.id">
        <div class="" @click="getChat(item.id)">
          <ChatContainer :chat="item" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IChat } from "@/store/models";
import ChatContainer from "@/components/Chats/ChatContainer.vue";

export default Vue.extend({
  data(): {
    privateChats: IChat[];
  } {
    return {
      privateChats: [] as IChat[],
    };
  },
  components: {
    ChatContainer,
  },
  watch: {
    UPDATER() {
      this.$store.dispatch("getUserPrivateChats", this.USER_ID);
    },
  },
  methods: {
    getChat(chatId: number) {
      if (this.CHAT_ID != chatId) {
        this.$router
          .push(`/chat/${chatId}`)
          .then(() => this.$store.commit("setChatId", chatId));
      this.$store.dispatch("usersList", this.USER_ID);

      }
    },
  },
  computed: {
    ...mapGetters(["PRIVATE_CHAT_LIST", "CHAT_ID", "UPDATER", "USER_ID"]),
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 16px;
}

ul {
  padding-top: 12px;
  padding-inline-start: 0px;
  margin-block-start: 0;
  margin-block-end: 0;
}

.chatlist {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 20px - 44px - 64.8px - 44px);
}

.chatlist::-webkit-scrollbar {
  width: 12px;
}
.chatlist::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.chatlist::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  /* outline: 1px solid rgb(182, 20, 20); */
  border-radius: 4px;
}
</style>
