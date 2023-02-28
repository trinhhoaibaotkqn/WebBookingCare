import axios from "axios";
import jwtDecode from "jwt-decode";
import {
    LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS,
    LOGOUT_FAILED, LOGOUT_START, LOGOUT_SUCCESS,
    REGISTER_FAILED, REGISTER_START, REGISTER_SUCCESS,
    REFRESH_TOKEN
} from "../store/slice/authSlice";

export const handleApiRegister = async (user, toast, dispatch, navigate) => {
    dispatch(REGISTER_START());
    try {
        const res = await axios.post("http://localhost:8080/auth/register", user);
        if (res.data.errCode === 0) {
            dispatch(REGISTER_SUCCESS());
            toast.success(res.data.message);
            navigate("/login");
        }
    } catch (err) {
        dispatch(REGISTER_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiLogin = async (user, toast, dispatch, navigate) => {
    dispatch(LOGIN_START());
    try {
        const res = await axios.post("http://localhost:8080/auth/login", user,
            {
                "withCredentials": true
            });
        if (res.data.errCode === 0) {
            dispatch(LOGIN_SUCCESS(res.data.user));
            toast.success(res.data.message);
            navigate("/");
        }
    } catch (err) {
        dispatch(LOGIN_FAILED());
        toast.error(err.response.data.message);
    }
}

export const handleApiLogOut = async (user, id, dispatch, navigate,) => {
    dispatch(LOGOUT_START());
    let axiosJWT = createAxiosJWT(user, dispatch);
    try {
        await axiosJWT.post("http://localhost:8080/auth/logout", id, {
            headers: { token: `Bearer ${user.accessToken}` },
            "withCredentials": true,
        });
        dispatch(LOGOUT_SUCCESS());
        navigate("/");
    } catch (err) {
        dispatch(LOGOUT_FAILED());
    }
}

const createAxiosJWT = (user, dispatch) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            const date = new Date();
            const tokenDecoded = jwtDecode(user?.accessToken);

            if (tokenDecoded.exp < date.getTime() / 1000) {
                try {
                    const res = await axios.post("http://localhost:8080/auth/refresh-token", 1, { withCredentials: true });
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