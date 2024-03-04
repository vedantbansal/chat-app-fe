import React from 'react'
import {VCIcon, ProfileImage} from '../../assets/'

function ChatHeader({user}) {
    // if(!user){
    //   return null;
    // }
    return (
      <div className='flex h-16'>
        <div className='flex flex-none w-16 h-16 px-2 place-items-center justify-center'>
          <img className='border rounded-full h-2/3 w-fit' src={ProfileImage} alt='Profile'></img>
        </div>
        <div className='flex-auto flex place-items-center p-2'>
          {/* <h3 className='text-xl font-font-serif'>{user.firstName} {user.lastName}</h3> */}
        </div>
        <div className='flex-none cursor-pointer flex w-16 h-16 p-3 place-items-center justify-center'>
          <img className='h-fit w-fit' src={VCIcon} alt="Video Call Icon"/>
        </div>
      </div>
    )
  }
  
  export default ChatHeader