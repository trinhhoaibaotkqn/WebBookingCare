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
        }
    },
    reducers: {

        GET_CODE_TIME_START: (state) => {
            state.time.isFetching = true;
        },
        GET_CODE_TIME_SUSSCESS: (state, action) => {
            state.time.isFetching = false;
            state.time.listTime = action.payload;
            state.time.error = false;
        },
        GET_CODE_TIME_FAILED: (state) => {
            state.time.error = true;
        },

        GET_CODE_PRICE_START: (state) => {
            state.price.isFetching = true;
        },
        GET_CODE_PRICE_SUSSCESS: (state, action) => {
            state.price.isFetching = false;
            state.price.listPrice = action.payload;
            state.price.error = false;
        },
        GET_CODE_PRICE_FAILED: (state) => {
            state.price.error = true;
        },

        GET_CODE_PAYMENT_START: (state) => {
            state.payment.isFetching = true;
        },
        GET_CODE_PAYMENT_SUSSCESS: (state, action) => {
            state.payment.isFetching = false;
            state.payment.listPayment = action.payload;
            state.payment.error = false;
        },
        GET_CODE_PAYMENT_FAILED: (state) => {
            state.payment.error = true;
        },

        GET_CODE_PROVINCE_START: (state) => {
            state.province.isFetching = true;
        },
        GET_CODE_PROVINCE_SUSSCESS: (state, action) => {
            state.province.isFetching = false;
            state.province.listProvince = action.payload;
            state.province.error = false;
        },
        GET_CODE_PROVINCE_FAILED: (state) => {
            state.province.error = true;
        },

        CLEAN_ALL_CODE: (state) => {
            state.time.listTime = null;
            state.price.listPrice = null;
            state.payment.listPayment = null;
            state.province.listProvince = null;
        }
    },
})

export const {
    GET_CODE_TIME_START, GET_CODE_TIME_SUSSCESS, GET_CODE_TIME_FAILED,
    GET_CODE_PRICE_START, GET_CODE_PRICE_SUSSCESS, GET_CODE_PRICE_FAILED,
    GET_CODE_PAYMENT_START, GET_CODE_PAYMENT_SUSSCESS, GET_CODE_PAYMENT_FAILED,
    GET_CODE_PROVINCE_START, GET_CODE_PROVINCE_SUSSCESS, GET_CODE_PROVINCE_FAILED,
    CLEAN_ALL_CODE,
} = doctorSlice.actions;

export default doctorSlice.reducer;