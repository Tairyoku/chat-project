<template>
  <div class="header-public">
    <div class="for-justify"></div>
    
    <div style="display: flex; align-items: center">
<ChatInfo :item="chat" />
</div>
<div>
  <el-button
  class="btn__menu"
      slot="reference"
      @click="setIsMenu"
      icon="el-icon-more-outline"
    >
  </el-button>
    <div 
    v-if="isMenu" 
    @mouseleave="setIsMenu"
    >
      <ChatMenu :chatId="chatId" />
    </div>
</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IChat, IUser } from "@/store/models";
import ChatMenu from "@/components/Messages/Public/Menu.vue";
import ChatInfo from "@/components/Messages/Public/PublicContainer.vue"

export default Vue.extend({
  data():{
      chatId: number,
      chat: IChat,
      isMenu: boolean,
      user: IUser,
    } {
    return {
      chatId: 0,
      chat: {} as IChat,
      isMenu: false,
      user: {} as IUser,
    };
  },
  components: {
    ChatInfo,
    ChatMenu
  },
  computed: {
    ...mapGetters([
      'CHAT_ID',
      "UPDATER"
    ]),   
  },
  watch: {
    CHAT_ID() {
      this.chatId = this.CHAT_ID
      this.getChat()
    },
    UPDATER() {
      this.getChat()
    }
  },
  methods: {
    setIsMenu() {
      this.isMenu = !this.isMenu;
    },
    getChat() {
      if (this.CHAT_ID != 0) {
        this.$store.dispatch("getChat", this.CHAT_ID)
        .then((res) => this.chat = res);
      }
    },
  },
  mounted() {
    this.getChat()
  }
});
</script>

<style scoped>
.header-public {
  display: flex;
  height: 80px;    
  justify-content: space-between;
  background: linear-gradient(217deg, #aeeb4dcc, rgb(213 213 64));
 border-bottom-left-radius: 12px;
 border-bottom-right-radius: 12px;
}
.btn__menu {
  font-size: 32px;
  border-radius: 12px;
  height: 100%;
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