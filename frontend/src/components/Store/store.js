import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-slice/index.js";
import AdminProductSlice from "./products/products.js";
import UserProductSLice from "./User/ProductSlice/products.js";
import cartReducer from "./User/CartSlice/cart.js";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    AdminProduct: AdminProductSlice,
    userproducts: UserProductSLice,
    userCartSlice: cartReducer,
  },
});

export default store;
