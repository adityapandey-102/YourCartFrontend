import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/feature/CartSlice";
import wishListSlice from "./slices/feature/wishListSlice";
import ProductSlice from "./slices/feature/ProductSlice";
import FilterSlice from "./slices/feature/FilterSlice";

const store= configureStore({
    reducer:{
        cart:CartSlice,
        wishlist:wishListSlice,
        product:ProductSlice,
        filter:FilterSlice,
    }
})

export default store;