import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE } from "../../store/slice/commonSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./AdminHome.scss"
import { NavLink } from "react-router-dom";
import urlImage from "../../assets/images/avatar.jpg";

const AdminHeader = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.common.language);

    const handleChangeLanguage = (lang) => {
        dispatch(CHANGE_LANGUAGE(lang));
    }

    return (
        <div className="admin-header-container">
            <div className="admin-header-content">
                <div className="left-content">
                    <div className="header-logo"></div>
                </div>

                <div className="center-content">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/admin/user"
                    >
                        <div className="title">User</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/admin/facility"
                    >
                        <div className="title">Facility</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/admin/specialty"
                    >
                        <div className="title">Specialty</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "child-center-content active" : "child-center-content"
                        }
                        to="/system/admin/handbook"
                    >
                        <div className="title">Handbook</div>
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

export default AdminHeader;