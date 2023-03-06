import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: {
            listAdmin: null,
            isFetching: false,
            error: false,
            isOpen: true
        },
        doctor: {
            listDoctor: null,
            isFetching: false,
            error: false,
            isOpen: false
        },
        patient: {
            listPatient: null,
            isFetching: false,
            error: false,
            isOpen: false
        },
        createUser: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        editUser: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        deleteUser: {
            isFetching: false,
            error: false
        },
        role: {
            listRole: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        GET_ADMIN_START: (state) => {
            state.admin.isFetching = true;
        },
        GET_ADMIN_SUCCESS: (state, action) => {
            state.admin.listAdmin = action.payload;
            state.admin.isFetching = false;
            state.admin.error = false;
        },
        GET_ADMIN_FAILED: (state) => {
            state.admin.isFetching = false;
            state.admin.error = true;
        },

        GET_PATIENT_START: (state) => {
            state.patient.isFetching = true;
        },
        GET_PATIENT_SUCCESS: (state, action) => {
            state.patient.listPatient = action.payload;
            state.patient.isFetching = false;
            state.patient.error = false;
        },
        GET_PATIENT_FAILED: (state) => {
            state.patient.isFetching = false;
            state.patient.error = true;
        },

        GET_DOCTOR_START: (state) => {
            state.doctor.isFetching = true;
        },
        GET_DOCTOR_SUCCESS: (state, action) => {
            state.doctor.listDoctor = action.payload;
            state.doctor.isFetching = false;
            state.doctor.error = false;
        },
        GET_DOCTOR_FAILED: (state) => {
            state.doctor.isFetching = false;
            state.doctor.error = true;
        },

        CREATE_USER_START: (state) => {
            state.createUser.isFetching = true;
        },
        CREATE_USER_SUCCESS: (state, action) => {
            state.createUser.currentUser = action.payload;
            state.createUser.isFetching = false;
            state.createUser.error = false;
        },
        CREATE_USER_FAILED: (state) => {
            state.createUser.isFetching = false;
            state.createUser.error = true;
        },

        EDIT_USER_START: (state) => {
            state.editUser.isFetching = true;
        },
        EDIT_USER_SUCCESS: (state, action) => {
            state.editUser.currentUser = action.payload;
            state.editUser.isFetching = false;
            state.editUser.error = false;
        },
        EDIT_USER_FAILED: (state) => {
            state.editUser.isFetching = false;
            state.editUser.error = true;
        },

        DELETE_USER_START: (state) => {
            state.deleteUser.isFetching = true;
        },
        DELETE_USER_SUCCESS: (state) => {
            state.deleteUser.isFetching = false;
            state.deleteUser.error = false;
        },
        DELETE_USER_FAILED: (state) => {
            state.deleteUser.isFetching = false;
            state.deleteUser.error = true;
        },

        OPEN_AMIN: (state) => {
            state.admin.isOpen = true;
            state.doctor.isOpen = false;
            state.patient.isOpen = false;
        },
        OPEN_DOCTOR: (state) => {
            state.admin.isOpen = false;
            state.doctor.isOpen = true;
            state.patient.isOpen = false;
        },
        OPEN_PATIENT: (state) => {
            state.admin.isOpen = false;
            state.doctor.isOpen = false;
            state.patient.isOpen = true;
        },

        GET_ROLE_START: (state) => {
            state.role.isFetching = true;
        },
        GET_ROLE_SUCCESS: (state, action) => {
            state.role.listRole = action.payload;
            state.role.isFetching = false;
            state.role.error = false;
        },
        GET_ROLE_FAILED: (state) => {
            state.role.isFetching = false;
            state.role.error = true;
        },
    },
})

export const {
    GET_ADMIN_START, GET_ADMIN_SUCCESS, GET_ADMIN_FAILED,
    GET_PATIENT_START, GET_PATIENT_SUCCESS, GET_PATIENT_FAILED,
    GET_DOCTOR_START, GET_DOCTOR_SUCCESS, GET_DOCTOR_FAILED,
    CREATE_USER_START, CREATE_USER_SUCCESS, CREATE_USER_FAILED,
    EDIT_USER_START, EDIT_USER_SUCCESS, EDIT_USER_FAILED,
    DELETE_USER_START, DELETE_USER_SUCCESS, DELETE_USER_FAILED,
    OPEN_AMIN, OPEN_DOCTOR, OPEN_PATIENT,
    GET_ROLE_START, GET_ROLE_SUCCESS, GET_ROLE_FAILED,
} = adminSlice.actions;

export default adminSlice.reducer;