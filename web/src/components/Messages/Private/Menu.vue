<template>
  <div class="private-menu">
    <!-- інформація -->
    <div @click="moreInfoVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Інформація
          <i class="el-icon-info"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog 
    title="Інформація"
   :visible.sync="moreInfoVisible"
    width="400px"
    top="25vh"
     >
      <PrivateInfo :data="user" />
    </el-dialog>

    <!-- Додати до чату -->
    <div @click="addToChatVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Додати до чату
          <i class="el-icon-success"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Додати до чату:"
      :visible.sync="addToChatVisible"
      top="20px"
      width="400px"
    >
    <Search @close="addToChatVisible = false" />
    </el-dialog>

    <!-- Заблокувати -->
    <div v-if="notBlocked" @click="blockedVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Заблокувати
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте заблокувати користувача?"
      :visible.sync="blockedVisible"
      width="400px"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="blockedVisible = false">Відмінити</el-button>
        <el-button @click="blockUser()">Заблокувати</el-button>
      </span>
    </el-dialog>

    <!-- Видалити з друзів (якщо друг) -->
    <div v-if="isFriend" @click="deleteFriendVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Видалити з друзів
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте позбутися друга??"
      :visible.sync="deleteFriendVisible"
      width="400px"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="deleteFriendVisible = false">Відмінити</el-button>
        <el-button @click="deleteFriend()">Підтвердити</el-button>
      </span>
    </el-dialog>

    <!-- видалити чат -->
    <div @click="deleteChatVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Видалити чат
          <i class="el-icon-error"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте видалити чат?"
      :visible.sync="deleteChatVisible"
      width="400px"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="deleteChatVisible = false">Відмінити</el-button>
        <el-button type="primary" @click="deleteChat()">Видалити</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IUser } from "@/store/models";
import { mapGetters } from "vuex";
import Search from "@/components/Messages/Private/Search.vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";
import PrivateInfo from "@/components/Messages/Private/PrivateInfo.vue";

export default Vue.extend({
  data():{
      user: IUser,
      moreInfoVisible: boolean,
      addToChatVisible: boolean,
      blockedVisible: boolean,
      deleteFriendVisible: boolean,
      deleteChatVisible: boolean,
    } {
    return {
      user: {} as IUser,
      moreInfoVisible: false,
      addToChatVisible: false,
      blockedVisible: false,
      deleteFriendVisible: false,
      deleteChatVisible: false,
    };
  },
  components: {
    PrivateInfo,
    ChatContainer,
    Search
  },
  computed: {
    ...mapGetters([
      "CHAT_ID",
      "USER_ID",
      "ID_LIST_OF_FRIEND_LIST",
      "ID_LIST_OF_BLACK_LIST",
      'ID_LIST_OF_ON_BLACK_LISTS',
      "WEB_SOCKET",
    ]),
    isFriend(): boolean {
      return this.ID_LIST_OF_FRIEND_LIST.includes(this.user?.id); 
    },
    notBlocked(): boolean {
      return !this.ID_LIST_OF_BLACK_LIST.includes(this.user?.id) 
      && !this.ID_LIST_OF_ON_BLACK_LISTS.includes(this.user?.id);
    },
  },
  watch: {
    CHAT_ID() {
      this.$store.dispatch("getById", this.CHAT_ID)
      .then((res) => this.user = res.user);
    },
  },
  methods: {
    blockUser() {
      this.blockedVisible = false;
      this.$store.dispatch("addToBlackList", this.user.id)
      .then(() => {
        this.$notify({
          title: "Заблоковано",
          text: "Користувач заблокован",
          type: "success",
        });
        this.WEB_SOCKET.send("update info");
      });
    },
    addUserToChat(id: number) {
      this.addToChatVisible = false;
      this.$store
        .dispatch("addUserToChat", {
          userId: this.user.id,
          chatId: id,
        })
        .then(() => {
          this.$notify({
            title: "Додано",
            text: "Користувач додан до чату",
            type: "success",
          });
          this.WEB_SOCKET.send("update info");
        });
    },
    deleteChat() {
      this.deleteChatVisible = false;
      this.$store.dispatch("deleteChat", this.CHAT_ID)
      .then(() => {
        this.$notify({
          title: "Видалено",
          text: "Чат видалено",
          type: "success",
        });
        this.$router.push("/");
        this.WEB_SOCKET.send("block");
        this.$store.commit("closeSocket");
      });
    },
    deleteFriend() {
      this.deleteFriendVisible = false;
      this.$store.dispatch("deleteFriend", this.user.id)
      .then(() => {
        this.$notify({
          title: "Ви позбулися друга",
          type: "success",
        });
        this.WEB_SOCKET.send("update info");
      });
    },
  },
  mounted() {
    this.$store.dispatch("getById", this.CHAT_ID)
    .then((res) => {
          if (res == undefined) return
          this.user = res.user
        });  },
});
</script>

<style scoped>
.private-menu {
  position: absolute;
  right: 0;
  top: 82px;
  color: #14340e;
  display: flex;
  flex-direction: column;
}
:deep(.el-card) {
    margin-bottom: 2px;
    border-radius: 8px;
    border: 2px solid #a9ae2d;
    background-color: #f4ffc2;
    color: #245f1a;
    cursor: pointer;
    font-size: medium;
  }
:deep(.el-input) {
  width: 240px;
  margin: 15px auto;
  position: relative;
  height: 40px;
}
:deep(.el-input__inner) {
  color: #245f1a;
  font-size: 20px;
  background-color: #f0f0b4;
}
:deep(.el-input__inner:hover),
:deep(.el-input__inner:focus) {
  border-color: #afec4d;
}

.el-col-8 {
  width: 20vw;
  min-width: 240px;
}
:deep(.el-button) {
  font-size: 20px;
  margin: 8px 16px;
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

:deep(.el-card__body) {
  padding: 12px 12px;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
}
</style>
