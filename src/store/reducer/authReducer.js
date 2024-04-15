import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/authServices";
import { handleGetCart } from "./cartReducer";

const initialState = {
    showedModal: "",
    profile: null,
    loading: {
        login: false,
        register: false,
        getProfile: false,
    }
};

export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        handleShowModal: (state, action) => {
            state.showedModal = action.payload
        },
        handleCloseModal: (state) => {
            state.showedModal = ""
        },
        handleLogout: (state) => {
            tokenMethod.remove();
            state.profile = null;
            state.showedModal = "";
            message.success("Sign out successful!");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(handleRegister.fulfilled, (state) => {
            state.loading.register = false;
        })
        .addCase(handleRegister.pending, (state) => {
            state.loading.register = true;
        })
        .addCase(handleRegister.rejected, (state) => {
            state.loading.register = false;
        })
        .addCase(handleLogin.fulfilled, (state) => {
            state.loading.login = false;
            state.showedModal = ""
        })
        .addCase(handleLogin.pending, (state) => {
            state.loading.login = true;
        })
        .addCase(handleLogin.rejected, (state) => {
            state.loading.login = false;
        })
        .addCase(handleGetProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading.getProfile = false;
        })
        .addCase(handleGetProfile.pending, (state) => {
            state.loading.getProfile = true;
        })
        .addCase(handleGetProfile.rejected, (state) => {
            state.loading.getProfile = false;
        })
    },
})

const { actions, reducer: authReducer } = authSlice;

export const { handleShowModal, handleCloseModal, handleLogout } = actions;

export default authReducer;

export const handleRegister = createAsyncThunk(
    "auth/handleRegister",
    async (payload, thunkApi) => {
        try {
            const register = await authService.register(payload);
            if(register?.data?.data?.id) {
                message.success("Sign-up successfully!");
                thunkApi.dispatch(
                    handleLogin({
                        email: payload.email,
                        password: payload.password,
                    })
                )
                return true;
            }
            else {
                throw false;
            }
        } catch (error) {
            const errorInfo = error?.response?.data;
            if(errorInfo.error === "Forbidden"){
                message.error("Email existed!");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
)

export const handleLogin = createAsyncThunk(
    "auth/handleLogin",
    async (payload, thunkApi) => {
        try {
            const loginRes = await authService.login(payload);
            const { token: accessToken, refreshToken } = loginRes?.data?.data || [];
            tokenMethod.set({
                accessToken,
                refreshToken,
            });
            thunkApi.dispatch(handleGetProfile());
            thunkApi.dispatch(handleGetCart());
            message.success("Sign-in successfully!");
            return true;

        } catch (error) {
            const errorInfo = error?.response?.data;
            if(errorInfo.error === "Not found") {
                message.error("Username or password are not correct!");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
)

export const handleGetProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkApi) => {
        if(tokenMethod.get()){
            try {
                const profileRes = await authService.getProfile();
                return profileRes?.data?.data;
            } catch (error) {
                return thunkApi.rejectWithValue(error?.response?.data);
            }
        }
    }
)