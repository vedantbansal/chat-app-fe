import React, { useState, useEffect } from 'react'
import { SearchIcon } from '../../assets'
import conf from '../../conf/conf';
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../feature/chat/selectedUserSlice';

function SearchUser() {

    const [friends, setFriends] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('session'));
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchData() {
            const connectedUsersResponse = await fetch(`${conf.baseURL}/get-friends`);
            const data = await connectedUsersResponse.json();
            const users = data.filter((user) => user.id !== loggedUser.id)
            setFriends(users)
        }
        fetchData();
    }, []);

    const handleUserClick = async (event) => {
        const userId = event.currentTarget.getAttribute('id');
        const user = await fetch(`${conf.baseURL}/get-user-details/${userId}`, {
            method: 'GET',
            mode: 'cors'
        });
        const data = await user.json();
        dispatch(setSelectedUser(data));
    }


    return (
        <div className='flex h-full flex-col'>

            <div className='w-full h-16 flex justify-center place-items-center py-1 px-3 '>
                <input className='border-y-2 border-l-2 border-slate-100 rounded-l-full pl-3 pr-2 h-5/6 w-full focus:outline-none font-font-serif' type='text' />
                <div className='border-y-2 border-r-2 border-slate-100 rounded-r-full pr-1 h-5/6 flex place-items-center'>
                    <img className='cursor-pointer h-5/6 w-fit' src={SearchIcon} alt="Search User" />
                </div>
            </div>
            <div className='overflow-y-auto h-11/12'>
                {friends.map((user) =>
                    <div key={user.id} id={user.id} className='cursor-pointer h-1/12 hover:bg-slate-200 mx-1 rounded-md' onClick={handleUserClick}>
                        <UserCard user={user} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchUser