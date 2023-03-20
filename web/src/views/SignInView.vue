<template>
  <div id="sign-in">
    <div class="form">
      <el-form :model="form" @sumbit="signInHandler">
        <span style="cursor: context-menu">УВІЙТИ</span>
        <el-input
          class="input"
          style="margin-top: 48px"
          placeholder="Як тебе звати?"
          v-model="form.username"
          @input="usernameValidate"
        ></el-input>
        <div class="validate">{{ validateUsername }}</div>
        <el-input
          class="input"
          placeholder="Згадай свій пароль"
          v-model="form.password"
          @input="passwordValidate"
          show-password
        ></el-input>
        <div class="validate">{{ validatePassword }}</div>
        <div class="btns">
          <el-button class="btn" v-on:click="signInHandler">Увійти</el-button>
          <el-button class="btn" v-on:click="cancelHandler">Очистити</el-button>
        </div>
      </el-form>
      <el-link class="link" v-on:click="signUpNavigate">
         Ще не маєте акаунту?
        </el-link>
    </div>
    <div class="hint">
<ul>
  <div style="margin-bottom: 8px;">Ім'я має бути наступним:</div>
  <li>Починатися лише з літери;</li>
  <li>Може містити лише літери, цифри, та ' . ' чи ' _ ';</li>
  <li>Унікальність імені не залежить від регістру;</li>
  <li>Інші символи недопустимі;</li>
</ul>
<ul>
  <div style="margin-bottom: 8px;">Пароль має бути наступним:</div>
  <li>Має містити хоча б одну заголовну літеру;</li>
  <li>Має містити хоча б одну малу літеру;</li>
  <li>Має містити хоча б одну цифру;</li>
  <li>Має містити хоча б однин спецсимвол;</li>
  <li>Інші символи допустимі;</li>
</ul>
</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data(): {
    form: {
      username: string;
      password: string;
    };
    validateUsername: string,
        validatePassword: string,
  } {
    return {
      form: {
        username: "",
        password: "",
      },
        validateUsername: "",
        validatePassword: "",
    };
  },
  computed: {
    ...mapGetters([
      "USER_ID"
    ])
  },
  methods: {
    usernameValidate() {
      this.validatePassword = ""
      if (this.form.username?.length == 0) {
        this.validateUsername = "Введіть ім'я"
        return
      }
      this.validateUsername = ""
    },
    passwordValidate() {
      if (this.form.password?.length == 0) {
        this.validatePassword = "Введіть пароль"
        return
      }
      this.validatePassword = ""
    },
    signInHandler() {
      if (this.validateUsername != "" || this.validatePassword != "") return;
      if (this.form.username == "" && this.form.password == "") {
       this.usernameValidate()
       this.passwordValidate()
        return;
      }
       this.$store
        .dispatch("login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then(err => {
          if (err == "incorrect password") {
            this.validatePassword = "Невірний пароль"
            return
        } else if (err == "user not found") {
            this.validateUsername = "Користувача не існує"
            return
          } else if (err.response?.status == 500) {
            this.validateUsername = "Повторіть пізніше"
            return
          }
         this.cancelHandler()
         if (this.$router.currentRoute.name != "default") {
        this.$router.push("/");
      }       })
    },
    cancelHandler() {
      this.validatePassword = ""
      this.validateUsername = ""
 this.form.username = "";
      this.form.password = "";
    },
    signUpNavigate() {
      this.$router.push({ name: "sign-up" });
    },
  },
  watch: {
    USER_ID() {
      if (this.$router.currentRoute.name != "default") {
        this.$router.push("/");
      }
    },
  },
});
</script>

<style scoped>
#sign-in {
  z-index: 2;
  width: 100vw;
  height: 100%;
  left: 0px;
  font-size: 24px;
  top: 0px;
  color: #245f1a;
  position: absolute;
  background-color: #f4ffc2;
  justify-content: center;
  display: flex;
  align-items: center;
}

.hint {
  display: flex;
  flex-direction: column;
    font-size: 20px;
    height: 90vh;
    align-items: flex-start;
    justify-content: center;
}

ul {
text-align: start;
margin-block-end: 0px;

}

li {
  margin: 2px 0;
  margin-left: 40px;
    font-size: 16px;
}

:deep(.el-input) {
  margin: 15px auto;
  position: relative;
  font-size: 14px;
}

.btn {
  background-color: #ddff8f;
  color: #245f1a;
  border: 2px groove #afec4d;
  border-radius: 16px;
  font-size: 20px;
}
.link {
  margin-top: 20px;
  margin-left: -20px;
  color: #245f1ab0;
}
.btns {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.validate {
  font-size: 14px;
    color: red;
    margin-top: -12px;
    text-align: left;
    padding-left: 16px;
}

.form {
  width: 360px;
}

.input {
  color: #fff;
}

:deep(.el-input__inner) {
  color: #245f1a;
  font-size: 20px;
  height: 40px;
  background-color: #f0f0b4;
}
:deep(.el-input__inner::placeholder) {
  color: #245f1a8c;
}
:deep(.el-link.el-link--default) {
  color: #245f1ab0;
  font-size: 16px;
}

:deep(.el-link.el-link--default:hover) {
  color: #a9ae2d;
}
:deep(.el-input__inner:focus),
:deep(.el-input__inner:hover) {
  border-color: #afec4d;
}
:deep(.el-button:focus),
:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
}
</style>
