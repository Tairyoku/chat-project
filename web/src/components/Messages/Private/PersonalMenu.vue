<template>
  <div class="personal-menu">
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
      <PrivateInfo :data="USER" />
    </el-dialog>

    <!-- Змінити ім'я -->
    <div @click="changeUsernameVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Змінити ім'я
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити ім'я"
      :visible.sync="changeUsernameVisible"
      width="400px"
      top="25vh"
    >
      <el-form v-if="changeUsernameVisible" status-icon>
        <el-form-item>
          <el-input
            type="text"
            v-model="newUsername"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button show-password @click="changeUsernameHandler">Змінити</el-button
          >
          <el-button @click="changeUsernameVisible = false">Назад</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- Змінити зображення -->
    <div @click="changeIconVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Змінити зображення
          <i class="el-icon-circle-plus"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити зображення"
      :visible.sync="changeIconVisible"
      width="400px"
    >
      <UploadImage :chatId="0" @cancel="changeIconVisible = false" />
    </el-dialog>

    <!-- Змінити пароль -->
    <div @click="changePasswordVisible = true">
      <el-col :span="8" >
        <el-card shadow="hover">
          Змінити пароль
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити пароль"
      :visible.sync="changePasswordVisible"
      width="400px"
      top="25vh"
    >
      <el-form 
      v-if="changePasswordVisible" 
      :model="passwordForm" status-icon
      >
        <span class="menu__text">Старий пароль</span>
        <el-form-item>
          <el-input
            type="password"
            show-password
            v-model="passwordForm.oldPass"
          ></el-input>
        </el-form-item>
        <span class="menu__text">Новий пароль</span>
        <el-form-item>
          <el-input
            type="password"
            show-password
            v-model="passwordForm.newPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button show-password @click="changePasswordHandler">Змінити</el-button>
          <el-button @click="changePasswordVisible = false">Назад</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- Вийти -->
    <div @click="logoutVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Вийти
          <i class="el-icon-remove"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте вийти?"
      :visible.sync="logoutVisible"
      width="400px"
      top="25vh"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="logoutVisible = false">Назад</el-button>
        <el-button @click="logoutHandler">Вийти</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";
import PrivateInfo from "@/components/Messages/Private/PrivateInfo.vue";
import UploadImage from "@/components/Messages/UploadImage.vue";

export default Vue.extend({
  data():{
      user: IUser,
      moreInfoVisible: boolean,
      changeUsernameVisible: boolean,
      changeIconVisible: boolean,
      changePasswordVisible: boolean,
      logoutVisible: boolean,
      passwordForm: {
        oldPass: string,
        newPass: string,
      },
      newUsername: string,
    } {
    return {
      user: {} as IUser,
      moreInfoVisible: false,
      changeUsernameVisible: false,
      changeIconVisible: false,
      changePasswordVisible: false,
      logoutVisible: false,
      passwordForm: {
        oldPass: "",
        newPass: "",
      },
      newUsername: "",
    };
  },
  components: {
    PrivateInfo,
    UploadImage,
  },
  computed: {
    ...mapGetters([
      "USER_ID",
      "USER",
      "ID_LIST_OF_FRIEND_LIST",
      "ID_LIST_OF_BLACK_LIST",
      "WEB_SOCKET",
    ]),
    isFriend(): boolean {
      return this.ID_LIST_OF_FRIEND_LIST.includes(this.user.id);
    },
    notBlocked(): boolean {
      return !this.ID_LIST_OF_BLACK_LIST.includes(this.user.id);
    },
  },
  methods: {
    changeUsernameHandler() {
      this.changeUsernameVisible = false;
      this.$store
        .dispatch("changeUsername", {
          username: this.newUsername,
        })
        .then(() => {
          this.$notify({
            title: "Ім'я успішно змінено",
            text: "Ім'я змінено",
            type: "success",
          });
          this.WEB_SOCKET.send("update");
          this.$store.dispatch("getUser", this.USER_ID)
          .then((res) => this.$store.commit("setUser", res));
        });
    },
    changePasswordHandler() {
      this.changePasswordVisible = false;
      this.$store
        .dispatch("changePassword", {
          oldPassword: this.passwordForm.oldPass,
          newPassword: this.passwordForm.newPass,
        })
        .then(() => {
          this.$notify({
            title: "Пароль успішно змінено",
            text: "Пароль змінено",
            type: "success",
          });
        });
    },
    logoutHandler() {
      this.$store.dispatch("logout")
      .then(() => this.$router.push({ name: "sign-up" }));
    },
  },
});
</script>

<style scoped>
:deep(.el-card) {
  margin-bottom: 2px;
  border-radius: 8px;
  cursor: pointer;
  font-size: medium;
  border: 2px solid #a9ae2d;
  background-color: #f4ffc2;
  color: #245f1a;
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
.menu__text {
  color: #245f1a;
  font-size: 20px;
}
:deep(.el-button:focus),
:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
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
.personal-menu {
  position: absolute;
  right: 0;
  color: #245f1a;
  top: 82px;
  display: flex;
  flex-direction: column;
}
:deep(.el-card__body) {
  padding: 12px 12px;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
}
</style>
