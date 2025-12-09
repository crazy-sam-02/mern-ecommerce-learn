import { configureStore, ReducerType} from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice/index.js"


const store = configureStore({
    reducer:{
        auth:AuthReducer
    
    }
})

export default store;
