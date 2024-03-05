import React from 'react'
import { ChatHeader, ChatFooter, SearchUser, DisplayChat} from '../components'
function ChatPage() {
    return (
        <div className='flex flex-row h-screen bg-slate-100'>
            <div className='flex flex-col bg-slate-50 rounded-l-xl w-1/3 my-10 ml-16'>
                <div className='h-full'><SearchUser/></div>
               
            </div>
            <div className='flex flex-col rounded-r-xl bg-white w-2/3 my-10 mr-16'>
                <div className='border-b-2 border-slate-100 h-1/12' ><ChatHeader/></div>
                <div className='flex-1  h-10/12'><DisplayChat/></div>
                <div className='border-t-2 border-slate-100 mb-1 h-1/12' aria-disabled ><ChatFooter /></div>
            </div>
        </div>
    )
}

export default ChatPage