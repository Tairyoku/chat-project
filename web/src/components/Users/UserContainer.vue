<template>
  <div class="container-block" @click="getChat()">
    <div class="container__icon">
      <div style="width: 60px;" v-if="user.icon == ''">
        {{ getNameForIcon }}
      </div>
        <el-image v-else
          class="container__image"
          :src="getImageUrl"
          :fit="fit"
        />
    </div>

    <div class="container__info">
      <div class="container__name">{{ user.username }}</div>
      <Status :id="user.id" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Status from "@/components/Users/Status.vue";
import { mapGetters } from "vuex";
import { IMAGE_SMALL } from "@/api/routes";

export default Vue.extend({
  data():{
      fit: string,
    } {
    return {
      fit: "cover",
    };
  },
  props: {
    user: Object,
  },
  methods: {
    getChat() {
      this.$emit('click')
    },
  },
  components: {
    Status,
  },
  computed: {
    getImageUrl(): string {
      if (this.user.icon) return IMAGE_SMALL(this.user.icon);
      return ""
    },
    getNameForIcon(): string {
      return this.user.username?.length < 4 ? this.user.username : this.user.username?.split("").slice(0, 3).join("");
    },
  },
});
</script>

<style scoped>
.container__icon {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 28px;
  height: 60px;
  width: 60px;
  margin: 0 16px;
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
.container__name {
 margin-left: 8px; 
  font-size: larger;
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
    padding-left: 24px;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-around;
}


</style>
