<template>
  <div class="chatlist">
    <ul class="" style="margin-left: 0; padding-left: 0">
      <li
        style="list-style-type: none; margin-bottom: 8px"
        :key="item.id"
        v-for="item in chatsToUser"
      >
        <div class="" @click="addUserToChat(item.id)">
          <ChatContainer :chat="item" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";
import { mapGetters } from "vuex";
import { IChat, IUser } from "@/store/models";

export default Vue.extend({
  data(): {
    chats: IChat[];
    user: IUser;
  } {
    return {
      chats: [] as IChat[],
      user: {} as IUser,
    };
  },
  components: {
    ChatContainer,
  },
  computed: {
    ...mapGetters(["PUBLIC_CHAT_LIST", "CHAT_ID", "WEB_SOCKET"]),
    chatsToUser(): IChat[] {
      let result = [] as IChat[];
      this.PUBLIC_CHAT_LIST.forEach((chat: IChat) => {
        let check = 0;
        this.chats.forEach((userChat: IChat) => {
          // Якщо чати співпадають, то збільшуємо check на 1
          if (chat.id == userChat.id) check++;
        });
        // check = 0 означає, що збігів не було
        if (check == 0) result.push(chat);
      });
      return result;
    },
  },
  watch: {
    CHAT_ID() {
      this.$store.dispatch("getById", this.CHAT_ID).then((res) => {
        this.user = res.user;
        this.$store
          .dispatch("getPublicChats", res.user.id)
          .then((res) => (this.chats = res));
      });
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addUserToChat(id: number) {
      this.$store
        .dispatch("addUserToChat", {
          userId: this.user.id,
          chatId: id,
        })
        .then(() => {
          this.$notify({
            title: "Успіх",
            text: "Ви додали користувача до чату",
            type: "success",
          });
          this.WEB_SOCKET.send("update");
          this.close();
        });
    },
  },
  mounted() {
    this.$store.dispatch("getById", this.CHAT_ID)
    .then((res) => {
      this.user = res.user;
      this.$store
        .dispatch("getPublicChats", res.user.id)
        .then((res) => this.chats = res);
    });
  },
});
</script>

<style scoped>
.chatlist {
  width: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  height: 75vh;
}
.chatlist::-webkit-scrollbar {
  width: 12px;
}
.chatlist::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.chatlist::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>
