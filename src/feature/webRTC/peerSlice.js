import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    peerDesc: null,
    peerConnection:null
}

const peerSlice = createSlice({
    name:"peerDesc",
    initialState,
    reducers: {
        setPeerDesc: (state, action) => {
            state.peerDesc = action.payload
        },
        setPeerConnection:(state,action)=>{
            state.peerConnection = action.payload
        },
        setPeerRemoteAnswer:(state,action)=>{
            state.peerConnection.setRemoteDescription(action.payload)
        },
        setIceCandidates:(state,action)=>{
            state.peerConnection.addIceCandidate(action.payload)
        }
    }
})

export const {setPeerDesc, setPeerConnection, setPeerRemoteAnswer, setIceCandidates} = peerSlice.actions;
export default peerSlice.reducer;