import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import { ENV } from "../const/environment";
import cartReducer from "./reducer/cartReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    devTools: ENV === "development",
})

export default store;