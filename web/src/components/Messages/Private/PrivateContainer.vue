<template>
  <div class="container-block">
    <div class="container__icon">
      <div class="" v-if="item.icon == ``">
        {{ getChatIcon(item.username) }}
      </div>
        <el-image v-else class="container__image" :src="getImageUrl" :fit="fit" />
    </div>
    <div class="container__info">
      <div>{{ item.username }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE_SMALL } from "@/api/routes";

export default Vue.extend({
  props: {
    item: Object,
  },
  data():{
      fit: string,
    } {
    return {
      fit: "cover",
    };
  },
  methods: {
    getChatIcon(name: string): string {
      return name?.length < 4 ? name : name?.split("").slice(0, 3).join("");
    },
  },
  computed: {
    getImageUrl(): string {
      if (this.item.icon) return IMAGE_SMALL(this.item.icon);
      return ""
    },
  },
});
</script>

<style scoped>
.container-block {
  color: black;
  height: 52px;
  padding: 4px;
  align-items: center;
  display: flex;
  cursor: default;
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
  font-size: larger;
  text-align: start;
  padding-left: 24px;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
}
</style>
