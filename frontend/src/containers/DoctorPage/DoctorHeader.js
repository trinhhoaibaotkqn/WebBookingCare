import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE } from "../../store/slice/commonSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./DoctorHome.scss";
import { NavLink, useNavigate } from "react-router-dom";
import CommonUtils from "../../utils/CommonUtils";
import { useState } from "react";
import { handleApiLogOut } from "../../services/authService";

const DoctorHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = useSelector((state) => state.common.language);
    const doctor = useSelector(state => state.auth.login.currentUser);
    let avatarDoctor = CommonUtils.getPreviewImgfromDatabase(doctor?.image);

    const [isOpenDropDown, setIsOpenDropDown] = useState(false);

    const handleChangeLanguage = (lang) => {
        dispatch(CHANGE_LANGUAGE(lang));
    }

    const handleClickBtnDropdown = () => {
        setIsOpenDropDown(!isOpenDropDown);
    }

    const handleClickLogOut = () => {
        handleApiLogOut(doctor, doctor.id, dispatch, navigate);
    }

    return (
        <div className="doctor-header-container">
            <div className="doctor-header-content">
                <div className="left-content">
                    <div className="header-logo"></div>
                </div>

                <div className="center-content">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/doctor/schedule"
                    >
                        <div className="title">Schedule</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/doctor/info-checkup"
                    >
                        <div className="title">Info Checkup</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/doctor/appointment"
                    >
                        <div className="title">Appointment</div>
                    </NavLink>
                </div>

                <div className="right-content">
                    <div className="avatar-container">
                        <img className="avatar" src={avatarDoctor} alt="avatar"></img>
                        <div className="icon-dropdown" onClick={() => handleClickBtnDropdown()}>
                            <RiArrowDropDownLine />
                        </div>
                        {
                            isOpenDropDown ?
                                <div className="dropdown-user">
                                    <div className="dropdown-user-item">Xin chào {doctor?.name}</div>
                                    <div className="dropdown-user-item" onClick={() => handleClickLogOut()}>Log out</div>
                                </div>
                                :
                                <></>
                        }
                    </div>
                    <div className="language">
                        {language && language === "vi" ?
                            <div
                                className="language-vi"
                                onClick={() => handleChangeLanguage("en")}
                            >VN</div>
                            :
                            <div
                                className="language-en"
                                onClick={() => handleChangeLanguage("vi")}
                            >EN</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorHeader;