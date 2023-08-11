import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { handleApiGetCodeFromDB } from "../../services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CLEAN_ALL_CODE } from "../../store/slice/adminSlice";

const AdminHome = () => {
    const ROLE = "ROLE";
    const GENDER = "GENDER";
    const POSITION = "POSITION";
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.auth.login.currentUser);

    useEffect(() => {
        handleApiGetCodeFromDB(dispatch, userLogin, ROLE);
        handleApiGetCodeFromDB(dispatch, userLogin, GENDER);
        handleApiGetCodeFromDB(dispatch, userLogin, POSITION);

        return () => {
            dispatch(CLEAN_ALL_CODE());
        }
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