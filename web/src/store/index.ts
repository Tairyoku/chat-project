import { WEB_SOCKET } from "@/api/routes";
import Vue from "vue";
import Vuex from "vuex";
import { IChat, IMessage, IUser } from "./models";
import ChatModule, { ChatState } from "./modules/chats"
import AuthModule, { AuthState } from "./modules/auth"
import UsersModule, { UsersState } from "./modules/users"
import MessagesModule, { MessagesState } from "./modules/messages"
import axiosInstanse from "@/api";
import RootState from "./types";
import axiosInstanseFormData from "@/api/forFormData";
Vue.use(Vuex);




export default new Vuex.Store<RootState>({
  state: () => ({
    chatState: {} as ChatState,
    usersState: {} as UsersState,
    messagesState: {} as MessagesState,
    authState: {} as AuthState,
    socket: {} as WebSocket,
    updater: 0,
  }),
  getters: {
    WEB_SOCKET: (state) => {
      return state.socket;
    },
    UPDATER: (state) => {
      return state.updater
    }
  },
  mutations: {
    openWebsocket(state, chatId: number) {
      state.socket = new WebSocket(WEB_SOCKET + chatId);
    },
    closeSocket(state) {
      state.socket.close(1000);
    },
    incrimentUpdater(state) {
      state.updater++
    },
  },
  actions: {
    /**
     * Знищує усі дані хешу(усі стейти) 
     */
    clearAllStateData({ }) {
      this.commit("closeSocket");
      window.localStorage.removeItem("token");
      this.commit("setSearchUsersList", [] as IUser[]);
      this.commit("setSearchChatsList", [] as IChat[]);
      this.commit("setUserId", 0);
      this.commit("setUser", {} as IUser);
      this.commit("setChatId", 0);
      this.commit("setFriendsList", [] as IUser[]);
      this.commit("setBlackList", [] as IUser[]);
      this.commit("setOnBlackLists", [] as IUser[]);
      this.commit("setSentInvitesList", [] as IUser[]);
      this.commit("setInvitationsList", [] as IUser[]);
      this.commit("setChatMessages", [] as IMessage[]);
      this.commit("setPublicChatList", [] as IChat[]);
      this.commit("setPrivateChatList", [] as IChat[]);
      // this.commit("incrimentUpdater");
      axiosInstanse.defaults.headers.common.Authorization = ""
      axiosInstanseFormData.defaults.headers.common.Authorization = ""
    },
    /**
     * Підключає користувача до кімнати синхроного виконання функцій  
     * 
     * @param {number} chatId - ID користувача
     */
    openWebsocket({ }, chatId: number) {
      this.commit("openWebsocket", chatId);
      this.state.socket.onmessage = (msg: any) => {
        if (msg.data == "send message") {
          this.dispatch("getNewMessage", chatId)
            .then(() => this.commit("incrimentUpdater"))
        } else {
          this.commit("incrimentUpdater");
          this.dispatch("usersList", this.getters.USER_ID)
        }

      };
    },
  },
  modules: {
    ChatModule,
    UsersModule,
    MessagesModule,
    AuthModule
  },
});
