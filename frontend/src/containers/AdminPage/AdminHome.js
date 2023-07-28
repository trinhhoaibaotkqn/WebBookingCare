import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { handleApiGetCodeFromDB } from "../../services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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