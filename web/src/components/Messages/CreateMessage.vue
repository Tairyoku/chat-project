<template>
  <div class="create">
    <div class="warning" v-if="getIsOnBlackList">
      <i style="margin-right: 16px" class="el-icon-warning"></i>
      <em>Ви не можете відправляти повідомлення цьому користувачу</em>
    </div>
    <div class="addToChat" v-if="!getIsOnChat">
      Приєднатися до чату
      <el-button @click="addUserToChat">Приєднатися</el-button>
    </div>
    <div class="create__window">
      <textarea
        class="create__text"
        placeholder="Повідомлення..."
        v-model="text"
        rows="4"
      ></textarea>
      <button
        class="create__btn el-icon-position"
        @click="sendMessage"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { IChat, IUser } from "@/store/models";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data(): {
    text: string;
    user: IUser;
    chatUsers: IUser[];
  } {
    return {
      text: "",
      chatUsers: [] as IUser[],
      user: {} as IUser,
    };
  },
  watch: {
    CHAT_ID() {
      this.getData();
    },
    UPDATER() {
      this.getData();
    },
  },
  methods: {
    openWebsocket(chatId: number) {
      if (this.WEB_SOCKET.readyState != undefined) {
        this.$store.commit("closeSocket");
      }
      this.$store.dispatch("openWebsocket", chatId)

    },
    getData() {
      this.$store
        .dispatch("getById", this.CHAT_ID)
        .then((res) => {
          if (res == undefined) return
          this.user = res.user
        });
      this.$store
        .dispatch("getChatUsers", this.CHAT_ID)
        .then((res) => (this.chatUsers = res.list));
    },
    sendMessage() {
      if (this.text == "") return;
      if (!this.getIsOnChat) {
        this.$notify({
          title: "Ви не належите до чату",
          type: "warning",
        });
        return;
      }
      if (this.getIsOnBlackList) {
        this.$notify({
          title: "Ви заблоковані",
          type: "warning",
        });
        return;
      }
      this.$store
        .dispatch("createMessage", {
          chatId: this.CHAT_ID,
          text: this.text,
        })
        .then(() => {
          this.WEB_SOCKET.send("send message");
          this.text = "";
          setTimeout(
            () => document.getElementById("arrowTop")?.scrollIntoView(),
            100
          );
        });
    },
    addUserToChat() { 
      this.$store
        .dispatch("addUserToChat", {
          userId: this.USER_ID,
          chatId: this.CHAT_ID,
        })
        .then(() => {
          // this.openWebsocket(this.CHAT_ID)
          this.$notify({
            title: "Ви приєдналися до чату",
            type: "success",
          });
          this.getData();
          this.WEB_SOCKET.send("update")
        });
    },
  },
  computed: {
    ...mapGetters([
      "USER_ID",
      "WEB_SOCKET",
      "CHAT_ID",
      "UPDATER",
      "ID_LIST_OF_ON_BLACK_LISTS",
    ]),
    getIsOnBlackList(): boolean {
      return this.ID_LIST_OF_ON_BLACK_LISTS.includes(this.user?.id);
    },
    getIsOnChat(): boolean {
      let list: number[] = [];
      if (!this.chatUsers) return true
      this.chatUsers.forEach((item) => list.push(item.id));
      return list.includes(this.USER_ID);
    },
  },
  mounted() {
    this.getData();
  },
});
</script>

<style scoped>
textarea {
  color: #245f1a;
}
textarea::placeholder {
  color: #245f1a8c;
}
.create__window {
  margin: 8px;
  height: 100px;
  display: flex;
  width: -webkit-fill-available;
  padding: 12px;
  position: absolute;
  bottom: -40px;
  border: 2px solid #a9ae2d;
  border-radius: 12px;
}
.create {
  position: relative;
  height: 100px;
}
.create__text {
  height: 100%;
  width: 100%;
  font-size: larger;
  background: rgba(0, 0, 0, 0);
  margin-left: 16px;
  resize: none;
  outline: none;
  border: none;
}
.create__btn {
  --size: 10vh;
  width: var(--size);
  height: var(--size);
  background: linear-gradient(314deg, #aeeb4d, #d5d540);
  color: #ddff8f;
  border-radius: 50%;
  border: none;
  padding: 10px;
  font-size: 7vh;
  text-align: initial;
  margin: auto 8px;
}
.create__text::-webkit-scrollbar {
  width: 8px;
}
.create__text::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(66, 168, 241, 0);
}
.create__text::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
.warning {
  width: 90%;
  color: firebrick;
  margin: 0px auto;
position: absolute;
margin-left: 5%;
  border: 2px solid firebrick;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: none;
  padding: 4px 0;
  bottom: 96px;
  background-color: #ffc8c8;
}
.addToChat {
  width: 90%;
  color: #245f1a;
  margin: 0px auto;
  transform: translate(0, -40px);
  border: 2px solid #245f1a;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: none;
  background-color: #ddff8f;
}
:deep(.el-button) {
  font-size: 16px;
  margin: 4px 16px;
  border-radius: 16px;
  border: 2px groove #afec4d;
  background-color: #ddff8f;
  color: #245f1a;
}
:deep(.el-button:focus),
:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
}
</style>
