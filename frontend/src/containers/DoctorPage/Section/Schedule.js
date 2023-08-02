import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleApiGetSchedule, handleApiSaveSheduleDoctor } from "../../../services/doctorService";

const Schedule = () => {
    const dispatch = useDispatch();
    const listTime = useSelector(state => state.doctor.time.listTime);
    const doctor = useSelector(state => state.auth.login.currentUser);

    const language = useSelector(state => state.common.language);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [listSelectedTime, setListSelectedTime] = useState([]);

    const handleClickBtnSave = async () => {
        const data = {
            doctorId: doctor?.id,
            date: selectedDate,
            listTimeType: listSelectedTime,
        }
        handleApiSaveSheduleDoctor(data, dispatch, doctor);
    }

    const handleClickTimeOption = (time) => {
        if (listSelectedTime.includes(time.key)) {
            let arr = [...listSelectedTime];
            arr = arr.filter(item => {
                return item !== time.key
            })
            setListSelectedTime(arr);
            return;
        }
        if (!listSelectedTime.includes(time.key)) {
            let arr = [...listSelectedTime, time.key];
            setListSelectedTime(arr);
            return;
        }
    }

    registerLocale('vi', vi);

    useEffect(() => {
        handleApiGetSchedule(dispatch, doctor, selectedDate, setListSelectedTime);
    }, [dispatch, selectedDate]);

    return (
        <div className="doctor-schedule-container">
            <div className="doctor-schedule-content">
                <div className="time-content">
                    <div className="select-date">
                        <label>Chọn ngày</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={new Date()}
                            maxDate={new Date().getTime() + 6 * 24 * 60 * 60 * 1000}
                            locale={language === "vi" ? "vi" : ""}
                            dateFormat="P"
                        />
                    </div>
                    <div className="select-time">
                        {listTime && listTime.map((item) => {
                            return (
                                <div key={item.id}
                                    className={listSelectedTime.includes(item.key) ? "time-child active" : "time-child"}
                                    onClick={() => { handleClickTimeOption(item) }}>
                                    {language === "vi" ? item.valueVi : item.valueEn}
                                </div>
                            )
                        })}
                    </div>
                    <div className="btn-save-schedule">
                        <button onClick={() => handleClickBtnSave()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Schedule;