import {createSlice} from "@reduxjs/toolkit";

const InitialState ={
    isAuthenticated:false,
    User:  null,
    isLoading: false,
}


const AuthSlice = createSlice({
    name: "user",
    initialState:InitialState,
    reducer:{
        SetUSer(state,action){
            return null
        }
    }
})
export const {SetUSer} = AuthSlice.actions;
export default AuthSlice.reducer;