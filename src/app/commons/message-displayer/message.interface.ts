import { MessageType } from "./message-type.enum";

export interface Message {
    message: string;
    messageType: MessageType;
}