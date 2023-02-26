
// get images
export const IMAGE = (image:string) => "http://" + process.env.VUE_APP_BASE_URL + "/api/image/" + image
export const IMAGE_SMALL = (image:string) => "http://" + process.env.VUE_APP_BASE_URL + "/api/image/resize-" + image

//auth
export const SIGN_UP = "auth/sign-up"; // Реєстрація
export const SIGN_IN = "auth/sign-in"; // Авторизація
export const GET_ME = "auth/get-me"; // Отримати ID активного користувача

//change users data
export const CHANGE_PASSWORD = "auth/change/password"; // Змінити пароль
export const CHANGE_USERNAME = "auth/change/username"; // Змінити нікнейм
export const CHANGE_ICON = "auth/change/icon"; // Змінити аватар

//users
export const USER_PUBLIC = (id: number) => `users/${id}/public`; // Отримати усі ПУБЛІЧНІ чати, до яких приєднан користувач
export const USER_PRIVATE = (id: number) => `users/${id}/private`; // Отримати усі ОСОБИСТІ чати, до яких приєднан користувач
export const USER_DATA = (id: number) => `users/${id}`; // Отримати дані користувача за його ID
export const SEARCH_USERS = (username: string) => `users/search/${username}`; // Пошук користувачів за ніком

//get status users
export const USERS_LIST = (id: number) => `users/${id}/all`; // Отримати список усіх

//change status
export const ADD_FRIEND = (id: number) => `users/${id}/invite`; // Запит на дружбу
export const CANCEL_INVITE = (id: number) => `users/${id}/cancel`; // Відмінити запит на дружбу
export const ACCEPT = (id: number) => `users/${id}/accept`; // Прийняти запис на дружбу
export const REFUSE = (id: number) => `users/${id}/refuse`; // Відмовити запит на дружбу
export const ADD_TO_BL = (id: number) => `users/${id}/addToBL`; // Заблокувати користувача
export const DELETE_FROM_BL = (id: number) => `users/${id}/deleteFromBlacklist`; // Розблокувати користувача
export const DELETE_FRIEND = (id: number) => `users/${id}/deleteFriend`; // Видалити із друзів

//chats
export const CREATE_PUBLIC_CHAT = 'chats/create'; // Створити ПУБЛІЧНИЙ чат
export const CREATE_PRIVATE_CHAT = (userId: number) => `chats/${userId}/private`; // Створити ОСОБИСТИЙ чат, якщо його немає, та отримати повідомлення з нього
export const GET_CHAT = (id: number) => `chats/${id}`; // Отримати дані чату
export const GET_BY_ID = (id: number) => `chats/${id}/link`; // Отримати дані користувача та чату за ID (тільки для приватних чатів)
export const GET_USERS = (id: number) => `chats/${id}/users`; // Отримати список користувачів чату
export const ADD_TO_CHAT = (chatId: number) => `chats/${chatId}/add`; // Додати користувача до чату
export const DELETE_FROM_CHAT = (chatId: number) => `chats/${chatId}/delete`; // Видалити користувача із чату
export const CHANGE_CHAT_ICON = (chatId: number) => `chats/${chatId}/icon`; // Оновити зображення чату
export const DELETE_CHAT = (id: number) => `chats/${id}`; // Видалити чат
export const SEARCH_CHAT = (name: string) => `chats/search/${name}`; // Пошук чатів за назвою

//messages
export const GET_MESSAGES = (chatId: number) => `chats/${chatId}/messages`; // Отримати повідомлення
export const GET_LIMIT_MESSAGES = (chatId: number, limit:number) => `chats/${chatId}/messages/limit/${limit}`; // Отримати певну кількість останніх повідомленнь
export const CREATE_MESSAGE = (chatId: number) => `chats/${chatId}/messages`; // Створити повідомлення

//websocket
export const WEB_SOCKET = "ws://" + process.env.VUE_APP_BASE_URL + "/ws/"