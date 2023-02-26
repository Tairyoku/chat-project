<template>
  <div class="status-btn">
    <!-- Розблокувати -->
    <el-button
      v-if="getBlackList"
      type="danger"
      @click="deleteFromBlackList"
      round
    >
      Розблокувати
    </el-button>

    <!-- Прийняти/Відхилити запит  -->
    <div v-else-if="getInvitations">
      <span>Запит до друзів</span>
      <div style="margin-top: 8px">
        <el-button type="primary" @click="acceptInvite" round >Прийняти</el-button>
        <el-button type="warning" @click="refuseInvite" round >Відхилити</el-button>
      </div>
    </div>

    <!-- Відмінити запит -->
    <div class="sent__invite" v-else-if="getSentInvites">
      <span style="margin-bottom: 8px">Запрошення надіслано</span>
      <el-button type="primary" @click="cancelInvite" round >Відмінити</el-button>
    </div>

    <!-- Вислати запит -->
      <el-button 
      v-else-if="!getStatusFriend" 
      type="success"
      @click="addToFriends" 
      round
        >Запросити до друзів</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    userId: Number,
  },
  computed: {
    ...mapGetters([
      "ID_LIST_OF_FRIEND_LIST",
      "ID_LIST_OF_BLACK_LIST",
      "ID_LIST_OF_SENT_INVITES_TO_FRIENDS",
      "ID_LIST_OF_FRIENDSHIP_REQUIRE",
      "USER_ID",
      "WEB_SOCKET",
    ]),
    getStatusFriend(): boolean {
      return this.ID_LIST_OF_FRIEND_LIST.includes(this.userId);
    },
    getBlackList(): boolean {
      return this.ID_LIST_OF_BLACK_LIST.includes(this.userId);
    },
    getInvitations(): boolean {
      return this.ID_LIST_OF_FRIENDSHIP_REQUIRE.includes(this.userId);
    },
    getSentInvites(): boolean {
      return this.ID_LIST_OF_SENT_INVITES_TO_FRIENDS.includes(this.userId);
    },
  },
  methods: {
    updateData() {
      this.$store.dispatch("usersList", this.USER_ID);
      this.WEB_SOCKET.send("update info");
    },
    cancelInvite() {
      this.$store.dispatch("cancelInvite", this.userId)
      .then(() => this.updateData());
    },
    addToFriends() {
      this.$store.dispatch("addToFriends", this.userId)
      .then(() => this.updateData());
    },
    deleteFromBlackList() {
      this.$store.dispatch("deleteFromBlackList", this.userId)
      .then(() => this.updateData());
    },
    acceptInvite() {
      this.$store.dispatch("acceptInvite", this.userId)
      .then(() => this.updateData());
    },
    refuseInvite() {
      this.$store.dispatch("refuseInvite", this.userId)
      .then(() => this.updateData());
    },
  },
});
</script>

<style scoped>
.status-btn {
  margin: auto 20px;
  display: flex;
  height: 100%;
  align-items: center;
}

:deep(.el-button) {
  font-size: 14px;
  border-radius: 8px;
  padding: 8px;
}
:deep(.el-button:focus),
:deep(.el-button:hover) {
  color: #469422;
  background-color: #fbff85;
}
:deep(.el-button.is-round) {
  padding: 8px;
}
.sent__invite {
  display: flex;
  flex-direction: column;
}
</style>
