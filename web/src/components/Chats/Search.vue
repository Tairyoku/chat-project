<template>
  <div class="search">
    <div class="search__search-line" 
    >
    <el-input
    v-on:input="searchHandler"
        v-model="searchName"
        placeholder="Знайти..."
        @focus="isSearchWindowVisible(true)"
      >
        <i 
        slot="prefix" 
        class="el-input__icon el-icon-search"
        ></i>
        <i
          slot="suffix"
          class="el-input__icon el-icon-circle-close"
          @click="clearSearch"
        ></i>
      </el-input>
    </div>
    <div 
    v-if="searchVisible" 
    @mouseleave="isSearchWindowVisible(false)"
    class="search__found">
      <div v-if="searchName?.length == 0"></div>
      <div 
      v-else-if="CHATS_SEARCH_RESULT?.length == 0"
    class="search__not-found"
      >
      Чатів не знайдено
    </div>
      <div v-else>
        <ul>
          <li
            style="list-style-type: none; margin-bottom: 16px;"
            :key="item.id"
            v-for="item in CHATS_SEARCH_RESULT"
          >
  <ChatContainer @click="getChat(item.id)" :chat="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style></style>

<script lang="ts">
import Vue from "vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      searchVisible: false,
      searchName: "",
    };
  },
  components: {
    ChatContainer,
  },
  computed: {
    ...mapGetters([
      "CHATS_SEARCH_RESULT",
      "CHAT_ID"
    ]),
  },
  methods: {
    getChat(chatId: number) {
      if (this.CHAT_ID != chatId) {
      this.$store.commit("setChatId", chatId);
      this.$router.push(`/chat/${chatId}`);
      }
    },
    isSearchWindowVisible(res: boolean) {
      this.searchVisible = res;
    },
    clearSearch() {
      this.searchName = "";
    },
    searchHandler() {
      if (this.searchName?.length != 0) {
        this.$store.dispatch("searchChats", this.searchName);
      }
    },
  },
});
</script>

<style scoped>
ul {
 margin-left: 0; 
  padding-left: 0;
}
.search {
  width: inherit;
}

.search__found {
  background: linear-gradient(#beef71, rgb(229 255 173));
  position: absolute;
  z-index: 3;
  width: inherit;
  overflow-y: auto;
  height: calc(100vh - 32px);

}
.search__search-line {
  display: flex;
  background-color: rgba(255, 255, 255, 0);
}
:deep(.el-input__inner:focus),
:deep(.el-input__inner:hover),
:deep(.el-input__inner) {
    background-color: #fff0;
    border: 2px solid #929224ab;
    color: #929224;
}

:deep(.el-input__prefix),
:deep(.el-input__suffix),
:deep(.el-input__inner::placeholder) {
    color: #929224ab;
}
.search__not-found {
  font-size: 24px;
  color: #929224;
  margin: 20px;
}
.search__found::-webkit-scrollbar {
  width: 12px;
}
.search__found::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.search__found::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>