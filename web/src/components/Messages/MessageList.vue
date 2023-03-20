<template>
  <div class="messages" id="messages">
    <div class="scroll" ref="changeMessage" v-if="scrollHandler">
      <i class="el-icon-loading" v-if="loaderVisible"></i>
    </div>
      <ul id="list">
      <li
        v-for="(message, index) in MESSAGE_LIST"
        :key="message.id"
      >
      <MessageDate :message="message" v-if="getDate(message, index)" />
        <PersonalMessage 
        v-if="message.author == USER_ID" 
        :tail="isLast(message, index)" 
        :message="message" 
        />
        <UsersMessage 
        v-else 
        :message="message" 
        :tail="isLast(message, index)" 
        />
      </li>
    </ul>
    <div id="arrowTop"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMessage } from "@/store/models";
import MessageDate from "./MessageDate.vue";
import UsersMessage from "@/components/Messages/UsersMessage.vue";
import PersonalMessage from "@/components/Messages/PersonalMessage.vue";
const minLimit = 8;

export default Vue.extend({
  props: {
    chat: Object,
  },
  data():{
      loaderVisible: boolean,
      limit: number,
      msgLength: number,
      scrollHandler: boolean,
    } {
    return {
      loaderVisible: false,
      limit: minLimit,
      msgLength: 0,
      scrollHandler: true,
    };
  },
  components: {
    PersonalMessage,
    UsersMessage,
    MessageDate
  },
  computed: {
    ...mapGetters(["MESSAGE_LIST", "CHAT_ID", "USER_ID"]),
  },
  watch: {
    CHAT_ID() {
      this.scrollTrigger();
    },
  },
  methods: {
    isLast(message: IMessage, index: number): boolean {
      if (index == this.MESSAGE_LIST?.length - 1) {
        return true;
      } else if (message.author == this.MESSAGE_LIST[index + 1].author) {
        return false;
      }
      return true;
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.loaderVisible = true;
            this.msgLength = this.MESSAGE_LIST?.length;
            this.$store
            .dispatch("getLimitChatMessages", {
              chatId: this.CHAT_ID,
              limit: this.limit,
            })
            .then(() => {
              document.getElementById("messages")?.scrollTo(0, 100)
              this.loaderVisible = false;
              if (!this.MESSAGE_LIST?.length) return
              if (this.msgLength == this.MESSAGE_LIST?.length && this.MESSAGE_LIST?.length) {
                observer.disconnect();
              }
              this.limit += 6;
              });
          }
        });
      });
      observer.observe(this.$refs.changeMessage as Element);
    },
    getDate(message: IMessage, index: number): boolean {
      if (index == 0) return true;
      let date = new Date(Date.parse(message.sent_at));
      let listDate = new Date(Date.parse(this.MESSAGE_LIST[index - 1].sent_at));
      if (date.getMonth() != listDate.getMonth()) {
        return true;
      } else if (date.getDate() != listDate.getDate()) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.scrollTrigger();
  },
});
</script>

<style scoped>
li {
  margin: -8px 0;
  list-style-type: none;
}
ul {
  margin-left: 0; 
  padding-left: 0;
  margin-block-start: 0;
  margin-block-end: 0;
}
#list {
  width: calc(50vw - 1em - 4px);
    display: flex;
    align-self: end;
    min-height: 56vh;
    flex-direction: column;
    justify-content: flex-end;
}
.messages {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 140px - 80px);
}
.scroll {
  height: 50px;
  margin-bottom: 10px;
  background: #0000;
  font-size: 48px;
}

.messages::-webkit-scrollbar {
  width: 12px;
}
.messages::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.messages::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>
