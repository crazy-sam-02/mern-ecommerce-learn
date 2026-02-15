import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetail: null,
};

export const userProductsThunk = createAsyncThunk(
  "user/shop",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/products/get",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data?.product ?? [];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  }
);
export const getProductsDetailsThunk = createAsyncThunk("/user/products/get/:id", async (id,{rejectWithValue})=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/user/products/get/${id}`,{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    })
    return response.data

  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.message)
  }
})

export const userFilterProductsThunk = createAsyncThunk(
  "user/products/filtered",
  async ({ category = [], brand = [] }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (category.length) {
        params.append("category", category.join(","));
      }
      if (brand.length) {
        params.append("brand", brand.join(","));
      }
      const response = await axios.get(
        `http://localhost:5000/api/user/products/filter?${params.toString()}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  }
);

const UserProductSLice = createSlice({
  name: "userproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(userProductsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userFilterProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userFilterProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products ?? [];
      })
      .addCase(userFilterProductsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductsDetailsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload?.productDetail ?? null;
      })
      .addCase(getProductsDetailsThunk.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export default UserProductSLice.reducer;
