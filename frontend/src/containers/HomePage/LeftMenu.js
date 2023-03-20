import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MENU } from "../../store/slice/commonSlice";
import { RxExit } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "./LeftMenu.scss"

const LeftMenu = () => {
    const dispatch = useDispatch();
    const isOpenMenu = useSelector((state) => state.common.openMenu);
    const user = useSelector((state) => state.auth.login.currentUser);

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
                    {user ?
                        <NavLink className="menu-item" to="/personal-page">Tài khoản cá nhân</NavLink>
                        :
                        <>
                            <NavLink className="menu-item" to="/login">Đăng nhập</NavLink>
                            <NavLink className="menu-item" to="/register">Đăng kí</NavLink>
                        </>
                    }
                    <NavLink className="menu-item">Bác sĩ</NavLink>
                    <NavLink className="menu-item">Cẩm nang</NavLink>
                    <NavLink className="menu-item">Liên hệ</NavLink>
                    <NavLink className="menu-item">Câu hỏi thường gặp</NavLink>
                    <NavLink className="menu-item">Điều khoản sử dụng</NavLink>
                    <NavLink className="menu-item">Khiếu nại</NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;