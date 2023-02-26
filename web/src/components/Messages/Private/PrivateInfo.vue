<template>
  <div class="info">
    <el-image
      v-if="data.icon?.length != 0"
      class="container__image"
      :src="getImageUrl"
      :fit="fit"
    />
    <div class="container__none" v-else>
      <i class="el-icon-picture-outline"></i>
    </div>
    <div class="info__username">
      {{ data.username }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMAGE } from "@/api/routes";
import UserContainer from "@/components/Users/UserContainer.vue";
import UploadImage from "@/components/Messages/UploadImage.vue";

export default Vue.extend({
  props: {
    data: Object,
  },
  data(): {
    fit: string;
  } {
    return {
      fit: "cover",
    };
  },
  components: {
    UploadImage,
    UserContainer,
  },
  computed: {
    ...mapGetters([]),
    getImageUrl(): string {
      if (this.data.icon) return IMAGE(this.data.icon);
      return "";
    },
  },
});
</script>

<style scoped>
span {
  display: flex;
}
.info {
  margin-top: -20px;
  min-width: 200px;
  min-height: 200px;
  width: inherit;
  color: #14340e;
  height: inherit;
  max-height: 100vh;
  cursor:default;
}
.container__image {
  height: 25vh;
}
.info__username {
  margin: 16px 20px;
  font-size: 24px;
  text-align: start;
}
.container__none {
  height: 25vh;
  background-color: rgb(236, 239, 197);
  color: rgb(103, 138, 32);
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
