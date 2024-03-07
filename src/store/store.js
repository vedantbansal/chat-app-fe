import {configureStore} from '@reduxjs/toolkit';
import selectedUserSlice from '../feature/chat/selectedUserSlice';
import chatSlice from '../feature/chat/chatSlice';
import peerSlice from '../feature/webRTC/peerSlice';

const store = configureStore({
    reducer:{
        selectedUser: selectedUserSlice,
        chat: chatSlice,
        peerDesc: peerSlice
    }
});

export default store;