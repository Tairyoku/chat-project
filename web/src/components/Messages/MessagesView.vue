<template>
    <Loading v-if="loading" :size="100" />
    <ErrorView v-else-if="errorChat" />
  <div class="" v-else>
    <div v-if="typeOfChat == `private`">
      <PrivateHeader />
    </div>
    <div v-else-if="typeOfChat == `public`">
      <PublicHeader />
    </div>
    <MessageList :chat="chat" />
    <MessageCreate />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IChat } from "@/store/models";
import PrivateHeader from "@/components/Messages/Private/Header.vue";
import PublicHeader from "@/components/Messages/Public/Header.vue";
import MessageList from "@/components/Messages/MessageList.vue";
import MessageCreate from "@/components/Messages/CreateMessage.vue";
import Loading from "@/components/Loading.vue";
import ErrorView from "@/components/ErrorView.vue";
import router from "@/router";
const minLimit = 8;

export default Vue.extend({
  data():{
      limit: number,
      chat: IChat,
      errorChat: boolean,
      loading: boolean,
    } {
    return {
      errorChat: false,
      limit: minLimit,
      chat: {} as IChat,
      loading: true,
    };
  },
  components: {
    PrivateHeader,
    PublicHeader,
    MessageList,
    MessageCreate,
    Loading,
    ErrorView,
  },
  methods: {
    getChatMessages(id: number) {
      this.$store.dispatch("getChat", id)
      .then((res) => { 
        if (res == undefined) {
          router.push({name: "default"})
        return
        }
        this.chat = res
      });
    },
    openWebsocket(chatId: number) {
      if (this.WEB_SOCKET.readyState != undefined) {
        this.$store.commit("closeSocket");
      }
      this.$store.dispatch("openWebsocket", chatId);
    },
  },
  watch: {
    CHAT_ID() {
      if (this.CHAT_ID == 0) return;
      this.limit = minLimit;
      // this.getChatMessages(this.CHAT_ID);
      this.$store.dispatch("getChat", this.CHAT_ID)
      .then((res) => { 
        if (res == undefined) {
          this.loading = false
          this.errorChat = true
          return
        }
        this.loading = false
        this.errorChat = false
        this.chat = res
        this.openWebsocket(this.CHAT_ID);
        if (this.chat.id != this.CHAT_ID) {
          this.$store.dispatch("getLimitChatMessages", {
            chatId: this.CHAT_ID,
            limit: this.limit,
          })
          setTimeout(
            () => document.getElementById("arrowTop")?.scrollIntoView(),
            300
            );
          }
        });
        },
        UPDATER() {
      if (this.CHAT_ID == 0) return;
      this.limit = minLimit;
      // this.getChatMessages(this.CHAT_ID);
      this.$store.dispatch("getChat", this.CHAT_ID)
      .then((res) => { 
        if (res == undefined) {
          this.loading = false
          this.errorChat = true
          return
        }
        this.loading = false
        this.errorChat = false
        this.chat = res
        // this.openWebsocket(this.CHAT_ID);
        if (this.chat.id != this.CHAT_ID) {
          this.$store.dispatch("getLimitChatMessages", {
            chatId: this.CHAT_ID,
            limit: this.limit,
          })
          setTimeout(
            () => document.getElementById("arrowTop")?.scrollIntoView(),
            300
            );
          }
        });
        },
  },
  computed: {
    ...mapGetters(["CHAT_ID", "WEB_SOCKET", "UPDATER"]),
    typeOfChat(): string {
      return this.chat.types;
    },
  },
  created() {
    this.$store.commit("setChatId", Number(this.$route.params.id));
  },
});
</script>
