import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        topDoctors: {
            listDoctors: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        GET_TOP_DOCTORS_START: (state) => {
            state.topDoctors.isFetching = true;
        },
        GET_TOP_DOCTORS_SUSSCESS: (state, action) => {
            state.topDoctors.isFetching = false;
            state.topDoctors.listDoctors = action.payload;
            state.topDoctors.error = false;
        },
        GET_TOP_DOCTORS_FAILED: (state) => {
            state.topDoctors.error = true;
        },

    },
})

export const {
    GET_TOP_DOCTORS_START, GET_TOP_DOCTORS_SUSSCESS, GET_TOP_DOCTORS_FAILED,
} = userSlice.actions;

export default userSlice.reducer;