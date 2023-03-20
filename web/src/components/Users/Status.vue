<template>
  <div id="status-block">
           <div class="status__BL" v-if='isInBlackList'>
            <span>Заблокован</span>
            <i class="el-icon-circle-close"></i>
        </div>
        <div class="status__friend" v-else-if="isFriendList">
            <span>Друг</span>
            <i class="el-icon-circle-check"></i>
        </div>
        <!-- <div class="status__onBL" v-if='hasYouOnBlackList'>
            <span>у блоці</span>
            <i class="el-icon-warning-outline"></i>
        </div> -->
        <div class="status__invite" v-else-if='hasYourFriendshipRequire'>
            <span>Запрошено</span>
            <i class="el-icon-question"></i>
        </div>
        <div class="status__invite" v-else-if='friendshipRequire'>
            <span>Запит</span>
            <i class="el-icon-question"></i>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
import { mapGetters } from "vuex";
  
  export default Vue.extend({
    props: {
        id: Number
    },
    computed: {
      ...mapGetters([
        'ID_LIST_OF_FRIEND_LIST',
        'ID_LIST_OF_BLACK_LIST',
        'ID_LIST_OF_ON_BLACK_LISTS',
        'ID_LIST_OF_SENT_INVITES_TO_FRIENDS',
        'ID_LIST_OF_FRIENDSHIP_REQUIRE',
      ]),
      isFriendList():boolean {
        return this.ID_LIST_OF_FRIEND_LIST.includes(this.id)
      },
      isInBlackList():boolean {
        return this.ID_LIST_OF_BLACK_LIST.includes(this.id)
      },
      // hasYouOnBlackList():boolean {
      //   return this.ID_LIST_OF_ON_BLACK_LISTS.includes(this.id)
      // },
      hasYourFriendshipRequire():boolean {
        return this.ID_LIST_OF_SENT_INVITES_TO_FRIENDS.includes(this.id)
      },
      friendshipRequire():boolean {
        return this.ID_LIST_OF_FRIENDSHIP_REQUIRE.includes(this.id)
      },
    },
  })
  
  </script>
  
  <style scoped>
  i {
    margin-left: 4px;
  }
  #status-block {
margin: 4px 8px;
border-radius: 4px;
font-size: 12px;
display: flex;
flex-wrap: wrap;
gap: 4px 8px;
  }
  .status__friend {
    color: rgb(28, 245, 28);
    background-color: rgba(28, 245, 28, 0.2);
    padding: 4px;
border: 0.5px solid rgb(28, 245, 28, 0.7);
border-radius: 4px;
  }
  .status__BL {
    color: rgb(217, 34, 34);
    background-color: rgba(217, 34, 34, 0.2);
border-radius: 4px;
padding: 4px;
border: 0.5px solid rgb(217, 34, 34, 0.7);
  }
  /* .status__onBL {
    color: rgb(236, 112, 17);
border-radius: 4px;
    background-color: rgba(236, 112, 17, 0.2);
    padding: 4px;
border: 0.5px solid rgb(236, 112, 17, 0.7);
  } */
  .status__invite {
border-radius: 4px;
    color: rgb(19, 137, 184);
    background-color: rgba(19, 137, 184, 0.2);
    padding: 4px;
border: 0.5px solid rgb(19, 137, 184, 0.7);
  }
  
  </style>