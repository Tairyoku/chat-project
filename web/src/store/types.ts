import { AuthState } from "./modules/auth";
import { ChatState } from "./modules/chats";
import { MessagesState } from "./modules/messages";
import { UsersState } from "./modules/users";


interface RootState {
    chatState: ChatState,
    usersState: UsersState,
    authState: AuthState,
    messagesState: MessagesState,
    // Web socket
    socket: WebSocket,
    //Спеціальне значення для оновлення локальних даних
    updater: number,
  }

  export default RootState