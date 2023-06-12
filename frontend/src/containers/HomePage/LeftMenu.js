import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MENU } from "../../store/slice/commonSlice";
import { RxExit } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "./LeftMenu.scss"

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
                        <NavLink className="menu-item" to="/personal-page">Электронная медицинская карта</NavLink>
                        :
                        doctor ?
                            <NavLink className="menu-item" to="/system/doctor/schedule">Управление страницей</NavLink>
                            :
                            admin ?
                                <NavLink className="menu-item" to="/system/admin/user">Управление страницей</NavLink>
                                :
                                <>
                                    <NavLink className="menu-item" to="/login">Đăng nhập</NavLink>
                                    <NavLink className="menu-item" to="/register">Đăng kí</NavLink>
                                </>
                    }
                    <NavLink className="menu-item">Врач</NavLink>
                    <NavLink className="menu-item">Справочник</NavLink>
                    <NavLink className="menu-item">Контакт</NavLink>
                    <NavLink className="menu-item">Вопросы</NavLink>
                    <NavLink className="menu-item">Условия эксплуатации</NavLink>
                    <NavLink className="menu-item">Жаловаться</NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;