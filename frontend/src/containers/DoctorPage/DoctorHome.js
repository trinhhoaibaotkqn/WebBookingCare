import { Outlet } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";
import {
    GET_LIST_PAYMENT_FAILED,
    GET_LIST_PAYMENT_START,
    GET_LIST_PAYMENT_SUSSCESS,
    GET_LIST_PRICE_FAILED,
    GET_LIST_PRICE_START,
    GET_LIST_PRICE_SUSSCESS,
    GET_LIST_PROVINCE_FAILED,
    GET_LIST_PROVINCE_START,
    GET_LIST_PROVINCE_SUSSCESS,
    GET_LIST_TIME_FAILED,
    GET_LIST_TIME_START,
    GET_LIST_TIME_SUSSCESS
} from "../../store/slice/doctorSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const DoctorHome = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const handleLoadTimePricePaymentProvinceFromDB = async () => {
            dispatch(GET_LIST_TIME_START());
            dispatch(GET_LIST_PRICE_START());
            dispatch(GET_LIST_PAYMENT_START());
            dispatch(GET_LIST_PROVINCE_START());

            try {
                console.log(">>>>>call api time");
                const res = await axios.get("http://localhost:8080/doctor/get-allcode/TIME",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_LIST_TIME_SUSSCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_LIST_TIME_FAILED());
            }

            try {
                console.log(">>>>>call api price");
                const res = await axios.get("http://localhost:8080/doctor/get-allcode/PRICE",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_LIST_PRICE_SUSSCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_LIST_PRICE_FAILED());
            }

            try {
                console.log(">>>>>call api payment");
                const res = await axios.get("http://localhost:8080/doctor/get-allcode/PAYMENT",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_LIST_PAYMENT_SUSSCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_LIST_PAYMENT_FAILED());
            }

            try {
                console.log(">>>>>call api province");
                const res = await axios.get("http://localhost:8080/doctor/get-allcode/PROVINCE",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_LIST_PROVINCE_SUSSCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_LIST_PROVINCE_FAILED());
            }
        }
        handleLoadTimePricePaymentProvinceFromDB();
    }, [dispatch]);

    return (
        <div>
            <DoctorHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default DoctorHome;