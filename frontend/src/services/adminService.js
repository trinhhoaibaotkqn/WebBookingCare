import {
    GET_INFO_DOCTOR_FAILED,
    GET_INFO_DOCTOR_START,
    GET_INFO_DOCTOR_SUCCESS,
    GET_SPECIALTY_START,
    GET_SPECIALTY_SUCCESS,
    GET_SPECIALTY_FAILED,
    GET_FACILITY_START,
    GET_FACILITY_SUCCESS,
    GET_FACILITY_FAILED,
    GET_ROLE_SUCCESS,
    GET_ADMIN_START,
    GET_DOCTOR_START,
    GET_PATIENT_START,
    GET_ADMIN_SUCCESS,
    GET_DOCTOR_SUCCESS,
    GET_PATIENT_SUCCESS,
    GET_ADMIN_FAILED,
    GET_DOCTOR_FAILED,
    GET_PATIENT_FAILED,
    GET_CODE_START,
    GET_CODE_FAILED,
    GET_GENDER_SUCCESS,
    GET_POSITION_SUCCESS,
    GET_LIST_NAME_FACILITY_START,
    GET_LIST_NAME_FACILITY_SUCCESS,
    GET_LIST_NAME_FACILITY_FAILED,
    GET_LIST_NAME_SPECIALTY_START,
    GET_LIST_NAME_SPECIALTY_SUCCESS,
    GET_LIST_NAME_SPECIALTY_FAILED,
    CLEAN_INFO_DOCTOR,
    CREATE_FACILITY_SUCCESS,
    EDIT_FACILITY_SUCCESS,
    DELETE_FACILITY_SUCCESS,
    CREATE_SPECIALTY_SUCCESS,
    EDIT_SPECIALTY_SUCCESS,
    DELETE_SPECIALTY_SUCCESS
} from "../store/slice/adminSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAxiosJWT } from "./authService";

