import axiosInstanse from "@/api";
import axiosInstanseFormData from "@/api/forFormData";
import router from "@/router";
import { IUser } from "../models";
import { Module } from "vuex";
import { RootState } from "../index"
import { 
    CHANGE_ICON, 
    CHANGE_PASSWORD, 
    CHANGE_USERNAME, 
    GET_ME,
     SIGN_IN, 
    SIGN_UP 
} from "@/api/routes";

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
            console.log(err)
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
        await axiosInstanse
          .post(SIGN_UP, {
            "username": username,
            "password": password,
          })
          .then((auth) => {
            window.localStorage.setItem("token", auth.data.token)
            axiosInstanse.interceptors.request.use((config) => {
              const token = window.localStorage.getItem("token")
              if (token) {
                config.headers.Authorization = auth.data.token;
              }
              return config
            })
          this.dispatch('getStarted')
          })
          .catch((err) => console.log(err));
      },
       /**
      * Отримує від користувача ім'я та пароль, 
      * та логінить користувача
      * 
      * @param {string} username - ім'я користувача
      * @param {string} password - пароль користувача
      */
      async login({ }, { username, password }) {
        await axiosInstanse
          .post(SIGN_IN, {
            "username": username,
            "password": password,
          })
          .then((auth) => {
            window.localStorage.setItem("token", auth.data.token)
            axiosInstanse.interceptors.request.use((config) => {
              const token = window.localStorage.getItem("token")
              if (token) {
                config.headers.Authorization = auth.data.token;
              }
              return config
            })
          this.dispatch('getStarted')
          })
          .catch((err) => console.log(err));
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
        await axiosInstanse
          .put(CHANGE_PASSWORD, {
            "old_password": oldPassword,
            "new_password": newPassword,
          })
          .catch((err) => console.log(err));
      },
          /**
       * Отримує від користувача нове ім'я, змінює ім'я користувача
       *  на нове, за умови, що воно не зайнято
       * 
       * @param {string} username - ім'я користувача
       */
      async changeUsername({ }, { username }) {
        await axiosInstanse
          .put(CHANGE_USERNAME, {
            "username": username,
          })
          .catch((err) => console.log(err));
      },
          /**
       * Отримує від користувача новий файл зображення, та оновнює його
       * 
       * @param {FormData} image - зображення користувача
       */
      async changeIcon({ }, image: any) {
        await axiosInstanseFormData
          .put(CHANGE_ICON, image)
          .catch((err) => console.log(err));
      },
    },
  });
  
  export default AuthModule
