import {
    GET_LIST_SPECIALTY_START, GET_LIST_SPECIALTY_SUSSCESS, GET_LIST_SPECIALTY_FAILED,
    GET_LIST_FACILITY_START, GET_LIST_FACILITY_SUSSCESS, GET_LIST_FACILITY_FAILED,
    GET_TOP_DOCTORS_START, GET_TOP_DOCTORS_SUSSCESS, GET_TOP_DOCTORS_FAILED,
    GET_LIST_DOCTOR_BY_SPECIALTY_START, GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS, GET_LIST_DOCTOR_BY_SPECIALTY_FAILED,
    GET_LIST_DOCTOR_BY_FACILITY_START, GET_LIST_DOCTOR_BY_FACILITY_SUSSCESS, GET_LIST_DOCTOR_BY_FACILITY_FAILED,

} from "../store/slice/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { createAxiosJWT } from "./authService";

export const handleApiBookAppointment = async (data, dispatch, setIsShow, setToggleBooked, toggleBooked, setReason, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.post(`${process.env.REACT_APP_BACKEND_URL}/user/book-appointment`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            setReason("");
            setToggleBooked(!toggleBooked);
            setIsShow(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiConfirmAppointment = async (data, dispatch, setErrCode) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/verify-booking-appointment`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            setErrCode(0);
        }
    } catch (err) {
        if (err.response.data.errCode === 3) {
            setErrCode(3);
        } else {
            setErrCode(1);
        }
    }
}

export const handleGetAllSpecialty = async (limit, currentPage, dispatch, setListSpecialty, setTotalPage, setIsLoading) => {
    setIsLoading(true);
    dispatch(GET_LIST_SPECIALTY_START());
    try {
        console.log("call api get list specialty")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-specialty`,
            {
                params: {
                    limit: limit,
                    currentPage: currentPage
                },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListSpecialty(res.data.data.data);
            setTotalPage(res.data.data.totalPage);
            setIsLoading(false);
            dispatch(GET_LIST_SPECIALTY_SUSSCESS(res.data.data.data));
        }
    } catch (err) {
        setIsLoading(false);
        dispatch(GET_LIST_SPECIALTY_FAILED());
    }
}

export const handleApiGetAllFacility = async (limit, currentPage, dispatch, setListFacility, setTotalPage, setIsLoading) => {
    setIsLoading(true);
    dispatch(GET_LIST_FACILITY_START());
    try {
        console.log("call api get list facility")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-clinic`,
            {
                params: {
                    limit: limit,
                    currentPage: currentPage
                },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListFacility(res.data.data.data);
            setTotalPage(res.data.data.totalPage);
            setIsLoading(false);
            dispatch(GET_LIST_FACILITY_SUSSCESS(res.data.data.data));
        }
    } catch (err) {
        setIsLoading(false);
        dispatch(GET_LIST_FACILITY_FAILED());
    }
}

export const handleApiGetListDoctorBySpecialty = async (specialtyId, dispatch, setListDoctor, limit, currentPage, setTotalPage, setIsLoading) => {
    setIsLoading(true)
    dispatch(GET_LIST_DOCTOR_BY_SPECIALTY_START());
    try {
        console.log("call api get list doctor by specialty")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-doctor-by-specialty/${specialtyId}`,
            {
                params: {
                    limit: limit,
                    currentPage: currentPage
                },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListDoctor(res.data.data.data);
            setTotalPage(res.data.data.totalPage);
            setIsLoading(false);
            dispatch(GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS(res.data.data.data));
        }
    } catch (err) {
        setIsLoading(false);
        dispatch(GET_LIST_DOCTOR_BY_SPECIALTY_FAILED());
    }
}

export const handleApiGetListDoctorByFacility = async (facilityId, dispatch, setListDoctor, limit, currentPage, setTotalPage, setIsLoading) => {
    setIsLoading(true)
    dispatch(GET_LIST_DOCTOR_BY_FACILITY_START());
    try {
        console.log("call api get list doctor by facility")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-doctor-by-clinic/${facilityId}`,
            {
                params: {
                    limit: limit,
                    currentPage: currentPage
                },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListDoctor(res.data.data.data);
            setTotalPage(res.data.data.totalPage);
            setIsLoading(false)
            dispatch(GET_LIST_DOCTOR_BY_FACILITY_SUSSCESS(res.data.data.data));
        }
    } catch (err) {
        dispatch(GET_LIST_DOCTOR_BY_FACILITY_FAILED());
        setIsLoading(false)
    }
}

export const handleApiGetTopDoctor = async (limit, dispatch, setListDoctors, setIsLoading) => {
    dispatch(GET_TOP_DOCTORS_START());
    try {
        console.log("call api get top doctor")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-top-doctor-home/${limit}`,
            {
                "withCredentials": true
            });
        if (res.data) {
            setListDoctors(res.data.data);
            setIsLoading(false);
            dispatch(GET_TOP_DOCTORS_SUSSCESS(res.data.data));
        }
    } catch (err) {
        dispatch(GET_TOP_DOCTORS_FAILED());
    }
}

export const handleApiGetScheduleByDay = async (data, setListTime, setIsLoading) => {
    try {
        console.log(">>>>>call api schedule doctor");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-schedule-doctor`,
            {
                params: data
            });
        if (res.data && res.data.errCode === 0) {
            setListTime(res.data.data);
            setIsLoading(false);
        }
    } catch (err) {
        setListTime([]);
    }
}

export const handleApiGetTopClinic = async (limit, setListFacility, setIsLoading) => {
    try {
        console.log("call api get top facility")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-top-clinic`,
            {
                params: { limit: limit },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListFacility(res.data.data);
            setIsLoading(false);
        }
    } catch (err) {
        toast.error("SERVER ERROR");
    }
}

export const handleApiGetTopSpecialty = async (limit, setListSpecialty, setIsLoading) => {
    try {
        console.log("call api get top specialty")
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-top-specialty`,
            {
                params: { limit: limit },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListSpecialty(res.data.data);
            setIsLoading(false);
        }
    } catch (err) {
        toast.error("SERVER ERROR");
    }
}