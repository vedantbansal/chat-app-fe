import conf from "../conf/conf";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import store from "../store/store";
import { addChat } from "../feature/chat/chatSlice";

export class SocketService {

    constructor() {
        this.user = JSON.parse(localStorage.getItem('session'))
        const socket = new SockJS(`${conf.baseURL}/ws`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        const subscribeUrl = `/user/${this.user.id}/queue/messages`
        const url = String(conf.baseURL)
        this.stompClient.subscribe(String(subscribeUrl), this.onMessageReceived);
    }

    sendMessage(messageContent, recipientId) {

        if (messageContent && this.stompClient) {
            const chatMessage = {
                senderId: this.user.id,
                recipientId: recipientId,
                content: messageContent,
                timestamp: new Date()
            };
            this.stompClient.send(`/app/chat`, {}, JSON.stringify(chatMessage));
            const state = store.getState();
            if (chatMessage.recipientId === state.selectedUser.user.id) {
                store.dispatch(addChat(chatMessage))
            }
        }
    }

    onMessageReceived = (payload) => {
        const state = store.getState();
        const chatMessage = JSON.parse(payload.body)
        if (chatMessage.senderId === state.selectedUser.user.id) {
            store.dispatch(addChat(JSON.parse(payload.body)))
        } else {
            document.getElementById(chatMessage.senderId).children[0].children[2].style.visibility = "visible";
        }
    }

    onError() {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');

    }
}

const socketService = new SocketService();
export default socketService;