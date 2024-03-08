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

    //Fetch the previous chats whenever a new user is selected
    useEffect(() => {
        async function fetchAndDisplayUserChat() {
            const userChatResponse = await fetch(`${conf.baseURL}/messages/${receiver.id}/${sender.id}`);
            const userChat = await userChatResponse.json();
            dispatch(setChat(userChat))
        }
        if (sender && receiver) {
            fetchAndDisplayUserChat();
        }
    }, [receiver, dispatch]);

    //Scroll to bottom of chat
    useEffect(() => {
        chatAreaRef.current.scrollIntoView({ behavior: "auto" })
    }, [chats]);

    return (
        <div className='w-full h-full' >
            {/* Display Each each chat message */}
            {chats?.map(chat => <DisplayMessage key={chat.id} userid={sender.id} senderId={chat.senderId} content={chat.content} />)}
            <div ref={chatAreaRef} />
        </div>
    )
}

export default DisplayChat