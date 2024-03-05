import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: []
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers: {
        addChat: (state, action) => {
            state.chat.push(action.payload)
        },
        setChat: (state, action) => {
            state.chat = action.payload
        }
    }
})

export const {addChat, setChat} = chatSlice.actions;
export default chatSlice.reducer;