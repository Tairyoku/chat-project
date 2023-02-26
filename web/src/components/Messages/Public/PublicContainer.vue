<template>
  <div class="container-block">
    <div class="container__icon">
      <div v-if="item.icon == ``">
        {{ getNameForIcon }}
      </div>
      <el-image v-else class="container__image" :src="getImageUrl" :fit="fit" />
    </div>
    <div class="container__info">
      <div class="container__name">{{ item.name }}</div>
      <div v-if="item?.types != 'private'">{{ numberOfUsers }} {{ getTypeByNumOfUsersInChat }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMAGE_SMALL } from "@/api/routes";

export default Vue.extend({
  props: {
    item: Object,
  },
  data():{
      chatId: number,
      numberOfUsers: number,
      img: string,
      fit: string,
    } {
    return {
      chatId: 0,
      numberOfUsers: 0,
      img: "",
      fit: "cover",
    };
  },
  methods: {
    getNumOfUsers() {
      this.$store.dispatch("getChatUsers", this.CHAT_ID).then((res) => {
        this.numberOfUsers = res.size;
      });
    },
  },
  watch: {
    item() {
      this.chatId = this.CHAT_ID;
      this.getNumOfUsers();
    },
    UPDATER() {
      this.getNumOfUsers();
    },
  },
  computed: {
    ...mapGetters([
      "CHAT_ID",
      "UPDATER"
    ]),
    getNameForIcon(): string {
      return this.item.name?.length < 4 ? this.item.name : this.item.name?.split("").slice(0, 3).join("");
    }, 
    getImageUrl(): string {
      if (this.item.icon) return IMAGE_SMALL(this.item.icon);
      return "";
    },
    getTypeByNumOfUsersInChat() {
      switch (this.numberOfUsers) {
        case 1:
          return "користувач";
        case 2:
        case 3:
        case 4:
          return "користувачі";
        default:
          return "користувачів";
      }
    },
  },
  mounted() {
    this.getNumOfUsers();
  },
});
</script>

<style scoped>
.container-block {
  color: black;
  height: 52px;
  cursor: default;
  padding: 4px;
  align-items: center;
  display: flex;
}
.container__icon {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 28px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  cursor: default;
  color: white;
  background-color: rgb(232, 97, 47);
}
.container__image {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  display: flex;
}
.container__info {
  color: black;
  flex-wrap: wrap;
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  font-size: 16px;
  text-align: start;
  padding-left: 24px;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
}
.container__name {
  margin-left: 8px;
  width: 100%;
  font-size: larger;
  text-align: center;
}
</style>
