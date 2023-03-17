import { useEffect, useState } from 'react';
import { ImCalendar } from 'react-icons/im';
import "./ScheduleDoctor.scss";
import moment from "moment";
import 'moment/locale/vi';
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../../../utils/Constants";
import axios from "axios";
import {
    GET_DOCTOR_INFO_FAILED,
    GET_DOCTOR_INFO_START,
    GET_DOCTOR_INFO_SUSSCESS,
    GET_SCHEDULE_DOCTOR_FAILED,
    GET_SCHEDULE_DOCTOR_START, GET_SCHEDULE_DOCTOR_SUSSCESS
} from "../../../store/slice/userSlice";
import CommonUtils from '../../../utils/CommonUtils';

const ScheduleDoctor = (props) => {
    let { doctor } = props;
    const dispatch = useDispatch();
    const language = useSelector(state => state.common.language);
    const [isShowMorePrice, setIsShowMorePrice] = useState(false);

    const [selectedDay, setSelectedDay] = useState();
    const [listDays, setListDays] = useState([]);
    const [listTime, setListTime] = useState([]);
    const [info, setInfo] = useState();

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
    }, [selectedDay, doctor, dispatch, listDays]);

    useEffect(() => {
        const handleApiGetScheduleByDay = async () => {
            dispatch(GET_DOCTOR_INFO_START());
            try {
                console.log(">>>>>call api info doctor");
                const res = await axios.get(`http://localhost:8080/user/get-doctor-info-price-address-clinic/${doctor.id}`);
                if (res.data && res.data.errCode === 0) {
                    dispatch(GET_DOCTOR_INFO_SUSSCESS(res.data.data));
                    setInfo(res.data.data);
                }
            } catch (err) {
                dispatch(GET_DOCTOR_INFO_FAILED());
            }
        }

        handleApiGetScheduleByDay();
    }, [dispatch, doctor])

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
                            <div style={{ gridColumn: "1/5" }}>Không có lịch hẹn nào, vui lòng chọn những ngày khác</div>
                        }
                    </div>
                    <div className="more-info-booking">
                        {info ?
                            <>
                                <div className="adrress-clinic-container">
                                    <div className="title-clinic">ĐỊA CHỈ KHÁM</div>
                                    <div className="name-clinic">{info.nameClinic}</div>
                                    <div className="address-clinic">
                                        {info.addressClinic}, {language === languages.EN ? info.provinceData.valueEn : info.provinceData.valueVi}
                                    </div>
                                </div>
                                <div className="price-container">
                                    {!isShowMorePrice ?
                                        <div className='price-content-common'>
                                            <div className='label-price'>GIÁ KHÁM: </div>
                                            <div className='price'>
                                                {language === languages.EN ? `${info.priceData.valueEn}$.` : `${info.priceData.valueVi}đ.`}
                                            </div>
                                            <div className='hide-detail' onClick={() => setIsShowMorePrice(true)}>Xem chi tiết</div>
                                        </div>
                                        :
                                        <div className='price-content-detail'>
                                            <div className='label-price'>GIÁ KHÁM: </div>
                                            <div className='more-info-price'>
                                                <div className='price-content'>
                                                    <div className='price'>
                                                        <span>GIÁ KHÁM</span>
                                                        <span>
                                                            {language === languages.EN ? `${info.priceData.valueEn}$` : `${info.priceData.valueVi}đ`}
                                                        </span>
                                                    </div>
                                                    <div className='note'>{info.note}</div>
                                                </div>
                                                <div className='method-payment'>
                                                    {
                                                        language === languages.EN ?
                                                            `The patient can pay the cost in the form of: ${info.paymentData.valueEn}`
                                                            :
                                                            `Người bệnh có thể thanh toán chi phí bằng hình thức: ${info.paymentData.valueVi}`
                                                    }
                                                </div>
                                            </div>
                                            <div className='hide-detail' onClick={() => setIsShowMorePrice(false)}>Ẩn bảng giá</div>
                                        </div>
                                    }
                                </div>
                            </>
                            :
                            <></>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleDoctor;