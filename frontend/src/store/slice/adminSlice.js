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
        allSpecialties: {
            listNameSpecialties: null,
            isFetching: false,
            error: false
        },
        allFacilities: {
            listNameFacilities: null,
            isFetching: false,
            error: false
        },
        infoDoctor: {
            info: null,
            isFetching: false,
            error: false
        },
        code: {
            listRole: null,
            listGender: null,
            listPosition: null,
            isFetching: false,
            error: false
        },
        specialty: {
            listSpecialty: null,
            isFetching: false,
            error: false
        },
        facility: {
            listClinic: null,
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

        CLEAN_ALL_LIST: (state) => {
            state.admin.listAdmin = null;
            state.doctor.listDoctor = null;
            state.patient.listPatient = null;
        },

        GET_LIST_NAME_SPECIALTY_START: (state) => {
            state.allSpecialties.isFetching = true;
        },
        GET_LIST_NAME_SPECIALTY_SUCCESS: (state, action) => {
            state.allSpecialties.isFetching = false;
            state.allSpecialties.listNameSpecialties = action.payload;
            state.allSpecialties.error = false;
        },
        GET_LIST_NAME_SPECIALTY_FAILED: (state) => {
            state.allSpecialties.isFetching = false;
            state.allSpecialties.error = true;
        },

        GET_LIST_NAME_FACILITY_START: (state) => {
            state.allFacilities.isFetching = true;
        },
        GET_LIST_NAME_FACILITY_SUCCESS: (state, action) => {
            state.allFacilities.isFetching = false;
            state.allFacilities.listNameFacilities = action.payload;
            state.allFacilities.error = false;

        },
        GET_LIST_NAME_FACILITY_FAILED: (state) => {
            state.allFacilities.isFetching = false;
            state.allFacilities.error = true;
        },
        CLEAN_LIST_NAME_SPECIALTY_AND_FACILITY: (state) => {
            state.allFacilities.listNameFacilities = null;
            state.allSpecialties.listNameSpecialties = null;
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
        CLEAN_INFO_DOCTOR: (state) => {
            state.infoDoctor.info = null;
        },

        GET_CODE_START: (state) => {
            state.code.isFetching = true;
        },
        GET_ROLE_SUCCESS: (state, action) => {
            state.code.listRole = action.payload;
            state.code.isFetching = false;
            state.code.error = false;
        },
        GET_GENDER_SUCCESS: (state, action) => {
            state.code.listGender = action.payload;
            state.code.isFetching = false;
            state.code.error = false;
        },
        GET_POSITION_SUCCESS: (state, action) => {
            state.code.listPosition = action.payload;
            state.code.isFetching = false;
            state.code.error = false;
        },
        GET_CODE_FAILED: (state) => {
            state.code.isFetching = false;
            state.code.error = true;
        },

        CLEAN_ALL_CODE: (state) => {
            state.code.listRole = null;
            state.code.listGender = null;
            state.code.listPosition = null;
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
        CREATE_FACILITY_SUCCESS: (state, action) => {
            let newFacility = {
                id: action.payload.id,
                name: action.payload.name
            }
            state.allFacilities.listNameFacilities = [...state.allFacilities.listNameFacilities, newFacility]
        },
        EDIT_FACILITY_SUCCESS: (state, action) => {
            let temp = [...state.allFacilities.listNameFacilities];
            temp.forEach(item => {
                if (item.id === action.payload.id)
                    item.name = action.payload.name
            });
            state.allFacilities.listNameFacilities = temp;
        },
        DELETE_FACILITY_SUCCESS: (state, action) => {
            let temp = state.allFacilities.listNameFacilities.filter(item => {
                return item.id !== action.payload
            });
            state.allFacilities.listNameFacilities = temp;
        },
        CREATE_SPECIALTY_SUCCESS: (state, action) => {
            let newSpecialty = {
                id: action.payload.id,
                name: action.payload.name
            }
            state.allSpecialties.listNameSpecialties = [...state.allSpecialties.listNameSpecialties, newSpecialty]
        },
        EDIT_SPECIALTY_SUCCESS: (state, action) => {
            let temp = [...state.allSpecialties.listNameSpecialties];
            temp.forEach(item => {
                if (item.id === action.payload.id)
                    item.name = action.payload.name
            });
            state.allSpecialties.listNameSpecialties = temp;
        },
        DELETE_SPECIALTY_SUCCESS: (state, action) => {
            let temp = state.allSpecialties.listNameSpecialties.filter(item => {
                return item.id !== action.payload
            });
            state.allSpecialties.listNameSpecialties = temp;
        }
    },
})

export const {
    GET_ADMIN_START, GET_ADMIN_SUCCESS, GET_ADMIN_FAILED,
    GET_PATIENT_START, GET_PATIENT_SUCCESS, GET_PATIENT_FAILED,
    GET_DOCTOR_START, GET_DOCTOR_SUCCESS, GET_DOCTOR_FAILED,
    OPEN_AMIN, OPEN_DOCTOR, OPEN_PATIENT, CLEAN_ALL_LIST, CLEAN_INFO_DOCTOR,
    GET_INFO_DOCTOR_START, GET_INFO_DOCTOR_SUCCESS, GET_INFO_DOCTOR_FAILED,
    GET_CODE_START, GET_ROLE_SUCCESS, GET_GENDER_SUCCESS, GET_POSITION_SUCCESS, GET_CODE_FAILED,
    GET_LIST_NAME_FACILITY_START, GET_LIST_NAME_FACILITY_SUCCESS, GET_LIST_NAME_FACILITY_FAILED,
    GET_LIST_NAME_SPECIALTY_START, GET_LIST_NAME_SPECIALTY_SUCCESS, GET_LIST_NAME_SPECIALTY_FAILED,
    GET_SPECIALTY_START, GET_SPECIALTY_SUCCESS, GET_SPECIALTY_FAILED,
    GET_FACILITY_START, GET_FACILITY_SUCCESS, GET_FACILITY_FAILED,
    CREATE_FACILITY_SUCCESS, EDIT_FACILITY_SUCCESS, DELETE_FACILITY_SUCCESS,
    CREATE_SPECIALTY_SUCCESS, EDIT_SPECIALTY_SUCCESS, DELETE_SPECIALTY_SUCCESS,
    CLEAN_ALL_CODE, CLEAN_LIST_NAME_SPECIALTY_AND_FACILITY
} = adminSlice.actions;

export default adminSlice.reducer;