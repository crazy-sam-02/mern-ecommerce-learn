import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isAuthenticated: null,
  user: null,
  isLoading: null,
};

export const LoginUser = createAsyncThunk(
  "/auth/login",
  async (userdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        userdata,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: error.message }
      );
    }
  }
);

export const LogoutUser  = createAsyncThunk('auth/logout',async({},{rejectWithValue})=>{
  try {
    const response = await axios.post('http://localhost:5000/api/auth/logout',{},{
      withCredentials:true
    })
    return response.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error?.response?.data)
  }
})


export const AuthMiddleware =  createAsyncThunk('auth/checkauth',async(_,{rejectWithValue})=>{
    try {
    const response = await axios.get('http://localhost:5000/api/auth/checkauth',{
            withCredentials:true,
            headers:{
                'Cache-Control':'must-revalidate, no-store,no-cache,proxy-revalidate'
            }
    })
    return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data || {message:error.message})
    }
})

export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async (userdata, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        userdata
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data || { message: error.message }
      );
    }
  }
);

const Authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload || null;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload?.success;
        state.user = action.payload?.user || null;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(RegisterUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = !!action.payload?.success;
        state.isLoading = false;
        state.user = action.payload?.user || null;
      })
      .addCase(AuthMiddleware.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AuthMiddleware.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload?.success;
        state.user = action.payload?.user || null;
      })
      .addCase(AuthMiddleware.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LogoutUser.pending , (state,action)=>{
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled , (state,action)=>{
        state.isLoading = false,
        state.isAuthenticated = false,
        state.user = null
      })
      .addCase(LogoutUser.rejected ,(state,action)=>{
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
  },
});

export const { setuser } = Authslice.actions;
export default Authslice.reducer;
