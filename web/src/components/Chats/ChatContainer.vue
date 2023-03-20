<template>
  <div class="chat-container" @click="getChat">
    <div class="container__icon">
      <div class="icon__name" v-if="chat.icon == ''">
        {{ getNameForIcon }}
      </div>
      <el-image v-else class="container__image" :src="getImageUrl" :fit="fit" />
    </div>
    <div class="container__info">
      <div class="container__line">
        <div @mouseenter="runningLine" class="container__name" :id="getClass">{{ chat.name }}</div>
      </div>
      <div v-if="chat.types != 'private'">
        <em> {{ numberOfUsersOnChat }} {{ getTypeByNumOfUsersInChat }}</em>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE_SMALL } from "@/api/routes";
import { mapGetters } from "vuex";
import { IChat } from "@/store/models";

const widthLimit = 15;

export default Vue.extend({
  data(): {
    numberOfUsersOnChat: number;
    fit: string;
  } {
    return {
      numberOfUsersOnChat: 0,
      fit: "cover",
    };
  },
  props: {
    chat: Object as () => IChat,
  },
  computed: {
    ...mapGetters(["UPDATER"]),
    getClass(): string {
      return `name__${this.chat.id}`;
    },
    getImageUrl(): string {
      if (this.chat.icon) return IMAGE_SMALL(this.chat.icon);
      return "";
    },
    getNameForIcon(): string {
      return this.chat.name?.length < 4
        ? this.chat.name
        : this.chat.name?.split("").slice(0, 3).join("");
    },
    getTypeByNumOfUsersInChat(): string {
      switch (this.numberOfUsersOnChat) {
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
  watch: {
    UPDATER() {
      this.getNumOfUsers();
    }
  },
  methods: {
    getNumOfUsers() {
      this.$store
        .dispatch("getChatUsers", this.chat.id)
        .then((res) => (this.numberOfUsersOnChat = res.size));
    },
    getChat() {
      this.$emit("click");
      this.$store.commit("incrimentUpdater");
    },
    runningLine() {
      const text = document.getElementById(`name__${this.chat.id}`);
      if (text) {
        if (text.clientWidth > (window.outerWidth * widthLimit) / 100) {
          text.classList.add("limited");
        }
      }
    },
  },
  mounted() {
    this.getNumOfUsers();
  },
});
</script>

<style scoped>
.container__line {
  --widthLimit: 15vw;
  display: inline-block;
  width: var(--widthLimit);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.limited:hover {
  transform: translateX(calc(-105% + var(--widthLimit)));
}
.chat-container {
  cursor: pointer;
  height: 52px;
  border-radius: 12px;
  align-items: center;
  padding: 12px;
  margin: 8px;
  background-color: rgba(207, 49, 186, 0);
  justify-content: space-between;
  display: flex;
  border: 2px solid #c1ab18;
  box-shadow: 2px -2px 4px 4px #c1ab1882;
}
.container__icon {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 18px;
  height: 60px;
  width: 60px;
  margin: 0 1.5vw;
  border-radius: 30px;
  color: white;
  background-color: rgb(232, 97, 47);
}
.icon__name {
  width: 60px;
}
.container__name {
  margin-left: 8px;
  font-size: larger;
  transition: 3s linear;
  display: inline-block;
}
.container__image {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
}
.container__info {
  display: flex;
  width: -webkit-fill-available;
  font-size: 16px;
  text-align: start;
  /* padding-left: 24px; */
  overflow: hidden;
  flex-direction: column;
  justify-content: space-around;
}
</style>
