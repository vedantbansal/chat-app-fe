import { setPeerConnection } from "../feature/webRTC/peerSlice"
import socketService from "../socket/config"
import store from "../store/store"

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}
let localStream

let constraints = {
    video:{
        width:{ideal:1920, max:1920},
        height:{ideal:1080, max:1080},
    },
    audio:false
}

const toggleCamera = (videoStatus) =>{
    localStream.getTracks().find(track => track.kind === 'video').enabled = videoStatus
}

const showVideo = async (peerConnection) => {
    const remoteStream = new MediaStream()

    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    document.getElementById('user-1').srcObject = remoteStream
    document.getElementById('user-2').srcObject = localStream

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

}

const createPeerConnection = async (selectedUserId) => {
    const peerConnection = new RTCPeerConnection(servers)
    await showVideo(peerConnection)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    socketService.sendVCMessage(offer.sdp, 'offer', selectedUserId)
    store.dispatch(setPeerConnection(peerConnection))
    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            socketService.sendVCMessage(JSON.stringify(event.candidate), 'candidate', selectedUserId)
        }
    }
}

const createAnswer = async () => {
    const state = store.getState()
    const peerConnection = new RTCPeerConnection(servers)
    await showVideo(peerConnection)
    await peerConnection.setRemoteDescription(state.peerDesc.peerDesc.info)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    socketService.sendVCMessage(answer.sdp, 'answer', state.peerDesc.peerDesc.senderId)
    store.dispatch(setPeerConnection(peerConnection))
    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            socketService.sendVCMessage(JSON.stringify(event.candidate), 'candidate', state.peerDesc.peerDesc.senderId)
        }
    }
    // return peerConnection;
}

export {
    createPeerConnection,
    createAnswer,
    toggleCamera
}