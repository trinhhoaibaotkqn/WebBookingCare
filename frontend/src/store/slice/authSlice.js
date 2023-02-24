import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        }

    },
    reducers: {
        LOGIN_START: (state) => {
            state.openMenu = true;
        },
        LOGIN_SUCCESS: (state) => {
            state.openMenu = false;
        },
        LOGIN_FAILED: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { OPEN_MENU, CLOSE_MENU, CHANGE_LANGUAGE } = authSlice.actions;

export default authSlice.reducer;