import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleApiSaveSheduleDoctor } from "../../../services/doctorService";
import axios from "axios";
import {
    GET_LIST_SELECTED_TIME_START, GET_LIST_SELECTED_TIME_SUSSCESS, GET_LIST_SELECTED_TIME_FAILED
} from "../../../store/slice/doctorSlice"

const Schedule = () => {
    const dispatch = useDispatch();
    const listTime = useSelector(state => state.doctor.time.listTime);
    const doctor = {
        id: 20
    }

    const language = useSelector(state => state.common.language);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [listSelectedTime, setListSelectedTime] = useState([]);

    const handleClickBtnSave = async () => {
        const data = {
            doctorId: doctor.id,
            date: selectedDate,
            listTimeType: listSelectedTime,
        }
        console.log(data);
        handleApiSaveSheduleDoctor(data, dispatch);
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
        const handleApiLoadScheduleFromDB = async () => {
            dispatch(GET_LIST_SELECTED_TIME_START());
            try {
                console.log(">>>>>call api schedule");
                const res = await axios.get("http://localhost:8080/doctor/get-schedule",
                    {
                        params: {
                            doctorId: doctor.id,
                            date: selectedDate
                        }
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_LIST_SELECTED_TIME_SUSSCESS(res.data.data));
                    const temp = res.data.data.map(element => {
                        return element.timeType
                    });
                    setListSelectedTime(temp);
                }
            } catch (err) {
                dispatch(GET_LIST_SELECTED_TIME_FAILED());
            }
        }
        handleApiLoadScheduleFromDB();

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