<template>
  <div class="search"
  @mouseleave="isSearchVisible(false)"
  >
    <div class="search__search-line"
    v-on:input="searchHandler"
    >
    <el-input
        v-model="searchName"
        id="search__users"
        placeholder="Знайти..."
        @focus="isSearchVisible(true)"
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
    v-if="searchVivsible" 
    class="search__found"
    >
      <div v-if="searchName?.length == 0"></div>
      <div 
      v-else-if="USERS_SEARCH_RESULT?.length == 0 || validateName"
      class="search__not-found"
      >
      Нікого не знайдено
    </div>
      <div v-else>
        <ul class="search__list" >
          <li
            :key="item.id"
            v-for="item in USERS_SEARCH_RESULT"
          >
          <div class="" @click="getChat(item.id)">
            <UserContainer :user="item" />
          </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import UserContainer from "@/components/Users/UserContainer.vue";

export default Vue.extend({
  data():{
      searchVivsible: boolean,
      searchName: string,
    } {
    return {
      searchVivsible: false,
      searchName: "",
    };
  },
  components: {
    UserContainer,
  },
  computed: {
    ...mapGetters([
      'USERS_SEARCH_RESULT'
    ]),
    validateName():boolean {
     return !/^[a-zа-яА-ЯёЁїЇіІєЄA-Z]/.test(this.searchName)
    }
  },
  methods: { 
    isSearchVisible(res: boolean) {
      if (res == false) document.getElementById('search__users')?.blur()
      this.searchVivsible = res;
    },
    clearSearch() {
      this.isSearchVisible(false)
      this.searchName = "";
    },
    searchHandler() {
      if (this.searchName != "") {
        this.$store.dispatch("searchUsers", this.searchName);
      }
    },
getChat(id: number) {
  this.$emit('getChat', id)
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
  margin-left: 0; 
  padding-left: 0; 
  overflow-x: inherit;
    overflow-y: auto;
    margin-block-start: 0;
    height: calc(100vh - 32px);
}
.search {
  width: inherit;
}
.search__search-line {
  display: flex;
  color: black;
  background-color: #fff0;
}
:deep(.el-input__inner:hover),
:deep(.el-input__inner:focus),
:deep(.el-input__inner) {
  background-color: #fff0;
  border: 2px solid #245f1aab;
  color: #245f1a;
  font-size: 18px;
}
.search__found {
  background: linear-gradient(#fffbef, rgb(213 213 64));
  position: absolute;
  z-index: 3;
  width: inherit;
  margin-top: -2px;
  height: -webkit-fill-available;
}
.search__not-found {
  font-size: 24px;
  color: #245f1a;
  margin: 20px;
}
:deep(.el-input__prefix),
:deep(.el-input__suffix),
:deep(.el-input__inner::placeholder) {
    color: #245f1aab;
} 
.search__list::-webkit-scrollbar {
  width: 12px;
}
.search__list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.search__list::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>
