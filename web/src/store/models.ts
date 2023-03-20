export interface IUser {
    id: number,
    username: string,
    icon: string,
    password: string,
   }

   export interface IMessage {
    id: number,
    author: number,
    chat_id: number,                     
    text: string,
    sent_at: string,                       
   }

   export interface IChat {
    id: number,
    name: string,
    types: string,
    icon: string,
   }
