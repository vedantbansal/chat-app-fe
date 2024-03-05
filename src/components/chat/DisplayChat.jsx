import React, { useEffect, useRef } from 'react';
import conf from '../../conf/conf';
import DisplayMessage from './DisplayMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../../feature/chat/chatSlice';

function DisplayChat() {
    const chatAreaRef = useRef(null);
    const sender = JSON.parse(localStorage.getItem('session'));
    const receiver = useSelector(state => state.selectedUser.user)
    const dispatch = useDispatch()
    const chats = useSelector(state => state.chat.chat)

    useEffect(() => {
        async function fetchAndDisplayUserChat() {
            const userChatResponse = await fetch(`${conf.baseURL}/messages/${receiver.id}/${sender.id}`);
            const userChat = await userChatResponse.json();
            dispatch(setChat(userChat))
        }
        if (sender && receiver) {
            fetchAndDisplayUserChat();
        }
    }, [receiver, dispatch, chats]);


    useEffect(() => {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }, [chats]);

    return (
        <div ref={chatAreaRef} className='w-full'>
            {chats?.map(chat => <DisplayMessage key={chat.content} userid={sender.id} senderId={chat.senderId} content={chat.content} />)}
        </div>
    )
}

export default DisplayChat