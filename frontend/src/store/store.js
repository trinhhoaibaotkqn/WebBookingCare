import { configureStore } from '@reduxjs/toolkit';
import commonReducer from "./slice/commonSlice";

export const store = configureStore({
    reducer: {
        common: commonReducer,
    },
})