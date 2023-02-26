<template>
  <div class="users-bar">
    <Search @getChat="getChat" />
  <UserContainer :user="USER" @click="getChat(USER_ID)" />
    <el-tabs type="card">
      <el-tab-pane label="Усі">
        <ChatsList />
      </el-tab-pane>
      <el-tab-pane label="Друзі">
        <UsersList @getChat="getChat" :list="friends" />
      </el-tab-pane>
      <el-tab-pane label="Заблоковані">
        <UsersList @getChat="getChat" :list="blackList" />
      </el-tab-pane>
      <el-tab-pane label="Запити">
        <UsersList @getChat="getChat" :list="FRIENDSHIP_REQUIRE" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";
import Search from "@/components/Users/Search.vue";
import UsersList from "@/components/Users/UsersList.vue";
import ChatsList from "@/components/Users/ChatsList.vue";
import UserContainer from "@/components/Users/UserContainer.vue";

export default Vue.extend({
  data(): {
    tabPosition: string;
  } {
    return {
      tabPosition: "top",
    };
  },
  methods: {
    getChat(id: number) {
      this.$store.dispatch("createPrivateChat", id).
      then((res) => {
        if (this.CHAT_ID != res) {
        this.$router.push(`/chat/${res}`)
        .then(() => this.$store.commit("setChatId", res));
      }
      this.$store.dispatch("getUserPrivateChats", this.USER_ID);
      });
    },
  },
  computed: {
    ...mapGetters([
      "FRIEND_LIST",
      "BLACK_LIST",
      "ON_BLACK_LISTS",
      "SENT_INVITES_TO_FRIENDS",
      "FRIENDSHIP_REQUIRE",
      "USER",
      'USER_ID',
      'CHAT_ID'
    ]),
    friends(): IUser[] {
      return this.FRIEND_LIST.concat(this.SENT_INVITES_TO_FRIENDS);
    },
    blackList() {
      return this.BLACK_LIST.concat(this.ON_BLACK_LISTS);
    },
  },
  components: {
    UsersList,
    Search,
    UserContainer,
    ChatsList,
  },
});
</script>

<style scoped>
:deep(.el-tabs__header) {
    border-bottom: 1px solid rgba(195, 0, 0, 0.3);
    margin: 0;
}
.users-bar {
  width: inherit;
}
</style>