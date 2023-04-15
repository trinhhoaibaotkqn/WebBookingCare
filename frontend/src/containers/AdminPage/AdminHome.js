import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminHome = () => {
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