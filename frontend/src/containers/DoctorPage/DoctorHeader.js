import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE } from "../../store/slice/commonSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./DoctorHome.scss"
import { useNavigate } from "react-router-dom";
import urlImage from "../../assets/images/avatar.jpg";

const DoctorHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                    <div className="child-center-content active">
                        <div className="title" onClick={() => navigate("/system/doctor/schedule")}>Schedule</div>
                    </div>
                    <div className="child-center-content">
                        <div className="title" onClick={() => navigate("/system/doctor/facility")}>Facility</div>
                    </div>
                    <div className="child-center-content">
                        <div className="title">Specialty</div>
                    </div>
                    <div className="child-center-content">
                        <div className="title">Handbook</div>
                    </div>
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