export const handleApiGetCodeFromDB = async (dispatch, user, type) => {
    dispatch(GET_CODE_START());
    try {
        console.log(">>>>>call api code", type);
        let axiosJWT = createAxiosJWT(user, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-code/${type}`,
            {
                headers: { token: `Bearer ${user.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            switch (type) {
                case "ROLE":
                    dispatch(GET_ROLE_SUCCESS(res.data.data));
                    break;
                case "GENDER":
                    dispatch(GET_GENDER_SUCCESS(res.data.data));
                    break;
                case "POSITION":
                    dispatch(GET_POSITION_SUCCESS(res.data.data));
                    break;
                default:
            }
        }
    } catch (err) {
        dispatch(GET_CODE_FAILED());
    }
}

export const handleApiGetListUsers = async (keyRole, dispatch, user, setData) => {
    switch (keyRole) {
        case "R1":
            dispatch(GET_ADMIN_START());
            break;
        case "R2":
            dispatch(GET_DOCTOR_START());
            break;
        case "R3":
            dispatch(GET_PATIENT_START());
            break;
        default:
    }
    try {
        console.log(">>>>>>call api get list users");
        let axiosJWT = createAxiosJWT(user, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-user/${keyRole}`,
            {
                headers: { token: `Bearer ${user.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            setData(res.data.data);
            switch (keyRole) {
                case "R1":
                    dispatch(GET_ADMIN_SUCCESS(res.data.data));
                    break;
                case "R2":
                    dispatch(GET_DOCTOR_SUCCESS(res.data.data));
                    break;
                case "R3":
                    dispatch(GET_PATIENT_SUCCESS(res.data.data));
                    break;
                default:
            }
        }
    } catch (err) {
        switch (keyRole) {
            case "R1":
                dispatch(GET_ADMIN_FAILED());
                break;
            case "R2":
                dispatch(GET_DOCTOR_FAILED())
                break;
            case "R3":
                dispatch(GET_PATIENT_FAILED())
                break;
            default:
        }
    }
}

export const handleApiCreateUser = async (user, dispatch, handleListenChange, handleModalAdd, clearModal, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.post("http://localhost:8080/admin/create-new-user", user,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data.errCode === 0) {
            toast.success(res.data.message);
            handleListenChange();
            clearModal();
            handleModalAdd();
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiEditUser = async (id, user, dispatch, handleListenChange, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.patch(`http://localhost:8080/admin/edit-user/${id}`, user,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            toast.success(res.data.message);
            handleListenChange();
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiDeleteUser = async (id, dispatch, handleListenChange, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.delete(`http://localhost:8080/admin/delete-user/${id}`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data.errCode === 0) {
            toast.success(res.data.message);
            handleListenChange();
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiGetListNameFacility = async (dispatch, userLogin) => {
    dispatch(GET_LIST_NAME_FACILITY_START());
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-list-name-clinic`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_LIST_NAME_FACILITY_SUCCESS(res.data.data));
            return res.data.data;
        }
    } catch (err) {
        dispatch(GET_LIST_NAME_FACILITY_FAILED());
    }
}

export const handleApiGetListNameSpecialty = async (dispatch, userLogin) => {
    dispatch(GET_LIST_NAME_SPECIALTY_START());
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-list-name-specialty`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_LIST_NAME_SPECIALTY_SUCCESS(res.data.data));
            return res.data.data;
        }
    } catch (err) {
        dispatch(GET_LIST_NAME_SPECIALTY_FAILED());
    }
}

export const handleApiSaveInfoDoctor = async (data, dispatch, navigate, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.post(`http://localhost:8080/admin/save-info-doctor`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(CLEAN_INFO_DOCTOR())
            navigate("/system/admin/user");
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiGetInfoDoctor = async (doctorId, dispatch, userLogin) => {
    dispatch(GET_INFO_DOCTOR_START());
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-info-doctor/${doctorId}`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_INFO_DOCTOR_SUCCESS(res.data.data));
            return res.data.data;
        }
    } catch (err) {
        dispatch(GET_INFO_DOCTOR_FAILED());
    }
}

//--------------------------SPECIALTY-----------------------------
export const handleApiCreateSpecialty = async (data, dispatch, setIsOpenAdd, clearModal, handleListenChange, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.post("http://localhost:8080/admin/create-new-specialty", data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(CREATE_SPECIALTY_SUCCESS(res.data.data));
            clearModal();
            handleListenChange();
            setIsOpenAdd(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiGetListSpecialty = async (dispatch, setListSpecialty, userLogin) => {
    dispatch(GET_SPECIALTY_START());
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-list-specialty`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
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

export const handleApiEditSpecialty = async (id, data, dispatch, handleListenChange, setIsOpenEdit, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.patch(`http://localhost:8080/admin/edit-specialty/${id}`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(EDIT_SPECIALTY_SUCCESS(res.data.data));
            handleListenChange();
            setIsOpenEdit();
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiDeleteSpecialty = async (id, dispatch, handleListenChange, setIsOpenDelete, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.delete(`http://localhost:8080/admin/delete-specialty/${id}`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(DELETE_SPECIALTY_SUCCESS(id));
            handleListenChange();
            setIsOpenDelete(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

//--------------------------FACILITY------------------------------------
export const handleApiCreateFacility = async (data, dispatch, setIsOpenAdd, clearModal, handleListenChange, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.post("http://localhost:8080/admin/create-new-clinic", data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            clearModal();
            dispatch(CREATE_FACILITY_SUCCESS(res.data.data))
            handleListenChange();
            setIsOpenAdd(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiGetListFacility = async (dispatch, setListFacility, userLogin) => {
    dispatch(GET_FACILITY_START());
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.get(`http://localhost:8080/admin/get-list-clinic`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            });
        if (res.data && res.data.errCode === 0) {
            dispatch(GET_FACILITY_SUCCESS(res.data.data));
            setListFacility(res.data.data);
        }
    } catch (err) {
        dispatch(GET_FACILITY_FAILED());
    }
}

export const handleApiEditFacility = async (id, data, dispatch, handleListenChange, setIsOpenEdit, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.patch(`http://localhost:8080/admin/edit-clinic/${id}`, data,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(EDIT_FACILITY_SUCCESS(res.data.data));
            handleListenChange();
            setIsOpenEdit();
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const handleApiDeleteFacility = async (id, dispatch, handleListenChange, setIsOpenDelete, userLogin) => {
    try {
        let axiosJWT = createAxiosJWT(userLogin, dispatch);
        const res = await axiosJWT.delete(`http://localhost:8080/admin/delete-clinic/${id}`,
            {
                headers: { token: `Bearer ${userLogin.accessToken}` },
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(DELETE_FACILITY_SUCCESS(id));
            handleListenChange();
            setIsOpenDelete(false);
        }
    } catch (err) {
        toast.error(err.response.data.message);
    }
}