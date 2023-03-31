import {
    CREATE_USER_FAILED,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    DELETE_USER_FAILED,
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    EDIT_USER_FAILED,
    EDIT_USER_START,
    EDIT_USER_SUCCESS,
    SAVE_INFO_DOCTOR_FAILED,
    SAVE_INFO_DOCTOR_START,
    SAVE_INFO_DOCTOR_SUCCESS,
    GET_INFO_DOCTOR_FAILED,
    GET_INFO_DOCTOR_START,
    GET_INFO_DOCTOR_SUCCESS,
    CREATE_SPECIALTY_START,
    CREATE_SPECIALTY_SUCCESS,
    CREATE_SPECIALTY_FAILED,
    GET_SPECIALTY_START,
    GET_SPECIALTY_SUCCESS,
    GET_SPECIALTY_FAILED,
    EDIT_SPECIALTY_START,
    EDIT_SPECIALTY_SUCCESS,
    EDIT_SPECIALTY_FAILED,
    DELETE_SPECIALTY_START,
    DELETE_SPECIALTY_SUCCESS,
    DELETE_SPECIALTY_FAILED
} from "../store/slice/adminSlice";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleApiCreateUser = async (user, dispatch, handleListenChange, handleModalAdd, clearModal) => {
    dispatch(CREATE_USER_START());
    try {
        const res = await axios.post("http://localhost:8080/admin/create-new-user", user,
            {
                "withCredentials": true
            });
        if (res.data.errCode === 0) {
            dispatch(CREATE_USER_SUCCESS(res.data.user));
            toast.success(res.data.message);
            handleListenChange();
            clearModal();
            handleModalAdd();
        }
    } catch (err) {
        dispatch(CREATE_USER_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiEditUser = async (id, user, dispatch, handleListenChange) => {
    dispatch(EDIT_USER_START());
    try {
        const res = await axios.patch(`http://localhost:8080/admin/edit-user/${id}`, user,
            {
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            dispatch(EDIT_USER_SUCCESS(res.data.user));
            toast.success(res.data.message);
            handleListenChange();
        }
    } catch (err) {
        dispatch(EDIT_USER_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiDeleteUser = async (id, dispatch, handleListenChange) => {
    dispatch(DELETE_USER_START());
    try {
        const res = await axios.delete(`http://localhost:8080/admin/delete-user/${id}`,
            {
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            dispatch(DELETE_USER_SUCCESS());
            toast.success(res.data.message);
            handleListenChange();
        }
    } catch (err) {
        dispatch(DELETE_USER_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiSaveInfoDoctor = async (data, dispatch, navigate) => {
    dispatch(SAVE_INFO_DOCTOR_START());
    try {
        const res = await axios.post(`http://localhost:8080/admin/save-info-doctor`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(SAVE_INFO_DOCTOR_SUCCESS(res.data.info));
            toast.success(res.data.message);
            navigate("/system/admin/user");
        }
    } catch (err) {
        dispatch(SAVE_INFO_DOCTOR_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiGetInfoDoctor = async (doctorId, dispatch) => {
    dispatch(GET_INFO_DOCTOR_START());
    try {
        const res = await axios.get(`http://localhost:8080/admin/get-info-doctor/${doctorId}`,
            {
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_INFO_DOCTOR_SUCCESS(res.data.info));
            return res.data.info;
        }
    } catch (err) {
        dispatch(GET_INFO_DOCTOR_FAILED());
    }
}

export const handleApiCreateSpecialty = async (data, dispatch, setIsOpenAdd, clearModal, handleListenChange) => {
    dispatch(CREATE_SPECIALTY_START());
    try {
        const res = await axios.post("http://localhost:8080/admin/create-new-specialty", data,
            {
                "withCredentials": true
            });
        if (res.data.errCode === 0) {
            dispatch(CREATE_SPECIALTY_SUCCESS(res.data.data));
            toast.success(res.data.message);
            clearModal();
            handleListenChange();
            setIsOpenAdd(false);
        }
    } catch (err) {
        dispatch(CREATE_SPECIALTY_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiGetListSpecialty = async (dispatch, setListSpecialty) => {
    dispatch(GET_SPECIALTY_START());
    try {
        const res = await axios.get(`http://localhost:8080/admin/get-list-specialty`,
            {
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_SPECIALTY_SUCCESS(res.data.data));
            setListSpecialty(res.data.data);
        }
    } catch (err) {
        dispatch(GET_SPECIALTY_FAILED());
    }
}

export const handleApiEditSpecialty = async (id, data, dispatch, handleListenChange, setIsOpenEdit) => {
    dispatch(EDIT_SPECIALTY_START());
    try {
        const res = await axios.patch(`http://localhost:8080/admin/edit-specialty/${id}`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            dispatch(EDIT_SPECIALTY_SUCCESS(res.data.data));
            toast.success(res.data.message);
            handleListenChange();
            setIsOpenEdit();
        }
    } catch (err) {
        dispatch(EDIT_SPECIALTY_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiDeleteSpecialty = async (id, dispatch, handleListenChange, setIsOpenDelete) => {
    dispatch(DELETE_SPECIALTY_START());
    try {
        const res = await axios.delete(`http://localhost:8080/admin/delete-specialty/${id}`,
            {
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            dispatch(DELETE_SPECIALTY_SUCCESS());
            toast.success(res.data.message);
            handleListenChange();
            setIsOpenDelete(false);
        }
    } catch (err) {
        dispatch(DELETE_SPECIALTY_FAILED());
        toast.error(err.response.data.message);
    }
}