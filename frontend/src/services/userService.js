import {
    BOOK_APPOINTMENT_START, BOOK_APPOINTMENT_SUSSCESS, BOOK_APPOINTMENT_FAILED,
    CONFIRM_APPOINTMENT_START, CONFIRM_APPOINTMENT_SUSSCESS, CONFIRM_APPOINTMENT_FAILED,
    GET_LIST_SPECIALTY_START, GET_LIST_SPECIALTY_SUSSCESS, GET_LIST_SPECIALTY_FAILED,
    GET_LIST_FACILITY_START, GET_LIST_FACILITY_SUSSCESS, GET_LIST_FACILITY_FAILED,
    GET_LIST_DOCTOR_BY_SPECIALTY_START, GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS, GET_LIST_DOCTOR_BY_SPECIALTY_FAILED,
    GET_TOP_DOCTORS_START, GET_TOP_DOCTORS_SUSSCESS, GET_TOP_DOCTORS_FAILED, GET_SCHEDULE_DOCTOR_START,
    GET_SCHEDULE_DOCTOR_SUSSCESS, GET_SCHEDULE_DOCTOR_FAILED, GET_LIST_DOCTOR_BY_FACILITY_START, GET_LIST_DOCTOR_BY_FACILITY_SUSSCESS, GET_LIST_DOCTOR_BY_FACILITY_FAILED,

} from "../store/slice/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const handleApiBookAppointment = async (data, dispatch, setIsShow, setToggleBooked, toggleBooked, setReason) => {
    dispatch(BOOK_APPOINTMENT_START());
    try {
        const res = await axios.post(`http://localhost:8080/user/book-appointment`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(BOOK_APPOINTMENT_SUSSCESS(res.data.booking));
            toast.success(res.data.message);
            setReason("");
            setToggleBooked(!toggleBooked);
            setIsShow(false);
        }
    } catch (err) {
        dispatch(BOOK_APPOINTMENT_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiConfirmAppointment = async (data, dispatch, setErrCode) => {
    dispatch(CONFIRM_APPOINTMENT_START());
    try {
        const res = await axios.post(`http://localhost:8080/user/verify-booking-appointment`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(CONFIRM_APPOINTMENT_SUSSCESS());
            setErrCode(0);
        }
    } catch (err) {
        dispatch(CONFIRM_APPOINTMENT_FAILED());
        if (err.response.data.errCode === 3) {
            setErrCode(3);
        } else {
            setErrCode(1);
        }
    }
}

export const handleGetAllSpecialty = async (dispatch, setListSpecialty) => {
    dispatch(GET_LIST_SPECIALTY_START());
    try {
        console.log("call api get list specialty")
        const res = await axios.get(`http://localhost:8080/user/get-all-specialty`,
            {
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListSpecialty(res.data.data);
            dispatch(GET_LIST_SPECIALTY_SUSSCESS(res.data.data));
        }
    } catch (err) {
        dispatch(GET_LIST_SPECIALTY_FAILED());
    }
}

export const handleApiGetAllFacility = async (dispatch, setListFacility) => {
    dispatch(GET_LIST_FACILITY_START());
    try {
        console.log("call api get list facility")
        const res = await axios.get(`http://localhost:8080/user/get-all-clinic`,
            {
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListFacility(res.data.data);
            dispatch(GET_LIST_FACILITY_SUSSCESS(res.data.data));
        }
    } catch (err) {
        dispatch(GET_LIST_FACILITY_FAILED());
    }
}

export const handleApiGetListDoctorBySpecialty = async (specialtyId, dispatch, setListDoctor) => {
    dispatch(GET_LIST_DOCTOR_BY_SPECIALTY_START());
    try {
        console.log("call api get list doctor by specialty")
        const res = await axios.get(`http://localhost:8080/user/get-all-doctor-by-specialty/${specialtyId}`,
            {
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListDoctor(res.data.data);
            dispatch(GET_LIST_DOCTOR_BY_SPECIALTY_SUSSCESS(res.data.data));
        }
    } catch (err) {
        dispatch(GET_LIST_DOCTOR_BY_SPECIALTY_FAILED());
    }
}

export const handleApiGetListDoctorByFacility = async (facilityId, dispatch, setListDoctor) => {
    dispatch(GET_LIST_DOCTOR_BY_FACILITY_START());
    try {
        console.log("call api get list doctor by facility")
        const res = await axios.get(`http://localhost:8080/user/get-all-doctor-by-clinic/${facilityId}`,
            {
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setListDoctor(res.data.data);
            dispatch(GET_LIST_DOCTOR_BY_FACILITY_SUSSCESS(res.data.data));
        }
    } catch (err) {
        dispatch(GET_LIST_DOCTOR_BY_FACILITY_FAILED());
    }
}

export const handleApiGetTopDoctor = async (limit, dispatch, setListDoctors) => {
    dispatch(GET_TOP_DOCTORS_START());
    try {
        console.log("call api get top doctor")
        const res = await axios.get(`http://localhost:8080/user/get-top-doctor-home/${limit}`,
            {
                "withCredentials": true
            });
        if (res.data) {
            setListDoctors(res.data.data);
            dispatch(GET_TOP_DOCTORS_SUSSCESS(res.data.data));
        }
    } catch (err) {
        dispatch(GET_TOP_DOCTORS_FAILED());
    }
}

export const handleApiGetScheduleByDay = async (data, dispatch, setListTime) => {
    dispatch(GET_SCHEDULE_DOCTOR_START());
    try {
        console.log(">>>>>call api schedule doctor");
        const res = await axios.get("http://localhost:8080/user/get-schedule-doctor",
            {
                params: data
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_SCHEDULE_DOCTOR_SUSSCESS(res.data.data));
            setListTime(res.data.data);
        }
    } catch (err) {
        dispatch(GET_SCHEDULE_DOCTOR_FAILED());
        setListTime([]);
    }
}