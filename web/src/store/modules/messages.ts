import axiosInstanse from "@/api";
import { IMessage } from "../models";
import { Module } from "vuex";
import { RootState } from "../index"
import { GET_LIMIT_MESSAGES, CREATE_MESSAGE } from "@/api/routes";

export interface MessagesState {
    // Список повідомлень
    messages: IMessage[],
}

// states 1; getters 1; mutations 2; actions 3;
const MessagesModule: Module<MessagesState, RootState> = ({
    state: () => ({
        messages: [],
    }),
    getters: {
        MESSAGE_LIST: (state) => {
            return state.messages;
        },
    },
    mutations: {
        setChatMessages(state, list: IMessage[]) {
            state.messages = list;
        },
        setPushMessage(state, list: IMessage) {
            state.messages?.push(list);
        },
    },
    actions: {
        /**
         * Додає останнє повідомлення до чату
         * 
         * @param {number} chatId - ID чату 
         */
        async getNewMessage({ }, chatId: number) {
            await axiosInstanse
                .get(GET_LIMIT_MESSAGES(chatId, 2))
                .then((res) => {
                    if (res.data.list.length != 1) {
                        this.commit('setPushMessage', res.data.list[1]);
                    } else {
                        this.commit("setChatMessages", res.data.list);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * Повертає список повідомлень чату
         * 
         * @param {number} chatId - ID чату 
         * @param {number} limit - кількість
         */
        async getLimitChatMessages({ }, { chatId, limit }
            : { chatId: number, limit: number }) {
            // let data: IMessage[];
            await axiosInstanse
                .get(GET_LIMIT_MESSAGES(chatId, limit))
                .then((res) => {
                    this.commit("setChatMessages", res.data.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * Створює повідомлення та оновлює список повідомлень чату
         * @param {number} chatId - ID чату 
         * @param {string} text - текст повідомлення 
         */
        async createMessage({ }, { chatId, text }) {
            await axiosInstanse
                .post(CREATE_MESSAGE(chatId), {
                    "text": text,
                })
                .catch((err) => console.log(err));
        },
    },
});

export default MessagesModule
