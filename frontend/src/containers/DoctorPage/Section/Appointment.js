import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import vi from 'date-fns/locale/vi';
import { useDispatch, useSelector } from "react-redux";
import { handleApiGetListAppointment } from "../../../services/doctorService";
import { languages } from "../../../utils/Constants";//
import { MdOutlineDone } from "react-icons/md";
import ModalCompleteAppointment from "./ModalCompleteAppointment";
import Loading from "../../../components/Loading";

const Appointment = () => {

    const dispatch = useDispatch();

    const language = useSelector(state => state.common.language);
    const doctor = useSelector(state => state.auth.login.currentUser);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [listAppointment, setListAppointment] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [toggleUpdateData, setToggleUpdateData] = useState(false);
    const [dataComplete, setDataComplete] = useState();
    const [isLoading, setIsLoading] = useState(true);


    const handleClickBtnDone = (item) => {
        setDataComplete(item);
        setIsOpenModal(true);
    }

    useEffect(() => {
        const data = {
            doctorId: doctor.id,
            date: selectedDate
        }
        console.log(">>>>>>call api get list appointment")
        handleApiGetListAppointment(data, dispatch, setListAppointment, doctor, setIsLoading);
    }, [setListAppointment, selectedDate, dispatch, toggleUpdateData]);

    return (
        <div className="doctor-appointment-container">
            <div className="doctor-appointment-content">
                <div className="select-date">
                    <label>Chọn ngày</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        maxDate={new Date().getTime() + 6 * 24 * 60 * 60 * 1000}
                        locale={language === "vi" ? vi : ""}
                        dateFormat="P"
                    />
                </div>
                <div className="table-container">
                    {listAppointment && listAppointment.length > 0 ?
                        <table>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Name Patient</th>
                                    <th>Time</th>
                                    <th>Reason</th>
                                    <th>Phone number</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                                {listAppointment.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.patientData.name}</td>
                                            <td>{language === languages.EN ? item.timeAppointment.valueEn : item.timeAppointment.valueVi}</td>
                                            <td>{item.reason}</td>
                                            <td>{item.patientData.phoneNumber}</td>
                                            <td>{item.patientData.email}</td>
                                            <td>
                                                <button className="btn-done"
                                                    onClick={() => handleClickBtnDone(item)}
                                                >
                                                    Done <span><MdOutlineDone /></span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                        :
                        <div className="no-appointment">Hôm nay không có lịch hẹn nào cả</div>
                    }
                </div>
            </div>
            <ModalCompleteAppointment
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                dataComplete={dataComplete}
                toggleUpdateData={toggleUpdateData}
                setToggleUpdateData={setToggleUpdateData}
            />
            <Loading isLoading={isLoading} />
        </div>
    )
}
export default Appointment;