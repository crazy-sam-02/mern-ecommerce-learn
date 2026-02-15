import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/cart/add",
        {
          userId,
          productId,
          quantity,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);

export const upadateCart = createAsyncThunk(
  "cart/update:id",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/cart/update/${productId}`,
        {
          userId,
          quantity,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);
export const deleteCart = createAsyncThunk(
  "cart/delete:id",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/cart/delete/${productId}`,
        {
          data: {
            userId,
            productId,
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);

export const fetchAllCartProduct = createAsyncThunk(
  "cart/fetch",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/cart/get/${userId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);

const cartSlice = createSlice({
  name: "userCartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems =
          action.payload.cart?.items || action.payload.cart || [];
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(upadateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upadateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems =
          action.payload.cart?.items || action.payload.cart || [];
      })
      .addCase(upadateCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems =
          action.payload.cart?.items || action.payload.cart || [];
      })
      .addCase(deleteCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems =
          action.payload.cart?.items || action.payload.cart || [];
      })
      .addCase(fetchAllCartProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default cartSlice.reducer;
