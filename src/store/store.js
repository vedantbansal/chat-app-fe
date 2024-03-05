import {configureStore} from '@reduxjs/toolkit';
import selectedUserSlice from '../feature/chat/selectedUserSlice';
import chatSlice from '../feature/chat/chatSlice';

const store = configureStore({
    reducer:{
        selectedUser: selectedUserSlice,
        chat: chatSlice
    }
});

export default store;