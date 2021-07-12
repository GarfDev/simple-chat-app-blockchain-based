import { atom } from "recoil";
import { Message } from './types';

const initialState: Message[] = [];

const MessageState = atom({
    key: "messages",
    default: initialState,
})

export default MessageState;