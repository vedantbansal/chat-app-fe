import React, { useState } from 'react'
import { AttachmentIcon, SendIcon } from '../../assets'
import { useSelector } from 'react-redux'
import socketService from '../../socket/config'

function ChatFooter() {
    const selectedUser = useSelector(state => state.selectedUser.user)
    const [messageInput, setMessageInput] = useState('')
    
    //Do not return any component if no user is selected
    if (!selectedUser) {
        return null
    }

    //Get the message entered by the user
    const handleMessageInput =(e) =>{
        setMessageInput(e.target.value)
    }

    //Send the message on send button press or pressing enter
    const handleMessageSend = (e) =>{
        e.preventDefault()
        socketService.sendMessage(messageInput, selectedUser.id)
        setMessageInput('')
    }
    return (
        <div className='flex h-16'>
            <div className='w-full h-16 flex justify-center place-items-center py-1 px-3 '>
                <div className='border-y-2 border-l border-slate-100 rounded-l-full px-2 py-1 h-5/6 flex place-items-center '>
                    <img className='cursor-pointer h-1/2 pl-1 w-fit' src={AttachmentIcon} alt='Attachment' />
                </div>
                <input className='border-y-2 border-slate-100 px-1 h-5/6 w-full focus:outline-none font-font-serif' 
                        type='text' 
                        onChange={handleMessageInput} 
                        value={messageInput} 
                        onKeyDown={(e) => {if(e.key==='Enter'){handleMessageSend(e)}}}></input>
                <div className='border-y-2 border-r border-slate-100 rounded-r-full py-2 pl-1 pr-3  h-5/6 flex place-items-center'>
                    <img className='cursor-pointer h-3/4 w-fit' src={SendIcon} alt='Send Message' onClick={handleMessageSend}/>
                </div>
            </div>
        </div>
    )
}

export default ChatFooter