import axiosInstanse from "@/api";
import axiosInstanseFormData from "@/api/forFormData";
import router from "@/router";
import { IUser } from "../models";
import { Module } from "vuex";
import {
  CHANGE_ICON,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  GET_ME,
  SIGN_IN,
  SIGN_UP
} from "@/api/routes";
import RootState from "../types";

export interface AuthState {
  // ID активного користувача
  userId: number,

  // Дані АКТИВНОГО користувача
  user: IUser,
}

// states 2; getters 2; mutations 2; actions 7;
const AuthModule: Module<AuthState, RootState> = ({
  state: () => ({
    userId: 0,
    user: {} as IUser,
  }),
  getters: {
    USER: (state) => {
      return state.user;
    },
    USER_ID: (state) => {
      return state.userId;
    },
  },
  mutations: {
    setUserId(state, userId: number) {
      state.userId = userId;
    },
    setUser(state, user: IUser) {
      state.user = user;
    },
  },
  actions: {
    /**
     * Перевіряє, чи залогінений користувач.
     * Якщо залогінен, отримує від сервера дані користувача.
     * Якщо логіну немає, відкриває сторінку реєстрації.
     */
    async getStarted({ }) {
      await axiosInstanse
        .get(GET_ME)
        .then((auth) => {
          if (auth.status == 204 || auth.status == 205) {
            if (router.currentRoute.name != "sign-up") {
              router.push({ name: "sign-up" });
            }
            return
          }
          if (auth.data.id == 0) {
            window.localStorage.removeItem("token");
            if (router.currentRoute.name != "sign-up") {
              router.push({ name: "sign-up" });
            }
            return
          }
          this.commit("setUserId", auth.data.id);
          this.dispatch("getUserPublicChats", auth.data.id);
          this.dispatch("getUserPrivateChats", auth.data.id);
          this.dispatch("usersList", auth.data.id);
          this.dispatch("getUser", auth.data.id)
            .then((res) => {
              this.commit("setUser", res);
            });
        })
        .catch((err) => {
          if (router.currentRoute.name != "sign-up") {
            router.push({ name: "sign-up" });
          }
        });
    },
    /**
     * Отримує від користувача ім'я та пароль, 
     * та реєструє нового користувача
     * 
     * @param {string} username - ім'я користувача
     * @param {string} password - пароль користувача
     */
    async register({ }, { username, password }) {
      let data = {} as any
      await axiosInstanse
        .post(SIGN_UP, {
          "username": username,
          "password": password,
        })
        .then((auth) => {
          if (auth.status == 202) {
            data = auth
          }
          window.localStorage.setItem("token", auth.data.token)
          axiosInstanse.defaults.headers.common.Authorization = auth.data.token
          axiosInstanseFormData.defaults.headers.common.Authorization = auth.data.token
          this.dispatch('getStarted')
        })
        .catch((err) => { data = err });
      return new Promise((resolve, reject) => {
        resolve(data);
      })
    },
    /**
   * Отримує від користувача ім'я та пароль, 
   * та логінить користувача
   * 
   * @param {string} username - ім'я користувача
   * @param {string} password - пароль користувача
   */
    async login({ }, { username, password }) {
      let data = {} as any
      await axiosInstanse
        .post(SIGN_IN, {
          "username": username,
          "password": password,
        })
        .then((auth) => {
          if (auth.status == 202) {
            data = auth.data.message
            return
          }
          window.localStorage.setItem("token", auth.data.token)
          axiosInstanse.defaults.headers.common.Authorization = auth.data.token
          axiosInstanseFormData.defaults.headers.common.Authorization = auth.data.token
          this.dispatch('getStarted')
        })
        .catch((err) => { data = err });
      return new Promise((resolve, reject) => {
        resolve(data);
      })
    },
    /**
     * Розлогінює користувача (видаляє токен)
     */
    logout() {
      window.localStorage.removeItem("token");
      this.dispatch("clearAllStateData");
    },
    /**
  * Отримує від користувача старий та новий паролі, 
  * змінює пароль користувача на новий
  * 
  * @param {string} oldPassword - старий пароль для підтвердження
  * @param {string} newPassword - новий пароль
  */
    async changePassword({ }, { oldPassword, newPassword }) {
      let data = {} as any
      await axiosInstanse
        .put(CHANGE_PASSWORD, {
          "old_password": oldPassword,
          "new_password": newPassword,
        })
        .then((auth) => {
          if (auth.status == 202) {
            data = auth
            return
          }
        })
        .catch((err) => data = err);
      return new Promise((resolve) => {
        resolve(data);
      })
    },
    /**
 * Отримує від користувача нове ім'я, змінює ім'я користувача
 *  на нове, за умови, що воно не зайнято
 * 
 * @param {string} username - ім'я користувача
 */
    async changeUsername({ }, { username }) {
      let data = {} as any
      await axiosInstanse
        .put(CHANGE_USERNAME, {
          "username": username,
        })
        .then((auth) => {
          if (auth.status == 202) {
            data = auth
            return
          }
        })
        .catch((err) => data = err);
      return new Promise((resolve) => {
        resolve(data);
      })
    },
    /**
 * Отримує від користувача новий файл зображення, та оновнює його
 * 
 * @param {FormData} image - зображення користувача
 */
    async changeIcon({ }, image: any) {
      await axiosInstanseFormData
        .put(CHANGE_ICON, image)
    },
  },
});

export default AuthModule
