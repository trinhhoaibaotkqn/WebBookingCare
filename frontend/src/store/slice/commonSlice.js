import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        openMenu: false,
        language: "vi",
    },
    reducers: {
        OPEN_MENU: (state) => {
            state.openMenu = true;
        },
        CLOSE_MENU: (state) => {
            state.openMenu = false;
        },
        CHANGE_LANGUAGE: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { OPEN_MENU, CLOSE_MENU, CHANGE_LANGUAGE } = commonSlice.actions;

export default commonSlice.reducer;