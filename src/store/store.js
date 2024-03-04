import {configureStore} from '@reduxjs/toolkit';
import selectedUserSlice from './selectedUserSlice';

const store = configureStore({
    reducer:{
        selectedUser: selectedUserSlice
    }
});

export default store;