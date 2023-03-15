import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        topDoctors: {
            listDoctors: null,
            isFetching: false,
            error: false
        },
        scheduleDoctor: {
            schedule: null,
            isFetching: false,
            error: false
        }
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

        GET_SCHEDULE_DOCTOR_START: (state) => {
            state.scheduleDoctor.isFetching = true;
        },
        GET_SCHEDULE_DOCTOR_SUSSCESS: (state, action) => {
            state.scheduleDoctor.isFetching = false;
            state.scheduleDoctor.schedule = action.payload;
            state.scheduleDoctor.error = false;
        },
        GET_SCHEDULE_DOCTOR_FAILED: (state) => {
            state.scheduleDoctor.error = true;
        },
    },
})

export const {
    GET_TOP_DOCTORS_START, GET_TOP_DOCTORS_SUSSCESS, GET_TOP_DOCTORS_FAILED,
    GET_SCHEDULE_DOCTOR_START, GET_SCHEDULE_DOCTOR_SUSSCESS, GET_SCHEDULE_DOCTOR_FAILED
} = userSlice.actions;

export default userSlice.reducer;