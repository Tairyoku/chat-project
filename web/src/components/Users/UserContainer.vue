<template>
  <div class="container-block" @click="getChat()">
    <div class="container__icon">
      <div style="width: 60px" v-if="user.icon == ''">
        {{ getNameForIcon }}
      </div>
      <el-image v-else class="container__image" :src="getImageUrl" :fit="fit" />
    </div>
    <div class="container__info">
      <div class="container__line">
        <div @mouseenter="runningLine" class="container__name" :id="getClass">{{ user.username }}</div>
      </div>
      <Status :id="user.id" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Status from "@/components/Users/Status.vue";
import { IMAGE_SMALL } from "@/api/routes";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";

const widthLimit = 15;

export default Vue.extend({
  data(): {
    fit: string;
  } {
    return {
      fit: "cover",
    };
  },
  props: {
    user: Object as () => IUser,
  },
  computed: {
    ...mapGetters(["UPDATER"]),
    getImageUrl(): string {
      if (this.user.icon) return IMAGE_SMALL(this.user.icon);
      return "";
    },
    getNameForIcon(): string {
      return this.user.username?.length < 4
        ? this.user.username
        : this.user.username?.split("").slice(0, 3).join("");
    },
    getClass(): string {
      return `user__${this.user.id}`;
    },
  },
  methods: {
    getChat() {
      this.$emit("click");
      this.$store.commit("incrimentUpdater");
    },
    runningLine() {
      const text = document.getElementById(`user__${this.user.id}`);
      if (text) {
        if (text.clientWidth > (window.outerWidth * widthLimit) / 100) {
          text.classList.add("limited");
        }
      }
    },
  },
  components: {
    Status,
  },
});
</script>

<style scoped>
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
.container-block {
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
.container__name {
  margin-left: 8px;
  font-size: larger;
  transition: 3s linear;
  display: inline-block;
}
.container__image {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  display: flex;
}
.container__info {
  width: -webkit-fill-available;
  display: flex;
  font-size: 16px;
  text-align: start;
  /* padding-left: 2vw; */
  overflow: hidden;
  flex-direction: column;
  justify-content: space-around;
}
</style>
