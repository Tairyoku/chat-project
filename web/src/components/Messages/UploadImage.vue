<template>
  <div class="upload">
    <div class="upload__image" @click="uploadImage">
      <div v-if="dialogVisible" >
        <i class="el-icon-plus" ></i>
      </div>
      <img
        style="border-radius: 16px"
        width="100%"
        :src="imageSrc"
      />
    </div>
    <input
      style="display: none"
      id="inputFile"
      type="file"
      @change="getImage"
      accept="image/*,.png,.jpg,.jpeg,.gif"
    />

    <div v-if="!disabled" class="upload__buttons">
      <el-button @click="cancel">Відмінити</el-button>
      <el-button @click="change">Змінити</el-button>
    </div>
  </div>
</template>

<script type="module" lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    chatId: Number,
  },
  data():{
      formData: FormData,
      imageSrc: string,
      dialogVisible: boolean,
      disabled: boolean,
      fit: string,
    } {
    return {
      formData: new FormData(),
      imageSrc: "",
      dialogVisible: true,
      disabled: true,
      fit: "cover",
    };
  },
computed: {
  ...mapGetters([
    "WEB_SOCKET"
  ])
},
  methods: {
    async getImage(event: any) {
      // Завантажуємо в FormData файл зображення для подальшого запиту на сервер
      this.formData.delete("image");
      this.formData.append("image", event.target.files[0]);

      // Присвоюємо посилання на зображення
      this.imageSrc = await loadFile(event.target.files[0]);

      // Отримуємо посилання на зображення

      // Асинхронна функція, повертає посилання після ії успішного отримання
      function loadFile(file: any): Promise<string> {
        return new Promise((resolve) => {
          var reader = new FileReader();
          reader.onloadend = function () {
            let data = String(reader.result);
            resolve(data);
          };
          reader.readAsDataURL(file);
        });
      }
      this.dialogVisible = false;
      this.disabled = false;
    },
    cancel() {
      this.formData.delete("image");
      this.$emit("cancel");
    },
    change() {
      switch (this.chatId) {
        case 0: {
          this.changeUserIcon();
          break;
        }
        default: {
          this.changeChatIcon(this.chatId);
          break;
        }
      }
    },
    changeUserIcon() {
      this.$store
      .dispatch("changeIcon", this.formData)
      .then(() => {
        this.formData.delete("image");
        this.$store.dispatch("getStarted");
        this.$notify({
          title: "Зображення успішно змінено",
          text: "Зображення змінено",
          type: "success",
        });
        this.WEB_SOCKET.send("update");
        this.$emit("cancel");
      });
    },
    changeChatIcon(chatId: number) {
      this.$store
        .dispatch("changeChatIcon", {
          chatId: chatId,
          image: this.formData,
        })
        .then(() => {
          this.formData.delete("image");
          this.WEB_SOCKET.send("update");
          this.$emit("cancel");
        });
    },
    uploadImage() {
      var input = document.getElementById("inputFile");
      if (input) input.click();
    },
  },
});
</script>

<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
}

.upload__image {
  background-color: #f0f0b4b1;
  width: 240px;
  height: 240px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dashed 2px #afec4d;
  border-radius: 16px;
  cursor: pointer;
}
:deep(.el-icon-plus:before) {
  font-size: 60px;
  color: #afec4d;
}
.upload__buttons {
  display: flex;
  width: 360px;
  margin-top: 32px;
  justify-content: space-between;
}
.el-icon-plus {
  cursor: pointer;
}
</style>
