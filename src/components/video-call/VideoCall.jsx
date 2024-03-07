import React, { useEffect, useMemo } from 'react'
import { createAnswer, createPeerConnection } from '../../webRTC/config';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setIceCandidates, setPeerConnection, setPeerRemoteAnswer } from '../../feature/webRTC/peerSlice';

function VideoCall() {
    const participant = useLocation().state
    const selectedUser = useSelector(state => state.selectedUser.user)
    const remoteDesc = useSelector(state => state.peerDesc.peerDesc)
    const peerConnection = useSelector(state => state.peerDesc.peerConnection)
    const dispatch = useDispatch()

    useEffect(() => {
        const setRemoteDescription = async () => {
            if (remoteDesc && remoteDesc.type === 'answer') {
                try {
                    dispatch(setPeerRemoteAnswer(remoteDesc.info))

                } catch (error) {
                    console.error('Error setting remote description:', error);
                }
            }
            if (remoteDesc && remoteDesc.type === 'candidate') {
                try {
                    dispatch(setIceCandidates(JSON.parse(remoteDesc.info)))

                    console.log(peerConnection)
                } catch (error) {
                    console.error('Error setting ice candidates description:', error);
                }

            }
        };

        setRemoteDescription();
    }, [remoteDesc]);

    useMemo(() => {

        if (!peerConnection && participant === 'caller') {
            createPeerConnection(selectedUser.id)
        } else if (participant === 'receiver') {
            createAnswer()
        }

    }, [participant])

    
    return (

        <div className='border border-black h-full w-full flex justify-center relative z-0 '>
            <video id="user-1" autoPlay playsInline className="h-full w-full absolute z-10"></video>
            <div className='border border-green-600 relative z-10 h-full w-full flex place-items-end justify-end'>
                <video id="user-2" autoPlay playsInline className="h-1/5 w-1/6 border border-black"></video>
            </div>

        </div>
    );
}

export default VideoCall