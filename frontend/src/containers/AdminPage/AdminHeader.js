import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE } from "../../store/slice/commonSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./AdminHome.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonUtils from "../../utils/CommonUtils";
import { handleApiLogOut } from "../../services/authService";

const AdminHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = useSelector((state) => state.common.language);
    const user = useSelector(state => state.auth.login.currentUser);
    let avatarUser = CommonUtils.getPreviewImgfromDatabase(user?.image);

    const [isOpenDropDown, setIsOpenDropDown] = useState(false);

    const handleChangeLanguage = (lang) => {
        dispatch(CHANGE_LANGUAGE(lang));
    }

    const handleClickBtnDropdown = () => {
        setIsOpenDropDown(!isOpenDropDown);
    }

    const handleClickLogOut = () => {
        handleApiLogOut(user, user.id, dispatch, navigate);
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
                        <img className="avatar" src={avatarUser} alt="avatar"></img>
                        <div className="icon-dropdown" onClick={() => handleClickBtnDropdown()}>
                            <RiArrowDropDownLine />
                        </div>
                        {
                            isOpenDropDown ?

                                <div className="dropdown-user">
                                    <div className="dropdown-user-item">Xin chào {user?.name}</div>
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

export default AdminHeader;