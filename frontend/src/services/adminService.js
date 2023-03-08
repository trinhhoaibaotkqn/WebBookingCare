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