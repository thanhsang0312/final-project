import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import { ENV } from "../const/environment";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: ENV === "development",
})

export default store;