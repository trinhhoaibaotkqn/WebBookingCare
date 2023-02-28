import { configureStore } from '@reduxjs/toolkit';
import commonReducer from "./slice/commonSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        auth: authReducer
    },
})