<template>
  <div class="header-private">
    <div class="for justify"></div>
    <div style="display: flex; align-items: center">
      <UserInfo :item="user" />
    </div>
    <div class="header__status">
      <div v-if="getStatusBtn">
        <StatusButton :userId="user.id" />
      </div>
      <el-button
        slot="reference"
        @click="setIsMenuVisible"
        icon="el-icon-more-outline"
        class="btn__menu"
      />
      <div v-if="isMenu" @mouseleave="setIsMenuVisible">
        <PrivateMenu v-if="user.id != USER_ID" />
        <PersonalMenu v-else @closeMenu="isMenu = false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IChat, IUser } from "@/store/models";
import PrivateMenu from "@/components/Messages/Private/Menu.vue";
import PersonalMenu from "@/components/Messages/Private/PersonalMenu.vue";
import UserInfo from "@/components/Messages/Private/PrivateContainer.vue";
import StatusButton from "@/components/Messages/Private/StatusButton.vue";

export default Vue.extend({
  data():{
      isMenu: boolean,
      chat: IChat,
      user: IUser,
    } {
    return {
      isMenu: false,
      chat: {} as IChat,
      user: {} as IUser,
    };
  },
  components: {
    StatusButton,
    UserInfo,
    PersonalMenu,
    PrivateMenu,
  },
  computed: {
    ...mapGetters(["USER_ID", "CHAT_ID", "USER","UPDATER"]),

    getStatusBtn(): boolean {
      return (this.user.id == this.USER_ID) ? false : true;
    },
  },
  watch: {
    CHAT_ID() {
      this.getUserAndChatData()
    },
    UPDATER() {
      this.getUserAndChatData()
    }
  },
  methods: {
    setIsMenuVisible() {
      this.isMenu = !this.isMenu;
    },
    getUserAndChatData() {
      if (this.USER_ID != 0 && this.CHAT_ID != 0) {
        this.$store.dispatch("getById", this.CHAT_ID)
        .then((res) => {
            this.user = res.user
          this.chat = res.chat
        });
      }
    },
  },
  mounted() {
    this.getUserAndChatData()
  },
});
</script>

<style scoped>
.header-private {
  display: flex;
  height: 80px;
  justify-content: space-between;
  background: linear-gradient(217deg, #aeeb4dcc, rgb(213 213 64));
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.header__status {
  display: flex;
  align-items: stretch;
}
.btn__menu {
  font-size: 32px;
  border-radius: 12px;
  color: #a9ae2d;
  border:2px solid #a9ae2d;
  background-color: rgba(66, 168, 241, 0);
}
.btn__menu:hover,
.btn__menu:focus {
  color: #e0ce2b;
  border: 2px solid #e0ce2b;
  background-color: #fbff8500;
}
</style>
