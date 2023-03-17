import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        time: {
            listTime: null,
            isFetching: false,
            error: false
        },
        price: {
            listPrice: null,
            isFetching: false,
            error: false
        },
        payment: {
            listPayment: null,
            isFetching: false,
            error: false
        },
        province: {
            listProvince: null,
            isFetching: false,
            error: false
        },
        schedule: {
            listSelectedTime: null,
            isFetching: false,
            error: false
        },
        doctorInfo: {
            info: null,
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

        GET_LIST_PRICE_START: (state) => {
            state.price.isFetching = true;
        },
        GET_LIST_PRICE_SUSSCESS: (state, action) => {
            state.price.isFetching = false;
            state.price.listPrice = action.payload;
            state.price.error = false;
        },
        GET_LIST_PRICE_FAILED: (state) => {
            state.price.error = true;
        },

        GET_LIST_PAYMENT_START: (state) => {
            state.payment.isFetching = true;
        },
        GET_LIST_PAYMENT_SUSSCESS: (state, action) => {
            state.payment.isFetching = false;
            state.payment.listPayment = action.payload;
            state.payment.error = false;
        },
        GET_LIST_PAYMENT_FAILED: (state) => {
            state.payment.error = true;
        },

        GET_LIST_PROVINCE_START: (state) => {
            state.province.isFetching = true;
        },
        GET_LIST_PROVINCE_SUSSCESS: (state, action) => {
            state.province.isFetching = false;
            state.province.listProvince = action.payload;
            state.province.error = false;
        },
        GET_LIST_PROVINCE_FAILED: (state) => {
            state.province.error = true;
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

        GET_LIST_SELECTED_TIME_START: (state) => {
            state.schedule.isFetching = true;
        },
        GET_LIST_SELECTED_TIME_SUSSCESS: (state, action) => {
            state.schedule.isFetching = false;
            state.schedule.listSelectedTime = action.payload;
            state.schedule.error = false;
        },
        GET_LIST_SELECTED_TIME_FAILED: (state) => {
            state.schedule.error = true;
        },

        SAVE_DOCTOR_INFO_START: (state) => {
            state.doctorInfo.isFetching = true;
        },
        SAVE_DOCTOR_INFO_SUSSCESS: (state, action) => {
            state.doctorInfo.isFetching = false;
            state.doctorInfo.info = action.payload;
            state.doctorInfo.error = false;
        },
        SAVE_DOCTOR_INFO_FAILED: (state) => {
            state.doctorInfo.error = true;
        },

        GET_DOCTOR_INFO_START: (state) => {
            state.doctorInfo.isFetching = true;
        },
        GET_DOCTOR_INFO_SUSSCESS: (state, action) => {
            state.doctorInfo.isFetching = false;
            state.doctorInfo.info = action.payload;
            state.doctorInfo.error = false;
        },
        GET_DOCTOR_INFO_FAILED: (state) => {
            state.doctorInfo.error = true;
        },
    },
})

export const {
    GET_LIST_TIME_START, GET_LIST_TIME_SUSSCESS, GET_LIST_TIME_FAILED,
    GET_LIST_PRICE_START, GET_LIST_PRICE_SUSSCESS, GET_LIST_PRICE_FAILED,
    GET_LIST_PAYMENT_START, GET_LIST_PAYMENT_SUSSCESS, GET_LIST_PAYMENT_FAILED,
    GET_LIST_PROVINCE_START, GET_LIST_PROVINCE_SUSSCESS, GET_LIST_PROVINCE_FAILED,
    SAVE_LIST_SELECTED_TIME_START, SAVE_LIST_SELECTED_TIME_SUSSCESS, SAVE_LIST_SELECTED_TIME_FAILED,
    GET_LIST_SELECTED_TIME_START, GET_LIST_SELECTED_TIME_SUSSCESS, GET_LIST_SELECTED_TIME_FAILED,
    SAVE_DOCTOR_INFO_START, SAVE_DOCTOR_INFO_SUSSCESS, SAVE_DOCTOR_INFO_FAILED,
    GET_DOCTOR_INFO_START, GET_DOCTOR_INFO_SUSSCESS, GET_DOCTOR_INFO_FAILED,

} = doctorSlice.actions;

export default doctorSlice.reducer;