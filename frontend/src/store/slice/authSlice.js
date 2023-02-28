import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false
        }
    },
    reducers: {
        LOGIN_START: (state) => {
            state.login.isFetching = true;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
            state.login.error = false;
        },
        LOGIN_FAILED: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        REFRESH_TOKEN: (state, action) => {
            state.login.currentUser = action.payload;
        },
        REGISTER_START: (state) => {
            state.register.isFetching = true;
        },
        REGISTER_SUCCESS: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
        },
        REGISTER_FAILED: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },
        LOGOUT_START: (state) => {
            state.login.isFetching = true;
        },
        LOGOUT_SUCCESS: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        LOGOUT_FAILED: (state) => {
            state.login.isFetching = false;
        },
    },
})

export const {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, REFRESH_TOKEN,
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILED
} = authSlice.actions;

export default authSlice.reducer;