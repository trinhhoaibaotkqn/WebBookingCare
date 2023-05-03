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
        },
        appointment: {
            appointment: null,
            isFetching: false,
            error: false
        },
        confirmBooking: {
            isFetching: false,
            error: false
        },
        specialty: {
            listSpecialty: null,
            isFetching: false,
            error: false
        },
        detailSpecialty: {
            listDoctors: null,
            isFetching: false,
            error: false
        },
        facility: {
            listFacility: null,
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

        BOOK_APPOINTMENT_START: (state) => {
            state.appointment.isFetching = true;
        },
        BOOK_APPOINTMENT_SUSSCESS: (state, action) => {
            state.appointment.isFetching = false;
            state.appointment.appointment = action.payload;
            state.appointment.error = false;
        },
        BOOK_APPOINTMENT_FAILED: (state) => {
            state.appointment.error = true;
        },

        CONFIRM_APPOINTMENT_START: (state) => {
            state.confirmBooking.isFetching = true;
        },
        CONFIRM_APPOINTMENT_SUSSCESS: (state) => {
            state.confirmBooking.isFetching = false;
            state.confirmBooking.error = false;
        },
        CONFIRM_APPOINTMENT_FAILED: (state) => {
            state.confirmBooking.error = true;
        },

        GET_LIST_SPECIALTY_START: (state) => {
            state.specialty.isFetching = true;
        },
        GET_LIST_SPECIALTY_SUSSCESS: (state, action) => {
            state.specialty.isFetching = false;
            state.specialty.listSpecialty = action.payload;
            state.specialty.error = false;
        },
        GET_LIST_SPECIALTY_FAILED: (state) => {
            state.specialty.error = true;
        },

        GET_LIST_FACILITY_START: (state) => {
            state.facility.isFetching = true;
        },
        GET_LIST_FACILITY_SUSSCESS: (state, action) => {
            state.facility.isFetching = false;
            state.facility.listFacility = action.payload;
            state.facility.error = false;
        },
        GET_LIST_FACILITY_FAILED: (state) => {
            state.facility.error = true;
        },

        GET_LIST_DOCTOR_BY_SPECIALTY_START: (state) => {
            state.detailSpecialty.isFetching = true;
        },
        GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS: (state, action) => {
            state.facidetailSpecialtylity.isFetching = false;
            state.detailSpecialty.listDoctors = action.payload;
            state.detailSpecialty.error = false;
        },
        GET_LIST_DOCTOR_BY_SPECIALTY_FAILED: (state) => {
            state.detailSpecialty.error = true;
        },
    },
})

export const {
    GET_TOP_DOCTORS_START, GET_TOP_DOCTORS_SUSSCESS, GET_TOP_DOCTORS_FAILED,
    GET_SCHEDULE_DOCTOR_START, GET_SCHEDULE_DOCTOR_SUSSCESS, GET_SCHEDULE_DOCTOR_FAILED,
    BOOK_APPOINTMENT_START, BOOK_APPOINTMENT_SUSSCESS, BOOK_APPOINTMENT_FAILED,
    CONFIRM_APPOINTMENT_START, CONFIRM_APPOINTMENT_SUSSCESS, CONFIRM_APPOINTMENT_FAILED,
    GET_LIST_SPECIALTY_START, GET_LIST_SPECIALTY_SUSSCESS, GET_LIST_SPECIALTY_FAILED,
    GET_LIST_FACILITY_START, GET_LIST_FACILITY_SUSSCESS, GET_LIST_FACILITY_FAILED,
    GET_LIST_DOCTOR_BY_SPECIALTY_START, GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS, GET_LIST_DOCTOR_BY_SPECIALTY_FAILED,
} = userSlice.actions;

export default userSlice.reducer;