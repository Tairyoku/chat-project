<template>
  <div>
    <div class="warning" v-if="getIsOnBlackList">
      <i style="margin-right: 16px" class="el-icon-warning"></i>
      <em>Ви не можете відправляти повідомлення цьому користувачу</em>
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
import { IUser } from "@/store/models";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data():{
      text: string,
      user: IUser,
    } {
    return {
      text: "",
      user: {} as IUser,
    };
  },
  watch: {
    CHAT_ID() {
      this.$store
        .dispatch("getById", this.CHAT_ID)
        .then((res) => this.user = res.user);
    },
  },
  methods: {
    sendMessage() {
      if (this.text == "") return;
      if (this.getIsOnBlackList) {
        this.$notify({
          title: "Ви заблоковані",
          text: "Ви не можете писати цьому користувачу",
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
  },
  computed: {
    ...mapGetters(["WEB_SOCKET", "CHAT_ID", "ID_LIST_OF_ON_BLACK_LISTS"]),
    getIsOnBlackList(): boolean {
      return this.ID_LIST_OF_ON_BLACK_LISTS.includes(this.user.id);
    },
  },
  mounted() {
    this.$store
      .dispatch("getById", this.CHAT_ID)
      .then((res) => this.user = res.user);
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
  bottom: 0;
  border: 2px solid #a9ae2d;
  border-radius: 12px;
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
  transform: translate(0, -24px);
  border: 2px solid firebrick;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: none;
  padding: 4px 0;
  background-color: #ffc8c8;
}
</style>
