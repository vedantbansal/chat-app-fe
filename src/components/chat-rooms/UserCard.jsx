import React from 'react'
import { ProfileImage } from '../../assets'

function UserCard({ user }) {
    return (
        <div className='flex h-16 place-items-center'>
            <div className='flex flex-none w-16 h-16 px-2 place-items-center justify-center'>
                <img className='rounded-full h-2/3 w-fit' src={ProfileImage} alt='Profile'></img>
            </div>
            <div className='flex-auto flex place-items-center p-2'>
                <h3 className='text-xl font-font-serif'>{user.firstName} {user.lastName}</h3>
            </div>
            <div className='h-5 w-5 mr-5 bg-slate-200 rounded-full invisible'/>
        </div>
    )
}

export default UserCard