import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import { ENV } from "../const/environment";
import cartReducer from "./reducer/cartReducer";
import wishListReducer from "./reducer/wishListReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishList: wishListReducer,
    },
    devTools: ENV === "development",
})

export default store;