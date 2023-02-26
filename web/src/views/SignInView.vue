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
        ></el-input>
        <el-input
          class="input"
          placeholder="Згадай свій пароль"
          v-model="form.password"
          show-password
        ></el-input>
        <div class="btns">
          <el-button class="btn" v-on:click="signInHandler">Увійти</el-button>
          <el-button class="btn" v-on:click="cancelHandler">Очистити</el-button>
        </div>
      </el-form>
      <el-link class="link" v-on:click="signUpNavigate">
         Ще не маєте акаунту?
        </el-link>
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
  } {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signInHandler() {
      if (this.form.username === "") return
      if (this.form.password?.length < 6) {
        this.form.password = "";
        return;
      }
      this.$store
        .dispatch("login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then(() => this.cancelHandler())
       .then((res) => {
          this.$store.dispatch("getStarted")
          .then(() => this.$router.push('/'))
       })
    },
    cancelHandler() {
      this.form.username = "";
      this.form.password = "";
    },
    signUpNavigate() {
      this.$router.push({ name: "sign-up" });
    },
  },
  watch: {
    USER_ID(){
      this.$router.push("/")
    }
  },
  computed: {
    ...mapGetters([
      "USER_ID"
    ])
  },
  mounted() {
    if (this.USER_ID) this.$router.push("/")
  }
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
  display: flex;
  justify-content: space-between;
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
:deep(.el-button:hover),
:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
}
</style>
