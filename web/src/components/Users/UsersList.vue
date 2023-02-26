<template>
  <div class="users-list">
    <ul>
      <li v-for="item in list" :key="item.id">
          <UserContainer @click="getChat(item.id)" :user="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IUser } from "@/store/models";
import UserContainer from "@/components/Users/UserContainer.vue";

export default Vue.extend({
  props: {
    list: Array as () => IUser[],
  },
  components: {
    UserContainer,
  },
  methods: {
    getChat(id: number) {
      this.$emit("getChat", id);
    },
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 16px;
}
ul {
  padding-top: 12px;
  padding-inline-start: 0px;
  margin-block-start: 0;
  margin-block-end: 0;
}
.users-list {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 20px - 40px - 64.8px - 44px);
}

.users-list::-webkit-scrollbar {
  width: 12px;
}
.users-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.users-list::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>
