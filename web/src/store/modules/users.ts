import axiosInstanse from "@/api";
import { IUser } from "../models";
import { Module } from "vuex";
import { RootState } from "../index"
import {
    USER_DATA,
    SEARCH_USERS,
    USERS_LIST,
    ADD_FRIEND,
    CANCEL_INVITE,
    ACCEPT,
    REFUSE,
    ADD_TO_BL,
    DELETE_FROM_BL,
    DELETE_FRIEND
} from "@/api/routes";

export interface UsersState {
    // Список знайдених користувачів
    searchUsersList: IUser[],

    // Список друзів
    friendsList: IUser[],

    // Список заблокованих користувачів
    blackList: IUser[],

    // Список користувачів, що заблокували активного користувача
    onBlackList: IUser[],

    // Список користувачів, що отримали запрошення в друзі
    sentInvitesList: IUser[],

    // Список користувачів, що запросили у друзі
    invitationsList: IUser[],
}

// states 6; getters 11; mutations 6; actions 10;
const UsersModule: Module<UsersState, RootState> = ({
    state: () => ({
        searchUsersList: [],
        friendsList: [],
        blackList: [],
        onBlackList: [],
        sentInvitesList: [],
        invitationsList: [],
    }),
    getters: {
        FRIEND_LIST: (state) => {
            return state.friendsList;
        },
        BLACK_LIST: (state) => {
            return state.blackList;
        },
        ON_BLACK_LISTS: (state) => {
            return state.onBlackList;
        },
        SENT_INVITES_TO_FRIENDS: (state) => {
            return state.sentInvitesList;
        },
        FRIENDSHIP_REQUIRE: (state) => {
            return state.invitationsList;
        },
        ID_LIST_OF_FRIEND_LIST: (state) => {
            let list: number[] = [];
            state.friendsList.forEach((item) => list.push(item.id));
            return list;
        },
        ID_LIST_OF_BLACK_LIST: (state) => {
            let list: number[] = [];
            state.blackList.forEach((item) => list.push(item.id));
            return list;
        },
        ID_LIST_OF_ON_BLACK_LISTS: (state) => {
            let list: number[] = [];
            state.onBlackList.forEach((item) => list.push(item.id));
            return list;
        },
        ID_LIST_OF_SENT_INVITES_TO_FRIENDS: (state) => {
            let list: number[] = [];
            state.sentInvitesList.forEach((item) => list.push(item.id));
            return list;
        },
        ID_LIST_OF_FRIENDSHIP_REQUIRE: (state) => {
            let list: number[] = [];
            state.invitationsList.forEach((item) => list.push(item.id));
            return list;
        },
        USERS_SEARCH_RESULT: (state) => {
            return state.searchUsersList;
        },
    },
    mutations: {
        setSearchUsersList(state, list: IUser[]) {
            state.searchUsersList = list;
        },
        setFriendsList(state, list: IUser[]) {
            state.friendsList = list.sort((a, b) =>
                a.username.localeCompare(b.username)
            );
        },
        setBlackList(state, list: IUser[]) {
            state.blackList = list.sort((a, b) =>
                a.username.localeCompare(b.username)
            );
        },
        setOnBlackLists(state, list: IUser[]) {
            state.onBlackList = list.sort((a, b) =>
                a.username.localeCompare(b.username)
            );
        },
        setSentInvitesList(state, list: IUser[]) {
            state.sentInvitesList = list.sort((a, b) =>
                a.username.localeCompare(b.username)
            );
        },
        setInvitationsList(state, list: IUser[]) {
            state.invitationsList = list.sort((a, b) =>
                a.username.localeCompare(b.username)
            );
        },
    },
    actions: {
        /**
         * Повертає як promise дані користувача за його ID
         * 
         * @param {number} userId - ID чату
         * @promise дані користувача 
         */
        async getUser({ }, userId: number): Promise<IUser> {
            let user: IUser;
            await axiosInstanse
                .get(USER_DATA(userId))
                .then((res) => {
                    user = res.data.user;
                })
                .catch((err) => console.log(err));
            return new Promise((resolve, reject) => {
                resolve(user);
            });
        },
        /**
     * Оновлює список знайдених користувачів за частиною імені
     * 
     * @param {string} username - записана частина імені користувача
     */
        async searchUsers({ }, username: string) {
            await axiosInstanse
                .get(SEARCH_USERS(username))
                .then((res) => {
                    this.commit("setSearchUsersList", res.data.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * Оновлює списки усіх типів відносин користувача
         * (друзі, заблоковані, заблокували вас, запросили вас у друзі, 
         * отримали від вас запрошення)
         * 
         * @param {number} userId - ID користувача
         */
        async usersList({ }, userId: number) {
            await axiosInstanse
                .get(USERS_LIST(userId))
                .then((res) => {
                    this.commit("setBlackList", res.data.blacklist);
                    this.commit("setOnBlackLists", res.data.onBlacklist);
                    this.commit("setSentInvitesList", res.data.invites);
                    this.commit("setInvitationsList", res.data.requires);
                    this.commit("setFriendsList", res.data.friends);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * Змінює статус відносин між активним користувачем та поданим у аргументі
         * на "запрошений у друзі"
         * 
         * @param {number} userId - ID користувача
         */
        async addToFriends({ }, userId: number) {
            await axiosInstanse
                .post(ADD_FRIEND(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
     * Видаляє статус відносин між активним користувачем та поданим у аргументі
     * "запрошений у друзі"
     * 
     * @param {number} userId - ID користувача
     */
        async cancelInvite({ }, userId: number) {
            await axiosInstanse
                .delete(CANCEL_INVITE(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
     * Змінює статус відносин між активним користувачем та поданим у аргументі
     * з "запрошений у друзі" на "друзі"
     * 
     * @param {number} userId - ID користувача
     */
        async acceptInvite({ }, userId: number) {
            await axiosInstanse
                .put(ACCEPT(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
 * Видаляє статус відносин між поданим у аргументі та активним користувачами 
 * "запрошений у друзі"
 * 
 * @param {number} userId - ID користувача
 */
        async refuseInvite({ }, userId: number) {
            await axiosInstanse
                .delete(REFUSE(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
 * Змінює статус відносин між активним користувачем та поданим у аргументі
 * на "заблокований"
 * 
 * @param {number} userId - ID користувача
 */
        async addToBlackList({ }, userId: number) {
            await axiosInstanse
                .post(ADD_TO_BL(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
* Видаляє статус відносин між поданим у аргументі та активним користувачами 
* "заблокований"
* 
* @param {number} userId - ID користувача
*/
        async deleteFromBlackList({ }, userId: number) {
            await axiosInstanse
                .delete(DELETE_FROM_BL(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
* Видаляє статус відносин між поданим у аргументі та активним користувачами 
* "друзі"
* 
* @param {number} userId - ID користувача
*/
        async deleteFriend({ }, userId: number) {
            await axiosInstanse
                .delete(DELETE_FRIEND(userId))
                .then(() => {
                    this.dispatch("usersList", this.state.authState.userId);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
});

export default UsersModule

