import conf from "../conf/conf";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import store from "../store/store";
import { addChat } from "../feature/chat/chatSlice";
import { setPeerDesc } from "../feature/webRTC/peerSlice";

export class SocketService {

    constructor() {
        this.user = JSON.parse(localStorage.getItem('session'))
        const socket = new SockJS(`${conf.baseURL}/ws`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        const messageSubscribeUrl = `/user/${this.user.id}/queue/messages`
        const vcSubscribeUrl = `/user/${this.user.id}/queue/vc`
        this.stompClient.subscribe(String(messageSubscribeUrl), this.onChatMessageReceived);
        this.stompClient.subscribe(String(vcSubscribeUrl), this.onVCMessageReceived);
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

    sendVCMessage(messageContent, type, recipientId) {
        if (messageContent && this.stompClient) {
            const vcMessage = {
                senderId: this.user.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                recipientId: recipientId,
                type: type,
                info: messageContent,
            };
            // console.log("VCMESSAGE", JSON.stringify(vcMessage))
            this.stompClient.send(`/app/vc`, {}, JSON.stringify(vcMessage));
        }
    }

    onChatMessageReceived = (payload) => {
        const state = store.getState();
        const chatMessage = JSON.parse(payload.body)
        if (chatMessage.senderId === state.selectedUser.user.id) {
            store.dispatch(addChat(JSON.parse(payload.body)))
        } else {
            document.getElementById(chatMessage.senderId).children[0].children[2].style.visibility = "visible";
        }
    }

    onVCMessageReceived = (payload) => {
        const vcMessage = JSON.parse(payload.body)
        const remoteDesc = new RTCSessionDescription()

        if (vcMessage.type === 'offer') {
            if (window.confirm("Answer Call")) {
                remoteDesc.sdp = vcMessage.info
                remoteDesc.type = 'offer'
                vcMessage.info = remoteDesc
                store.dispatch(setPeerDesc(vcMessage))

            }
        } else if (vcMessage.type === 'answer') {
            remoteDesc.sdp = vcMessage.info
            remoteDesc.type = 'answer'
            vcMessage.info = remoteDesc
            store.dispatch(setPeerDesc(vcMessage))
        }else if(vcMessage.type === 'candidate'){
            // console.log(JSON.parse(vcMessage.info))
            store.dispatch(setPeerDesc(vcMessage))
        }

    }

    onError() {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');

    }
}

const socketService = new SocketService();
export default socketService;