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
        infoDoctor: {
            info: null,
            isFetching: false,
            error: false
        },
        role: {
            listRole: null,
            isFetching: false,
            error: false
        },
        specialty: {
            listSpecialty: null,
            isFetching: false,
            error: false
        },
        createSpecialty: {
            currentSpecialty: null,
            isFetching: false,
            error: false
        },
        editSpecialty: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        deleteSpecialty: {
            isFetching: false,
            error: false
        },
        facility: {
            listClinic: null,
            isFetching: false,
            error: false
        },
        createClinic: {
            currentClinic: null,
            isFetching: false,
            error: false
        },
        editClinic: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        deleteClinic: {
            isFetching: false,
            error: false
        },
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

        CLEAR_ALL_LIST: (state) => {
            state.admin.listAdmin = null;
            state.doctor.listDoctor = null;
            state.patient.listPatient = null;
        },

        SAVE_INFO_DOCTOR_START: (state) => {
            state.infoDoctor.isFetching = true;
        },
        SAVE_INFO_DOCTOR_SUCCESS: (state, action) => {
            state.infoDoctor.isFetching = false;
            state.infoDoctor.info = action.payload;
            state.infoDoctor.error = false;
        },
        SAVE_INFO_DOCTOR_FAILED: (state) => {
            state.infoDoctor.isFetching = false;
            state.infoDoctor.error = true;
        },

        GET_INFO_DOCTOR_START: (state) => {
            state.infoDoctor.isFetching = true;
        },
        GET_INFO_DOCTOR_SUCCESS: (state, action) => {
            state.infoDoctor.isFetching = false;
            state.infoDoctor.info = action.payload;
            state.infoDoctor.error = false;
        },
        GET_INFO_DOCTOR_FAILED: (state) => {
            state.infoDoctor.isFetching = false;
            state.infoDoctor.error = true;
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

        GET_SPECIALTY_START: (state) => {
            state.specialty.isFetching = true;
        },
        GET_SPECIALTY_SUCCESS: (state, action) => {
            state.specialty.listSpecialty = action.payload;
            state.specialty.isFetching = false;
            state.specialty.error = false;
        },
        GET_SPECIALTY_FAILED: (state) => {
            state.specialty.isFetching = false;
            state.specialty.error = true;
        },

        CREATE_SPECIALTY_START: (state) => {
            state.createSpecialty.isFetching = true;
        },
        CREATE_SPECIALTY_SUCCESS: (state, action) => {
            state.createSpecialty.currentSpecialty = action.payload;
            state.createSpecialty.isFetching = false;
            state.createSpecialty.error = false;
        },
        CREATE_SPECIALTY_FAILED: (state) => {
            state.createSpecialty.isFetching = false;
            state.createSpecialty.error = true;
        },

        EDIT_SPECIALTY_START: (state) => {
            state.editSpecialty.isFetching = true;
        },
        EDIT_SPECIALTY_SUCCESS: (state, action) => {
            state.editSpecialty.currentUser = action.payload;
            state.editSpecialty.isFetching = false;
            state.editSpecialty.error = false;
        },
        EDIT_SPECIALTY_FAILED: (state) => {
            state.editSpecialty.isFetching = false;
            state.editSpecialty.error = true;
        },

        DELETE_SPECIALTY_START: (state) => {
            state.deleteSpecialty.isFetching = true;
        },
        DELETE_SPECIALTY_SUCCESS: (state) => {
            state.deleteSpecialty.isFetching = false;
            state.deleteSpecialty.error = false;
        },
        DELETE_SPECIALTY_FAILED: (state) => {
            state.deleteSpecialty.isFetching = false;
            state.deleteSpecialty.error = true;
        },

        GET_FACILITY_START: (state) => {
            state.facility.isFetching = true;
        },
        GET_FACILITY_SUCCESS: (state, action) => {
            state.facility.listClinic = action.payload;
            state.facility.isFetching = false;
            state.facility.error = false;
        },
        GET_FACILITY_FAILED: (state) => {
            state.facility.isFetching = false;
            state.facility.error = true;
        },

        CREATE_FACILITY_START: (state) => {
            state.createClinic.isFetching = true;
        },
        CREATE_FACILITY_SUCCESS: (state, action) => {
            state.createClinic.currentClinic = action.payload;
            state.createClinic.isFetching = false;
            state.createClinic.error = false;
        },
        CREATE_FACILITY_FAILED: (state) => {
            state.createClinic.isFetching = false;
            state.createClinic.error = true;
        },

        EDIT_FACILITY_START: (state) => {
            state.editClinic.isFetching = true;
        },
        EDIT_FACILITY_SUCCESS: (state, action) => {
            state.editClinic.currentUser = action.payload;
            state.editClinic.isFetching = false;
            state.editClinic.error = false;
        },
        EDIT_FACILITY_FAILED: (state) => {
            state.editClinic.isFetching = false;
            state.editClinic.error = true;
        },

        DELETE_FACILITY_START: (state) => {
            state.deleteClinic.isFetching = true;
        },
        DELETE_FACILITY_SUCCESS: (state) => {
            state.deleteClinic.isFetching = false;
            state.deleteClinic.error = false;
        },
        DELETE_FACILITY_FAILED: (state) => {
            state.deleteClinic.isFetching = false;
            state.deleteClinic.error = true;
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
    OPEN_AMIN, OPEN_DOCTOR, OPEN_PATIENT, CLEAR_ALL_LIST,
    SAVE_INFO_DOCTOR_START, SAVE_INFO_DOCTOR_SUCCESS, SAVE_INFO_DOCTOR_FAILED,
    GET_INFO_DOCTOR_START, GET_INFO_DOCTOR_SUCCESS, GET_INFO_DOCTOR_FAILED,
    GET_ROLE_START, GET_ROLE_SUCCESS, GET_ROLE_FAILED,
    GET_SPECIALTY_START, GET_SPECIALTY_SUCCESS, GET_SPECIALTY_FAILED,
    CREATE_SPECIALTY_START, CREATE_SPECIALTY_SUCCESS, CREATE_SPECIALTY_FAILED,
    EDIT_SPECIALTY_START, EDIT_SPECIALTY_SUCCESS, EDIT_SPECIALTY_FAILED,
    DELETE_SPECIALTY_START, DELETE_SPECIALTY_SUCCESS, DELETE_SPECIALTY_FAILED,
    GET_FACILITY_START, GET_FACILITY_SUCCESS, GET_FACILITY_FAILED,
    CREATE_FACILITY_START, CREATE_FACILITY_SUCCESS, CREATE_FACILITY_FAILED,
    EDIT_FACILITY_START, EDIT_FACILITY_SUCCESS, EDIT_FACILITY_FAILED,
    DELETE_FACILITY_START, DELETE_FACILITY_SUCCESS, DELETE_FACILITY_FAILED,
} = adminSlice.actions;

export default adminSlice.reducer;