<template>
  <div class="userslist">
      <ul>
        <li
          :key="item.id"
          v-for="item in friendsToChat"
        >
            <UserContainer :user="item" @click="addUserToChat(item.id)" />
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";
import Notifications from "vue-notification";
import UserContainer from "@/components/Users/UserContainer.vue";

export default Vue.extend({
  data():{
      users: IUser[],
      list: IUser[],
      confirmVisible: boolean,
    } {
    return {
      users: [] as IUser[],
      list: [] as IUser[],
      confirmVisible: false,
    };
  },
  components: {
    UserContainer,
  },
  computed: {
    ...mapGetters([
      "FRIEND_LIST",
      "CHAT_ID",
      "WEB_SOCKET",
    ]),
    friendsToChat():IUser[] {
      let result = [] as IUser[]
      this.FRIEND_LIST.forEach((friend: IUser) => {
        let check = 0
        this.users.forEach((user:IUser) => {
        // Якщо користувачі співпадають, то збільшуємо check на 1
          if (friend.id == user.id) check++;
        })
        // check = 0 означає, що збігів не було
        if (check == 0) result.push(friend);
      })
        return result;
    },  
  },
  watch: {
    CHAT_ID() {
      this.$store.dispatch("getChatUsers", this.CHAT_ID)
      .then((res) => this.users = res.list);
    },
  },
  methods: {
    close() {
      this.$emit("close")
    },
    addUserToChat(id: number) {
      this.confirmVisible = false;
      this.$store
        .dispatch("addUserToChat", { 
          userId: id, 
          chatId: this.CHAT_ID 
        })
        .then(() => {
          this.$notify({
            title: "Успіх",
            text: "Ви додали користувача до чату",
            type: "success",
          });
          this.WEB_SOCKET.send("update");
          this.close()
        });
    },
  },
  mounted() {
    this.$store.dispatch("getChatUsers", this.CHAT_ID)
    .then((res) => this.users = res.list);
  },
});
</script>

<style scoped>
ul {
  margin-left: 0; 
  padding-left: 0;
}
li {
  list-style-type: none; 
  margin-bottom: 8px;
}
.userslist {
  width: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  height: 60vh;
}
.userslist::-webkit-scrollbar {
  width: 12px;
}
.userslist::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
}
.userslist::-webkit-scrollbar-thumb {
  background-color: #317d23e1;
  border-radius: 4px;
}
</style>
