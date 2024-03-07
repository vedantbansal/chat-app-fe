const createPeerConnection = async (selectedUserId, type) => {
    peerConnection = new RTCPeerConnection(servers)
        let offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        socketService.sendVCMessage(offer.sdp, 'offer', selectedUserId)

    return peerConnection;
}