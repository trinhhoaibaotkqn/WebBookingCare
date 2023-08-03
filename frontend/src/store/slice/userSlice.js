import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        topDoctors: {
            listDoctors: null,
            isFetching: false,
            error: false
        },
        specialty: {
            listSpecialty: null,
            isFetching: false,
            error: false
        },
        facility: {
            listFacility: null,
            isFetching: false,
            error: false
        },
        detailSpecialty: {
            listDoctors: null,
            isFetching: false,
            error: false
        },
        detailFacility: {
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

        CLEAN_DATA_HOME: (state) => {
            state.topDoctors.listDoctors = null;
            state.facility.listFacility = null;
            state.specialty.listSpecialty = null;
        },

        GET_LIST_DOCTOR_BY_SPECIALTY_START: (state) => {
            state.detailSpecialty.isFetching = true;
        },
        GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS: (state, action) => {
            state.detailSpecialty.isFetching = false;
            state.detailSpecialty.listDoctors = action.payload;
            state.detailSpecialty.error = false;
        },
        GET_LIST_DOCTOR_BY_SPECIALTY_FAILED: (state) => {
            state.detailSpecialty.error = true;
        },

        CLEAN_LIST_DOCTOR_BY_SPECIALTY: (state) => {
            state.detailSpecialty.listDoctors = null;
        },

        GET_LIST_DOCTOR_BY_FACILITY_START: (state) => {
            state.detailFacility.isFetching = true;
        },
        GET_LIST_DOCTOR_BY_FACILITY_SUSSCESS: (state, action) => {
            state.detailFacility.isFetching = false;
            state.detailFacility.listDoctors = action.payload;
            state.detailFacility.error = false;
        },
        GET_LIST_DOCTOR_BY_FACILITY_FAILED: (state) => {
            state.detailFacility.error = true;
        },

        CLEAN_LIST_DOCTOR_BY_FACILITY: (state) => {
            state.detailFacility.listDoctors = null;
        },
    },
})

export const {
    GET_TOP_DOCTORS_START, GET_TOP_DOCTORS_SUSSCESS, GET_TOP_DOCTORS_FAILED,
    GET_LIST_SPECIALTY_START, GET_LIST_SPECIALTY_SUSSCESS, GET_LIST_SPECIALTY_FAILED,
    GET_LIST_FACILITY_START, GET_LIST_FACILITY_SUSSCESS, GET_LIST_FACILITY_FAILED,
    CLEAN_DATA_HOME, CLEAN_LIST_DOCTOR_BY_SPECIALTY, CLEAN_LIST_DOCTOR_BY_FACILITY,
    GET_LIST_DOCTOR_BY_SPECIALTY_START, GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS, GET_LIST_DOCTOR_BY_SPECIALTY_FAILED,
    GET_LIST_DOCTOR_BY_FACILITY_START, GET_LIST_DOCTOR_BY_FACILITY_SUSSCESS, GET_LIST_DOCTOR_BY_FACILITY_FAILED
} = userSlice.actions;

export default userSlice.reducer;