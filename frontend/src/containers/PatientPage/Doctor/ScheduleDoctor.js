import { useEffect, useState } from 'react';
import { ImCalendar } from 'react-icons/im';
import "./ScheduleDoctor.scss";
import moment from "moment";
import 'moment/locale/vi';
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../../../utils/Constants";
import axios from "axios";
import {
    GET_SCHEDULE_DOCTOR_FAILED,
    GET_SCHEDULE_DOCTOR_START, GET_SCHEDULE_DOCTOR_SUSSCESS
} from "../../../store/slice/userSlice";
import CommonUtils from '../../../utils/CommonUtils';

const ScheduleDoctor = (props) => {
    let { doctor } = props;
    const dispatch = useDispatch();
    const language = useSelector(state => state.common.language);

    const [selectedDay, setSelectedDay] = useState();
    const [listDays, setListDays] = useState([]);
    const [listTime, setListTime] = useState([]);

    useEffect(() => {
        console.log("render list day")
        let arr = []
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === languages.EN) {
                obj.label = moment(new Date()).add(i, 'days').locale("en").format('ddd - DD/MM');
            } else {
                let label = moment(new Date()).add(i, 'days').locale("vi").format('dddd - DD/MM');
                obj.label = CommonUtils.capitalizeFirstLetter(label);
            }
            obj.value = moment(new Date()).add(i, 'days').locale("vi").format('dd');
            obj.date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
            arr.push(obj);
        }
        setListDays(arr);
        setSelectedDay(arr[0].value);
    }, [language])

    useEffect(() => {

        const handleApiGetScheduleByDay = async (data) => {
            dispatch(GET_SCHEDULE_DOCTOR_START());
            try {
                console.log(">>>>>call api schedule doctor");
                const res = await axios.get("http://localhost:8080/user/get-schedule-doctor",
                    {
                        params: data
                    });
                if (res.data && res.data.errCode === 0) {
                    dispatch(GET_SCHEDULE_DOCTOR_SUSSCESS(res.data.data));
                    setListTime(res.data.data);
                }
            } catch (err) {
                dispatch(GET_SCHEDULE_DOCTOR_FAILED());
                setListTime([]);
            }
        }

        if (listDays && listDays.length > 0) {
            const date = listDays.find(item => {
                return item.value === selectedDay;
            }).date;

            const data = {
                date: date,
                doctorId: doctor.id
            }
            handleApiGetScheduleByDay(data);
        }
    }, [selectedDay, doctor, dispatch, listDays])

    return (
        <div className="schedule-container">
            <div className="schedule-content">
                <div className="schedule-content-up">
                    <div className="date">
                        <select onChange={(e) => setSelectedDay(e.target.value)}>
                            {listDays && listDays.length > 0 && listDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="icon-schedule"><ImCalendar /> schedule</div>
                </div>
                <div className="schedule-content-down">
                    <div className="time-option">
                        {listTime && listTime.length > 0 ? listTime.map((item, index) => {
                            return (
                                <div key={index} className="child-time-option">
                                    {language === languages.EN ? item.timeData.valueEn : item.timeData.valueVi}
                                </div>
                            )
                        })
                            :
                            <div>Không có lịch hẹn nào</div>
                        }
                    </div>
                    <div className="more-info-booking">
                        <div className="adrress-clinic-container">
                            <div className="title-clinic">ĐỊA CHỈ KHÁM</div>
                            <div className="name-clinic">Phòng khám Chuyên khoa Yên Hòa</div>
                            <div className="address-clinic">số 11 i4, ngõ 37 Trần Kim Xuyến, khu Đô Thị Mới Yên Hoà, Yên Hoà, Cầu Giấy, Hà Nội</div>
                        </div>
                        <div className="price">GIÁ KHÁM: 300.000đ - 360.000đ. Xem chi tiết</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleDoctor;