import "./PatientHome.scss";
import { MdPermDeviceInformation, MdManageAccounts } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { ImHome } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleApiLogOut } from "../../../services/authService";

const PatientHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);
    const handleLogOut = () => {
        handleApiLogOut(user, user.id, dispatch, navigate);
    }

    return (
        <div className="patient-container">
            <div className="patient-background">
                <div className="patient-content">
                    <NavLink className="home-btn" to="/"><ImHome /></NavLink>
                    <div className="patient-menu">
                        <div className="menu-item">Account</div>
                        <div className="menu-item"><MdPermDeviceInformation /> Personal info</div>
                        <div className="menu-item active"><MdManageAccounts /> Login and password</div>
                        <div className="menu-item"><AiOutlineSchedule /> Schedule</div>
                        <div className="menu-item" onClick={() => handleLogOut()}>
                            <RiLogoutCircleRLine /> Log Out
                        </div>
                    </div>
                    <div className="patient-page">
                        {user ?
                            <>
                                <div>Tên: {user.name}</div>
                                <div>Email: {user.email}</div>
                                <div>Giới tính: {user.gender === "M" ? "Nam" : (user.gender === "F" ? "Nữ" : "Khác")}</div>
                                <div>Địa chỉ: {user.address}</div>
                                <div>Số điện thoại: {user.phoneNumber}</div>
                            </>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientHome;