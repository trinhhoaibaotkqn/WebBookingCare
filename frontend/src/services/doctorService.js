import {
    COMPLETE_APPOINTMENT_FAILED,
    COMPLETE_APPOINTMENT_START,
    COMPLETE_APPOINTMENT_SUSSCESS,
    GET_LIST_APPOINTMENT_FAILED,
    GET_LIST_APPOINTMENT_START,
    GET_LIST_APPOINTMENT_SUSSCESS,
    SAVE_DOCTOR_INFO_FAILED,
    SAVE_DOCTOR_INFO_START,
    SAVE_DOCTOR_INFO_SUSSCESS,
    SAVE_LIST_SELECTED_TIME_FAILED,
    SAVE_LIST_SELECTED_TIME_START, SAVE_LIST_SELECTED_TIME_SUSSCESS
} from "../store/slice/doctorSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const handleApiSaveSheduleDoctor = async (data, dispatch) => {
    dispatch(SAVE_LIST_SELECTED_TIME_START());
    try {
        const res = await axios.post(`http://localhost:8080/doctor/save-schedule`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(SAVE_LIST_SELECTED_TIME_SUSSCESS(res.data.data));
            toast.success(res.data.message);
        }
    } catch (err) {
        dispatch(SAVE_LIST_SELECTED_TIME_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiSaveDataDoctorInfo = async (data, dispatch) => {
    dispatch(SAVE_DOCTOR_INFO_START());
    try {
        const res = await axios.put(`http://localhost:8080/doctor/save-doctor-info`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(SAVE_DOCTOR_INFO_SUSSCESS(res.data.data));
            toast.success(res.data.message);
        }
    } catch (err) {
        dispatch(SAVE_DOCTOR_INFO_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiGetListAppointment = async (data, dispatch, setListAppointment) => {
    dispatch(GET_LIST_APPOINTMENT_START());
    try {
        const res = await axios.get(`http://localhost:8080/doctor/get-list-appointment`,
            {
                params: data
            },
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_LIST_APPOINTMENT_SUSSCESS(res.data.data));
            setListAppointment(res.data.data);
        }
    } catch (err) {
        dispatch(GET_LIST_APPOINTMENT_FAILED());
    }
}

export const handleApiDoneAppointment = async (data, dispatch, setIsOpenModal, toggleUpdateData, setToggleUpdateData) => {
    dispatch(COMPLETE_APPOINTMENT_START());
    try {
        const res = await axios.put(`http://localhost:8080/doctor/done-appointment`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(COMPLETE_APPOINTMENT_SUSSCESS());
            toast.success(res.data.message);
            setToggleUpdateData(!toggleUpdateData);
            setIsOpenModal(false);
        }
    } catch (err) {
        dispatch(COMPLETE_APPOINTMENT_FAILED());
        toast.error(err.response.data.message);
    }
}