import {
    GET_CODE_PAYMENT_FAILED,
    GET_CODE_PAYMENT_START,
    GET_CODE_PAYMENT_SUSSCESS,
    GET_CODE_PRICE_FAILED,
    GET_CODE_PRICE_START,
    GET_CODE_PRICE_SUSSCESS,
    GET_CODE_PROVINCE_FAILED,
    GET_CODE_PROVINCE_START,
    GET_CODE_PROVINCE_SUSSCESS,
    GET_CODE_TIME_FAILED,
    GET_CODE_TIME_START,
    GET_CODE_TIME_SUSSCESS,
} from "../store/slice/doctorSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAxiosJWT } from "./authService";

export const handleApiGetAllCode = async (TYPE, dispatch, user) => {
    switch (TYPE) {
        case "TIME":
            dispatch(GET_CODE_TIME_START());
            break;
        case "PRICE":
            dispatch(GET_CODE_PRICE_START());
            break;
        case "PAYMENT":
            dispatch(GET_CODE_PAYMENT_START());
            break;
        case "PROVINCE":
            dispatch(GET_CODE_PROVINCE_START());
            break;
        default:
    }
    try {
        let axiosJWT = createAxiosJWT(user, dispatch);
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/get-allcode/${TYPE}`,
            {
                headers: { token: `Bearer ${user.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            switch (TYPE) {
                case "TIME":
                    dispatch(GET_CODE_TIME_SUSSCESS(res.data.data));
                    break;
                case "PRICE":
                    dispatch(GET_CODE_PRICE_SUSSCESS(res.data.data));
                    break;
                case "PAYMENT":
                    dispatch(GET_CODE_PAYMENT_SUSSCESS(res.data.data));
                    break;
                case "PROVINCE":
                    dispatch(GET_CODE_PROVINCE_SUSSCESS(res.data.data));
                    break;
                default:
            }
        }
    } catch (err) {
        switch (TYPE) {
            case "TIME":
                dispatch(GET_CODE_TIME_FAILED());
                break;
            case "PRICE":
                dispatch(GET_CODE_PRICE_FAILED());
                break;
            case "PAYMENT":
                dispatch(GET_CODE_PAYMENT_FAILED());
                break;
            case "PROVINCE":
                dispatch(GET_CODE_PROVINCE_FAILED());
                break;
            default:
        }
    }
}

export const handleApiGetSchedule = async (dispatch, doctor, selectedDate, setListSelectedTime, setIsLoading) => {
    setIsLoading(true);
    try {
        console.log(">>>>>call api schedule");
        let axiosJWT = createAxiosJWT(doctor, dispatch);
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/get-schedule`,
            {
                params: {
                    doctorId: doctor?.id,
                    date: selectedDate
                },
                headers: { token: `Bearer ${doctor.accessToken}` },
                "withCredentials": true
            });
        if (res.data.errCode === 0) {
            const temp = res.data.data.map(element => {
                return element.timeType
            });
            setListSelectedTime(temp);
            setIsLoading(false);
        }
    } catch (err) {
    }
}

export const handleApiSaveSheduleDoctor = async (data, dispatch, userLogin, setIsLoading) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.post(`${process.env.REACT_APP_BACKEND_URL}/doctor/save-schedule`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            setIsLoading(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiGetDoctorInfo = async (dispatch, doctor, setDefaultValue, setIsLoading) => {
    try {
        console.log(">>>>>call api doctor info");
        let axiosJWT = createAxiosJWT(doctor, dispatch);
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/get-doctor-info/${doctor.id}`,
            {
                headers: { token: `Bearer ${doctor.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            setDefaultValue(res);
            setIsLoading(false);
        }
    } catch (err) {
        toast.error("Can't load data from server");
    }
}

export const handleApiSaveDataDoctorInfo = async (data, dispatch, userLogin, setIsLoading) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.put(`${process.env.REACT_APP_BACKEND_URL}/doctor/save-doctor-info`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            setIsLoading(false);
        }
    } catch (err) {
        toast.error(err.response?.data?.message);
        setIsLoading(false);
    }
}

export const handleApiGetListAppointment = async (data, dispatch, setListAppointment, userLogin, setIsLoading) => {
    setIsLoading(true)
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/get-list-appointment`,
            {
                params: data,
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            setListAppointment(res.data.data);
            setIsLoading(false)
        }
    } catch (err) {
        toast.error("Can't load data from server");
    }
}

export const handleApiDoneAppointment = async (data, dispatch, setIsOpenModal, toggleUpdateData, setToggleUpdateData, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.put(`${process.env.REACT_APP_BACKEND_URL}/doctor/done-appointment`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            setToggleUpdateData(!toggleUpdateData);
            setIsOpenModal(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}