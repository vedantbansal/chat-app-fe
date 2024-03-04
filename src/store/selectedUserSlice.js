import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const selectedUserSlice = createSlice({
    name:"selectedUser",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            console.log(state.user)
            state.user = action.payload
        }
    }
})

export const {setSelectedUser} = selectedUserSlice.actions;
export default selectedUserSlice.reducer;