<template>
  <div class="public-menu">
    <!-- Інформація -->
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
      top="32px"
      width="400px"
    >
      <PublicInfo />
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
      top="10vh"
      width="400px"
    >
      <Search @close="addToChatVisible = false" />
    </el-dialog>

    <!-- Покинути чат -->
    <div @click="wantLeaveVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Покинути чат
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте покинути чат?"
      :visible.sync="wantLeaveVisible"
      width="400px"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="wantLeaveVisible = false">Відмінити</el-button>
        <el-button @click="leaveChat()">Покинути</el-button>
      </span>
    </el-dialog>

    <!-- Змінити зображення -->
    <div @click="changeIconVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Змінити зображення
          <i class="el-icon-picture"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити зображення"
      :visible.sync="changeIconVisible"
      width="400px"
    >
      <UploadImage @cancel="changeIconVisible = false" :chatId="CHAT_ID" />
    </el-dialog>

    <!-- Видалити чат -->
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
      width="40%"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="deleteChatVisible = false">Відмінити</el-button>
        <el-button @click="deleteChat">Видалити</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Search from "@/components/Messages/Public/Search.vue";
import UploadImage from "@/components/Messages/UploadImage.vue";
import PublicInfo from "@/components/Messages/Public/PublicInfo.vue";

export default Vue.extend({
  props: {
    chatId: Number,
  },
  data():{
      moreInfoVisible: boolean,
      addToChatVisible: boolean,
      changeIconVisible: boolean,
      wantLeaveVisible: boolean,
      deleteChatVisible: boolean,
    } {
    return {
      moreInfoVisible: false,
      addToChatVisible: false,
      changeIconVisible: false,
      wantLeaveVisible: false,
      deleteChatVisible: false,
    };
  },
  components: {
    Search,
    PublicInfo,
    UploadImage,
  },
  computed: {
    ...mapGetters(["CHAT_ID", "USER_ID", "WEB_SOCKET"]),
  },
  methods: {
    deleteChat() {
      this.$store
      .dispatch("deleteChat", this.CHAT_ID)
      .then(() => {
        this.$notify({
          title: "Видалено",
          text: "Чат видалено",
          type: "success",
        });
        this.WEB_SOCKET.send("block");
        this.$router.push("/");
        this.deleteChatVisible = false;
      });
    },
    leaveChat() {
      this.deleteChatVisible = false;
      this.$store
        .dispatch("deleteUserFromChat", {
          userId: this.USER_ID,
          chatId: this.CHAT_ID,
        })
        .then(() => {
          this.$store.dispatch("getUserPublicChats", this.USER_ID);
          this.$notify({
            title: "Ви покинули чат",
            text: "Чат видалено",
            type: "success",
          });
          this.WEB_SOCKET.send("block");
          this.$router.push("/");
        });
    },
  },
});
</script>

<style scoped>
.public-menu {
  position: absolute;
  right: 0;
  color: #245f1a;
  top: 82px;
  display: flex;
  flex-direction: column;
}
.el-col-8 {
  width: 20vw;
  min-width: 240px;
}
.menu__text {
  color: #245f1a;
  font-size: 20px;
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
  /* margin-top: 20px; */
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
:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
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
