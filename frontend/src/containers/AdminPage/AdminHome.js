import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import {
    GET_ROLE_START, GET_ROLE_SUCCESS, GET_ROLE_FAILED
} from "../../store/slice/adminSlice"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const AdminHome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLoadRoleFromDB = async () => {
            dispatch(GET_ROLE_START());
            try {
                console.log(">>>>>call api role");
                const res = await axios.get("http://localhost:8080/admin/get-role",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_ROLE_SUCCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_ROLE_FAILED());
            }
        }
        handleLoadRoleFromDB();
    }, [dispatch]);

    return (
        <div>
            <AdminHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminHome;