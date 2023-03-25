import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleApiConfirmAppointment } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import LeftMenu from "../../HomePage/LeftMenu";
import "./ConfirmBooking.scss";
import LanguageUtils from "../../../utils/LanguageUtil";

const ConfirmBooking = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [errCode, setErrCode] = useState();
    // const [message, setMessage] = useState();

    const language = useSelector(state => state.common.language);

    useEffect(() => {
        console.log(">>>>Call api confirm booking");
        const data = {
            doctorId: searchParams.get("nonce"),
            token: searchParams.get("token")
        }
        handleApiConfirmAppointment(data, dispatch, setErrCode);
    }, [setErrCode, dispatch, searchParams])
    return (
        <div>
            <HomeHeader />
            <div className="title-confirm-booking" style={errCode === 0 ? { color: "#07bc0c" } : { color: "#e74c3c" }}>
                {LanguageUtils.getMessageByKey(`confirmBooking.errCode${errCode}`, language)}
            </div>
            < LeftMenu />
        </div>
    )
}

export default ConfirmBooking;