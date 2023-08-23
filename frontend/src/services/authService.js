import axios from "axios";
import jwtDecode from "jwt-decode";
import {
    LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS,
    LOGOUT_FAILED, LOGOUT_START, LOGOUT_SUCCESS,
    REGISTER_FAILED, REGISTER_START, REGISTER_SUCCESS,
    REFRESH_TOKEN
} from "../store/slice/authSlice";

export const handleApiRegister = async (user, toast, dispatch, navigate, doctor, setIsLoading) => {
    setIsLoading(true);
    dispatch(REGISTER_START());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, user);
        if (res.data && res.data.errCode === 0) {
            dispatch(REGISTER_SUCCESS());
            toast.success(res.data.message);
            if (!doctor) {
                navigate(`/login`);
            } else {
                return true;
            }
            setIsLoading(false);
        }
    } catch (err) {
        setIsLoading(false);
        dispatch(REGISTER_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiLoginUser = async (user, toast, dispatch) => {
    dispatch(LOGIN_START());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, user,
            {
                "withCredentials": true
            });
        if (res.data.errCode === 0) {
            toast.success(res.data.message);
            dispatch(LOGIN_SUCCESS(res.data.user));
            return res.data.user;
        }
    } catch (err) {
        dispatch(LOGIN_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiLogOut = async (user, id, dispatch, navigate, setIsLoading) => {
    dispatch(LOGOUT_START());
    let axiosJWT = createAxiosJWT(user, dispatch);
    try {
        await axiosJWT.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, id, {
            headers: { token: `Bearer ${user.accessToken}` },
            "withCredentials": true,
        });
        dispatch(LOGOUT_SUCCESS());
        navigate("/");
        setIsLoading(false);
    } catch (err) {
        dispatch(LOGOUT_FAILED());
    }
}

export const createAxiosJWT = (user, dispatch) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            const date = new Date();
            const tokenDecoded = jwtDecode(user?.accessToken);

            if (tokenDecoded.exp < date.getTime() / 1000) {
                try {
                    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh-token`, 1, { "withCredentials": true });
                    var dataToken = res.data;
                } catch (err) {
                    console.log(err);
                }
                const refreshUser = { ...user, accessToken: dataToken.accessToken };
                dispatch(REFRESH_TOKEN(refreshUser));
                config.headers["token"] = "Bearer " + dataToken.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
}

export const checkValidDataRegister = (user, toast) => {
    if (!user.name || !user.email || !user.password || !user.phoneNumber) {
        toast.error("Some fields are empty!");
        return false;
    }
    if (user.password !== user.passwordConfirm) {
        toast.error("Passwords does not match!");
        return false;
    }
    if (user.password === user.passwordConfirm) {
        return true;
    }
}

export const navigateUserAfterLogin = (doctor, user, navigate) => {
    if (user.roleid === "R1") {
        navigate('/system/admin/user');
    }
    if (user.roleid === "R2") {
        navigate('/system/doctor/schedule');
    }
    if (doctor) {
        if (user.roleid === "R3") {
            navigate(`/detail-doctor/${doctor.name}`, {
                state: {
                    doctor: doctor,
                }
            })
        }
    } else {
        if (user.roleid === "R3") {
            navigate('/')
        }
    }
}