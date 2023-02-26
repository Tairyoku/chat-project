<template>
    <div class="info">
      <div class="info__image">
        <el-image
          class="container__image"
          :src="data.icon"
          :fit="fit"
        ></el-image>
      </div>
      <div class="info__username">
        {{ data.username }}
      </div>
      <div class="info__setting">
        Налаштування
        <div class=" change change__username"  >
       <div style="display: flex;"  @click="changeSetting('username')">
        <el-col :span="8">
    <el-card shadow="hover">
      Змінити ім'я
      <i class="el-icon-info"></i>
    </el-card>
  </el-col>
       </div>
  <el-form v-if="changeUsernameVisible" :model="newUsername" status-icon :rules="rules" class="demo-ruleForm">
  <span>Нове ім'я</span>
    <el-form-item>
    <el-input type="text" size="small" v-model="newUsername" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" show-password @click="">Змінити</el-button>
    <el-button @click="">Назад</el-button>
  </el-form-item>
</el-form>
       </div> 
       <div class=" change change__password"  >
       <div style="display: flex;"  @click="changeSetting('password')">
        <el-col :span="8">
    <el-card shadow="hover" >
      Змінити пароль
      <i class="el-icon-info"></i>
    </el-card>
  </el-col>
  </div>
  <el-form v-if="changePasswordVisible" :model="passwordForm" status-icon :rules="rules" class="demo-ruleForm">
  <span>Старий пароль</span>
    <el-form-item>
    <el-input type="password" show-password v-model="passwordForm.oldPass" autocomplete="off"></el-input>
  </el-form-item>
  <span>Новий пароль</span>
  <el-form-item>
    <el-input type="password" show-password size="small" v-model="passwordForm.newPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" show-password @click="">Змінити</el-button>
    <el-button @click="">Назад</el-button>
  </el-form-item>
</el-form>
</div>
<div class="change ">
  <div style="display: flex;"  @click="changeSetting('icon')">
        <el-col :span="8">
    <el-card shadow="hover" >
      Змінити зображення
      <i class="el-icon-info"></i>
    </el-card>
  </el-col>
  </div>
<div class="change__icon" v-if="changeIconVisible">
  <UploadImage />
</div>
</div>
              <!-- <el-dialog
  title="Ви дійсно бажаєте видалити чат?"
  :visible.sync="changePasswordVisible"
  width="40%"
  >
  <el-input
    size="small"
    placeholder="Please Input"
    v-model="input3">
  </el-input>
  <span slot="footer" class="dialog-footer" style="justify-content: space-around; display: flex;">
    <el-button @click="deleteChatVisible = false">Відмінити</el-button>
    <el-button type="primary" @click="deleteChat">Видалити</el-button>
  </span>
</el-dialog> -->
      </div>
 

    </div>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";
import { IMAGE } from "@/api/routes";
import UploadImage from "@/components/Messages/UploadImage.vue";

export default Vue.extend({
  props: {
    data: Object
  },
  data() {
    return {
      fit: 'cover',
      changePasswordVisible: false,
      changeUsernameVisible: false,
      changeIconVisible: false,
      passwordForm: {
          oldPass: '',
          newPass: "",
        },
        newUsername: "",
        rules: {
          oldPass: [
          { required: true, message: 'Введіть поточний пароль', trigger: 'blur' },
          ],
          newPass: [
          { required: true, message: 'Введіть новий пароль', trigger: 'blur' },
            { min: 6, message: 'Пароль не має бути коротший за 6 символів', trigger: 'blur' }
          ]
        }
    };
  },
  components: {
 UploadImage 

  },
  computed: {
    imgUrl(): string {
      return IMAGE(this.data.icon)
    },
  },
  methods: {
    changeSetting(type:string) {
      switch (type) {
        case "username": {
          this.changeIconVisible = false
      this.changePasswordVisible = false
      this.changeUsernameVisible = !this.changeUsernameVisible
      break
        }
        case "password": {
          this.changeIconVisible = false
      this.changePasswordVisible = !this.changePasswordVisible
      this.changeUsernameVisible = false
      break
        }
        case "icon": {
          this.changeIconVisible = !this.changeIconVisible
      this.changePasswordVisible = false
      this.changeUsernameVisible = false
      break
        }
    }
  },
}
});
</script>

<style scoped>
span {
  display: flex;
}
.info {
  min-width: 400px;
  min-height: 700px;
  width: 0vw;
  height: 60vh;
  background-color: aqua;
}
.info__setting {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.change{
  display: flex;
  flex-direction: column;
}
.change__icon {
  width: inherit;
  margin: 20px auto;

}

.demo-ruleForm {
width: 80%;
margin: 16px auto;
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
</style>
