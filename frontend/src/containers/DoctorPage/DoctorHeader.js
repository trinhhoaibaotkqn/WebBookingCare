import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE } from "../../store/slice/commonSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./DoctorHome.scss";
import urlImage from "../../assets/images/avatar.jpg";
import { NavLink } from "react-router-dom";

const DoctorHeader = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.common.language);

    const handleChangeLanguage = (lang) => {
        dispatch(CHANGE_LANGUAGE(lang));
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
                        <img className="avatar" src={urlImage} alt="avatar"></img>
                        <div className="icon-dropdown"><RiArrowDropDownLine /></div>
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