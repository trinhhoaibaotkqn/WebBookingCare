import { FaPlusCircle } from "react-icons/fa";
import { BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import DescriptionDoctor from "./DescriptionDoctor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { handleApiBookAppointment } from "../../../services/userService";
import { languages } from "../../../utils/Constants";

const BookingModal = (props) => {
    let { doctor, isShow, setIsShow, timeSelected, setToggleBooked, toggleBooked } = props;

    const dispatch = useDispatch()
    const navigate = useNavigate();
    let user = useSelector(state => state.auth.login.currentUser);
    let doctorInfo = useSelector(state => state.user.doctorInfo.infoAdressPriceNameClinic)
    const language = useSelector(state => state.common.language);

    const [name, setName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [reason, setReason] = useState();


    const handleClickConfirmBtn = () => {
        if (!user) {
            toast.warning("You need to login first")
            navigate("/login", { state: { doctor: doctor } })
        } else {
            if (!name || !phoneNumber || !reason) {
                toast.error("Some required fiels are empty");
            } else {
                const dataBooking = {
                    patientId: user.id,
                    patientEmail: user.email,
                    doctorId: doctor.id,
                    doctorName: doctor.name,
                    date: timeSelected.date,
                    timeData: language === languages.VI ? timeSelected.timeData.valueVi : timeSelected.timeData.valueEn,
                    timeType: timeSelected.timeType,
                    name,
                    phoneNumber,
                    reason,
                    language,
                    doctorInfo
                }
                console.log(dataBooking);
                handleApiBookAppointment(dataBooking, dispatch, setIsShow, setToggleBooked, toggleBooked, setReason)
            }
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhoneNumber(user.phoneNumber);
        }
    }, [user])

    return (
        <div style={isShow ? { display: "block" } : { display: "none" }} className="modal-booking-container">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => setIsShow(false)}>&times;</span>
                </div>
                <div className="modal-body">
                    <DescriptionDoctor
                        doctor={doctor}
                        size={"small"}
                        timeSelected={timeSelected}
                    />
                    <div className="price">
                        <div>Giá khám</div>
                        <div>300.000đ</div>
                    </div>
                    <div className="title-body">Thông tin người đặt lịch. Vui lòng điền đầy đủ và kiểm tra lại</div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsFillPersonFill /></span>
                        <input type="text"
                            placeholder="Họ tên bệnh nhân"
                            defaultValue={name ? name : ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsTelephoneFill /></span>
                        <input type="text"
                            placeholder="Phone number"
                            defaultValue={phoneNumber ? phoneNumber : ""}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><FaPlusCircle /></span>
                        <input type="text"
                            placeholder="Lí do khám"
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div className="modal-element">
                        <button className="add-btn" onClick={() => handleClickConfirmBtn()}>xác nhận đặt khám</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingModal;