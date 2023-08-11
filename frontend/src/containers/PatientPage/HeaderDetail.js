import "./HeaderDetail.scss";
import { ImArrowRight } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import LeftMenu from "../HomePage/LeftMenu";
import { useDispatch } from "react-redux";
import { OPEN_MENU } from "../../store/slice/commonSlice";
import { useNavigate } from "react-router-dom";

const HeaderDetail = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { title } = props;
    return (
        <div className="header-detail-container">
            <div className="header-detail-container">
                <div className="left-content">
                    <div
                        className="header-bar"
                        onClick={() => dispatch(OPEN_MENU())}
                    >
                        <FaBars />
                    </div>
                    <div className="title-detail">{title}</div>
                </div>
                <div className="icon-back" onClick={() => navigate(-1)}>
                    <ImArrowRight />
                </div>
                <LeftMenu />
            </div>
        </div>
    )
}

export default HeaderDetail;