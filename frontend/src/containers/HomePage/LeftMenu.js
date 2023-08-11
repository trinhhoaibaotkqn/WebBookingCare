import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MENU } from "../../store/slice/commonSlice";
import { RxExit } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "./LeftMenu.scss";
import { FormattedMessage } from "react-intl";

const LeftMenu = () => {
    const dispatch = useDispatch();
    const isOpenMenu = useSelector((state) => state.common.openMenu);
    const user = useSelector((state) => state.auth.login.currentUser);
    let patient = user?.roleid === "R3" ? true : false;
    let doctor = user?.roleid === "R2" ? true : false;
    let admin = user?.roleid === "R1" ? true : false;

    const preventParent = (e) => {
        e.stopPropagation();
    }

    const handleCloseMenu = () => {
        dispatch(CLOSE_MENU());
    }
    return (
        <div
            className={isOpenMenu && isOpenMenu ? "left-menu-container menu-open" : "left-menu-container menu-close"}
            onClick={() => handleCloseMenu()}
        >
            <div className="left-menu-content" onClick={(e) => preventParent(e)}>
                <div
                    className="icon-exit"
                    onClick={() => handleCloseMenu()}
                >
                    <RxExit />
                </div>
                <div className="item-container">
                    {patient ?
                        <NavLink className="menu-item" to="/personal-page"><FormattedMessage id="leftMenu.optionPatient" /></NavLink>
                        :
                        doctor ?
                            <NavLink className="menu-item" to="/system/doctor/schedule"><FormattedMessage id="leftMenu.optionDoctorAdmin" /></NavLink>
                            :
                            admin ?
                                <NavLink className="menu-item" to="/system/admin/user"><FormattedMessage id="leftMenu.optionDoctorAdmin" /></NavLink>
                                :
                                <>
                                    <NavLink className="menu-item" to="/login"><FormattedMessage id="leftMenu.option1" /></NavLink>
                                    <NavLink className="menu-item" to="/register"><FormattedMessage id="leftMenu.option2" /></NavLink>
                                </>
                    }
                    <NavLink className="menu-item"><FormattedMessage id="leftMenu.option3" /></NavLink>
                    <NavLink className="menu-item"><FormattedMessage id="leftMenu.option4" /></NavLink>
                    <NavLink className="menu-item"><FormattedMessage id="leftMenu.option5" /></NavLink>
                    <NavLink className="menu-item"><FormattedMessage id="leftMenu.option6" /></NavLink>
                    <NavLink className="menu-item"><FormattedMessage id="leftMenu.option7" /></NavLink>
                    <NavLink className="menu-item"><FormattedMessage id="leftMenu.option8" /></NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;