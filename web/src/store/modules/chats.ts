import {
  USER_PUBLIC,
  USER_PRIVATE,
  CHANGE_CHAT_ICON,
  CREATE_PUBLIC_CHAT,
  CREATE_PRIVATE_CHAT,
  GET_CHAT,
  GET_BY_ID,
  GET_USERS,
  ADD_TO_CHAT,
  DELETE_FROM_CHAT,
  DELETE_CHAT,
  SEARCH_CHAT,
} from "@/api/routes";
import axiosInstanse from "@/api";
import axiosInstanseFormData from "@/api/forFormData";
import { IChat, IUser } from "../models";
import { Module } from "vuex";
import { RootState } from "../index"

export interface ChatState {
  // ID відкритого чату
  chatId: number,

  // Список ОСОБИСТИХ чатів
  privateChatList: IChat[],

  // Список ПУБЛІЧНИХ чатів
  publicChatList: IChat[],

  // Список знайдених чатів
  searchChatsList: IChat[],
}
// states 4; getters 4; mutations 4; actions 13;
const ChatModule: Module<ChatState, RootState> = ({
  state: () => ({
    chatId: 0,
    privateChatList: [],
    publicChatList: [],
    searchChatsList: [],
  }),
  getters: {
    CHAT_ID: (state: ChatState) => {
      return state.chatId;
    },
    CHATS_SEARCH_RESULT: (state: ChatState) => {
      return state.searchChatsList;
    },
    PRIVATE_CHAT_LIST: (state: ChatState) => {
      return state.privateChatList;
    },
    PUBLIC_CHAT_LIST: (state: ChatState) => {
      return state.publicChatList;
    },
  },
  mutations: {
    setSearchChatsList(state: ChatState, list: IChat[]) {
      state.searchChatsList = list;
    },
    setChatId(state: ChatState, chatId: number) {
      state.chatId = chatId;
    },
    setPublicChatList(state: ChatState, list: IChat[]) {
      state.publicChatList = list?.sort((a, b) =>
        a.name.localeCompare(b.name));
    },
    setPrivateChatList(state: ChatState, list: IChat[]) {
      state.privateChatList = list?.sort((a, b) =>
        a.name.localeCompare(b.name));
    },
  },
  actions: {
    /**
     * Оновлює список ПУБЛІЧНИХ чатів, в яких знаходиться користувач, за його ID
     * 
     * @param {number} userId - ID користувача
     */
    async getUserPublicChats({ }, userId: number) {
      await axiosInstanse
        .get(USER_PUBLIC(userId))
        .then((res) => {
          this.commit("setPublicChatList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
  * Повертає список ПУБЛІЧНИХ чатів, в яких знаходиться користувач, за його ID
  * 
  * @param {number} userId - ID користувача
  * @promise список ПУБЛІЧНИХ чатів 
  */
    async getPublicChats({ }, userId: number) {
      let data = [] as IChat[]
      await axiosInstanse
        .get(USER_PUBLIC(userId))
        .then((res) => data = res.data.list)
        .catch((err) => {
          console.log(err);
        });
      return new Promise((resolve, reject) => {
        resolve(data);
      });

    },
    /**
   * Оновлює список ПРИВАТНИХ чатів, в яких знаходиться користувач, за його ID
   * 
   * @param {number} userId - ID користувача
   */
    async getUserPrivateChats({ }, userId: number) {
      await axiosInstanse
        .get(USER_PRIVATE(userId))
        .then((res) => {
          this.commit("setPrivateChatList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Змінює зображення чату
     * 
     * @param {number} chatId - ID чату
     * @param {FormData} image - файл зображення
     */
    async changeChatIcon({ }, { chatId, image }) {
      await axiosInstanseFormData
        .put(CHANGE_CHAT_ICON(chatId), image)
        .catch((err) => console.log(err));
    },
    /**
     * Створює новий ПУБЛІЧНИЙ чат
     * 
     * @param {string} name - назва чату
     */
    async createPublicChat({ }, name: string) {
      await axiosInstanse
        .post(CREATE_PUBLIC_CHAT, {
          "name": name,
        })
        .catch((err) => console.log(err));
    },
    /**
     * Створює ПРИВАТНИЙ чат (якщо його ще нема)
     * та оновлює список повідомлень
     * 
     * @param {number} userId - ID користувача
     * @returns ID чату
     */
    async createPrivateChat({ }, userId: number) {
      let chatId: number;
      await axiosInstanse
        .get(CREATE_PRIVATE_CHAT(userId))
        .then((res) => {
          chatId = res.data.chatId;
        })
        .catch((err) => {
          console.log(err);
        });
      return new Promise((resolve, reject) => {
        resolve(chatId);
      });
    },
    /**
     * Повертає дані чату за його ID
     * @param {number} chatId - ID чату 
     * @returns дані чату
     */
    async getChat({ }, chatId: number): Promise<IChat> {
      let chat: IChat;
      await axiosInstanse
        .get(GET_CHAT(chatId))
        .then((res) => {
          chat = res.data.chat;
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(chat);
      });
    },
    /**
     * Повертає дані чату та (якщо чат ПРИВАТНИЙ) дані користувача
     * 
     * @param {number} chatId - ID чату 
     * @returns user та chat - дані користувача та чату
     */
    async getById({ }, chatId: number): Promise<object> {
      let data: object;
      await axiosInstanse
        .get(GET_BY_ID(chatId))
        .then((res) => {
          this.commit('setChatId', res.data.chat.id)
          data = res.data;
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    /**
     * Повертає список користувачів чатом та їх кількість
     * 
     * @param {number} chatId - ID чату 
     * @returns list та size - список користувачів чатом та їх кількість
     */
    async getChatUsers({ }, chatId: number) {
      let data: {
        list: IUser[],
        size: number
      }
      await axiosInstanse
        .get(GET_USERS(chatId))
        .then((res) => {
          data = {
            list: res.data,
            size: res.data.length
          }
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    /**
     * Додає користувача до чату
     * 
     * @param {number} userId - ID користувача 
     * @param {number} chatId - ID чату 
     */
    async addUserToChat({ }, { userId, chatId }) {
      await axiosInstanse
        .post(ADD_TO_CHAT(chatId), {
          "user_id": userId,
        }).then(() => {
          this.dispatch("getUserPublicChats", this.state.authState.userId);
          this.dispatch("usersList", this.state.authState.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
 * Видаляє користувача з чату
 * 
 * @param {number} userId - ID користувача 
 * @param {number} chatId - ID чату 
 */
    async deleteUserFromChat({ }, { userId, chatId }) {
      await axiosInstanse
        .put(DELETE_FROM_CHAT(chatId), {
          "user_id": userId,
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
* Видаляє  чат
*  
* @param {number} chatId - ID чату 
*/
    async deleteChat({ }, chatId: number) {
      await axiosInstanse
        .delete(DELETE_CHAT(chatId))
        .then((res) => {
          this.dispatch("getUserPublicChats", this.state.authState.userId);
          this.dispatch("getUserPrivateChats", this.state.authState.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Оновлює список знайдених чатів за частиною назви
     * 
     * @param {string} name - частина назви чату
     */
    async searchChats({ }, name: string) {
      await axiosInstanse
        .get(SEARCH_CHAT(name))
        .then((res) => {
          this.commit("setSearchChatsList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default ChatModule