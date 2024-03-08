import React, { useEffect, useMemo, useState } from 'react'
import { createAnswer, createPeerConnection, toggleCamera, onDisconnect } from '../../webRTC/config';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setIceCandidates, setPeerConnection, setPeerRemoteAnswer } from '../../feature/webRTC/peerSlice';
import socketService from '../../socket/config';
import { CameraIcon, DeclineCallIcon, MicIcon } from '../../assets';

function VideoCall() {
    const participant = useLocation().state
    const selectedUser = useSelector(state => state.selectedUser.user)
    const remoteDesc = useSelector(state => state.peerDesc.peerDesc)
    const peerConnection = useSelector(state => state.peerDesc.peerConnection)
    const [mic, setMic] = useState(true)
    const [video, setVideo] = useState(true)
    const dispatch = useDispatch()

    //Save the details of peerconnection
    useEffect(() => {
        const setRemoteDescription = async () => {
            // Save the answer sent by peer
            if (remoteDesc && remoteDesc.type === 'answer') {
                try {
                    dispatch(setPeerRemoteAnswer(remoteDesc.info))
                } catch (error) {
                    console.error('Error setting remote description:', error);
                }
            }
            // Save the ice candidates sent by peer
            if (remoteDesc && remoteDesc.type === 'candidate') {
                try {
                    dispatch(setIceCandidates(JSON.parse(remoteDesc.info)))
                } catch (error) {
                    console.error('Error setting ice candidates description:', error);
                }
            }
        };
        setRemoteDescription();
    }, [remoteDesc]);

    //Create an offer on starting a call or create answer on receiving a call and answering it
    useMemo(() => {
        if (!peerConnection && participant === 'caller') {
            createPeerConnection(selectedUser.id)
        } else if (participant === 'receiver') {
            createAnswer()
        }

    }, [participant])

    const toggleMic = () => {
        setMic(!mic)
    }
    const toggleVideo = () => {
        toggleCamera(!video)
        setVideo(!video)
    }

    const endCall = () => {
        socketService.sendVCMessage("Close connection", 'close', remoteDesc.senderId)
        onDisconnect()
    }

    return (
        <div className='h-full w-full flex justify-center relative z-0 '>
            <video id="user-1" autoPlay playsInline className="h-full w-full absolute z-10 rounded-xl"></video>
            <div className='relative z-10 h-full w-full flex place-items-end justify-end '>
                <video id="user-2" autoPlay playsInline className="h-1/5 w-1/6 rounded-xl"></video>
            </div>
            <div className='h-1/5 w-full absolute z-40 flex place-self-end place-items-center justify-center'>
                <div className={`rounded-full h-16 w-16 cursor-pointer m-2 ${mic ? 'bg-slate-300' : 'bg-red-500'} flex place-items-center justify-center`} onClick={toggleMic}>
                    <img className='h-8 w-8' src={MicIcon} />
                </div>
                <div className={`rounded-full h-16 w-16 cursor-pointer m-2 ${video ? 'bg-slate-300' : 'bg-red-500'} flex place-items-center justify-center`} onClick={toggleVideo}>
                    <img className='h-5 w-8 ml-1' src={CameraIcon} />
                </div>
                <div className='rounded-full h-16 w-16 cursor-pointer m-2 bg-red-500 flex place-items-center justify-center' onClick={endCall}>
                <img className='h-9 w-9' src={DeclineCallIcon} />
                </div>
            </div>
        </div>
    );
}

export default VideoCall