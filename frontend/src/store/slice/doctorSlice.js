import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        time: {
            listTime: null,
            isFetching: false,
            error: false
        },
        schedule: {
            listSelectedTime: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {

        GET_LIST_TIME_START: (state) => {
            state.time.isFetching = true;
        },
        GET_LIST_TIME_SUSSCESS: (state, action) => {
            state.time.isFetching = false;
            state.time.listTime = action.payload;
            state.time.error = false;
        },
        GET_LIST_TIME_FAILED: (state) => {
            state.time.error = true;
        },

        SAVE_LIST_SELECTED_TIME_START: (state) => {
            state.schedule.isFetching = true;
        },
        SAVE_LIST_SELECTED_TIME_SUSSCESS: (state, action) => {
            state.schedule.isFetching = false;
            state.schedule.listSelectedTime = action.payload;
            state.schedule.error = false;
        },
        SAVE_LIST_SELECTED_TIME_FAILED: (state) => {
            state.schedule.error = true;
        },

    },
})

export const {
    GET_LIST_TIME_START, GET_LIST_TIME_SUSSCESS, GET_LIST_TIME_FAILED,
    SAVE_LIST_SELECTED_TIME_START, SAVE_LIST_SELECTED_TIME_SUSSCESS, SAVE_LIST_SELECTED_TIME_FAILED,

} = doctorSlice.actions;

export default doctorSlice.reducer;