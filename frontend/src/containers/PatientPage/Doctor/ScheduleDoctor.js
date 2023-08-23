import { useEffect, useState } from 'react';
import { ImCalendar } from 'react-icons/im';
import "./ScheduleDoctor.scss";
import moment from "moment";
import 'moment/locale/vi';
import { useSelector } from "react-redux";
import { languages } from "../../../utils/Constants";
import CommonUtils from '../../../utils/CommonUtils';
import { FormattedMessage } from "react-intl";
import { handleApiGetScheduleByDay } from '../../../services/userService';
import ScheduleItem from './ScheduleItem';
import Skeleton from 'react-loading-skeleton';

const ScheduleDoctor = (props) => {
    let { doctor, setTimeSelected, setIsShow, toggleBooked, componentSpecialty } = props;
    const language = useSelector(state => state.common.language);
    const [isShowMorePrice, setIsShowMorePrice] = useState(false);

    const [selectedDay, setSelectedDay] = useState();
    const [listDays, setListDays] = useState([]);
    const [listTime, setListTime] = useState([]);
    const [toggleChangeDay, setToggleChangeDay] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    console.log(doctor)
    const handleOpenModal = (item) => {
        setTimeSelected(item);
        setIsShow(true);
    }

    const handleOnchangeDay = (e) => {
        setToggleChangeDay(!toggleChangeDay);
        if (listDays && listDays.length > 0) {
            const date = listDays.find(item => {
                return item.value === e.target.value;
            }).date;
            setSelectedDay(date);
        }
    }

    useEffect(() => {
        let arr = []
        for (let i = 0; i < 7; i++) {
            let obj = {};

            if (language === languages.VI) {
                let label = moment(new Date()).add(i, 'days').locale("vi").format('dddd - DD/MM');
                obj.label = CommonUtils.capitalizeFirstLetter(label);
            }
            else {
                obj.label = moment(new Date()).add(i, 'days').locale("en").format('ddd - DD/MM');
            }
            obj.value = moment(new Date()).add(i, 'days').locale("vi").format('dd');
            obj.date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
            arr.push(obj);
        }
        setListDays(arr);
        setSelectedDay(arr[0].date);
        setListTime(doctor ? doctor.doctorInfoData.scheduleData : null);
    }, [language, doctor])

    useEffect(() => {
        if (doctor && listDays && listDays.length > 0) {
            setIsLoading(true);
            const data = {
                date: selectedDay,
                doctorId: doctor.doctorId
            }
            handleApiGetScheduleByDay(data, setListTime, setIsLoading);
        }
    }, [toggleChangeDay, toggleBooked]);

    return (
        <>
            {!doctor ?
                <div className="schedule-container">
                    <div className={componentSpecialty ? "schedule-content component-specialty" : "schedule-content"}>
                        <div className="schedule-content-up">
                            <div ><Skeleton width={"100px"} /></div>
                            <div className="icon-schedule"><Skeleton width={"50px"} /></div>
                        </div>
                        <div className="schedule-content-down">
                            <div className="time-option">

                                <ScheduleItem
                                    isLoading={true}
                                />
                                <ScheduleItem
                                    isLoading={true}
                                />
                                <ScheduleItem
                                    isLoading={true}
                                />
                                <ScheduleItem
                                    isLoading={true}
                                />
                                <ScheduleItem
                                    isLoading={true}
                                />
                                <ScheduleItem
                                    isLoading={true}
                                />
                            </div>
                            <div className="more-info-booking">
                                <div className="adrress-clinic-container">
                                    <div className="title-clinic"><Skeleton /></div>
                                    <div className="name-clinic"><Skeleton /></div>
                                    <div className="address-clinic"><Skeleton /></div>
                                </div>
                                <div className="price-container"><Skeleton /></div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="schedule-container">
                    <div className={componentSpecialty ? "schedule-content component-specialty" : "schedule-content"}>
                        <div className="schedule-content-up">
                            <div className="date">
                                <select onChange={(e) => handleOnchangeDay(e)}>
                                    {listDays && listDays.length > 0 && listDays.map((item, index) => {
                                        return (
                                            <option
                                                value={item.value}
                                                key={index}
                                            >
                                                {item.label}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="icon-schedule"><ImCalendar /> <FormattedMessage id="detailDoctor.schedule" /></div>
                        </div>
                        <div className="schedule-content-down">
                            <div className="time-option">
                                {isLoading && <>
                                    <ScheduleItem
                                        isLoading={isLoading}
                                    />
                                    <ScheduleItem
                                        isLoading={isLoading}
                                    />
                                    <ScheduleItem
                                        isLoading={isLoading}
                                    />
                                    <ScheduleItem
                                        isLoading={isLoading}
                                    />
                                    <ScheduleItem
                                        isLoading={isLoading}
                                    />
                                    <ScheduleItem
                                        isLoading={isLoading}
                                    />
                                </>}
                                {!isLoading && listTime && listTime.length > 0 ? listTime.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => { handleOpenModal(item) }}
                                        >
                                            <ScheduleItem
                                                isLoading={isLoading}
                                                item={item}
                                                language={language}
                                            />
                                        </div>
                                    )
                                })
                                    :
                                    !isLoading && <div style={{ gridColumn: "1/5" }}><FormattedMessage id="detailDoctor.notification" /></div>
                                }
                            </div>
                            <div className="more-info-booking">
                                {doctor ?
                                    <>
                                        <div className="adrress-clinic-container">
                                            <div className="title-clinic"><FormattedMessage id="detailDoctor.titleAddress" /></div>
                                            <div className="name-clinic">{doctor.nameClinic}</div>
                                            <div className="address-clinic">
                                                {doctor.addressClinic}, {language === languages.EN ? doctor.provinceData.valueEn : doctor.provinceData.valueVi}
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            {!isShowMorePrice ?
                                                <div className='price-content-common'>
                                                    <div className='label-price'><FormattedMessage id="detailDoctor.titlePrice" />:</div>
                                                    <div className='price'>
                                                        {language === languages.EN ? `${doctor.priceData.valueEn}$.` : `${doctor.priceData.valueVi}đ.`}
                                                    </div>
                                                    <div className='hide-detail' onClick={() => setIsShowMorePrice(true)}><FormattedMessage id="detailDoctor.seeMore" /></div>
                                                </div>
                                                :
                                                <div className='price-content-detail'>
                                                    <div className='label-price'><FormattedMessage id="detailDoctor.titlePrice" />: </div>
                                                    <div className='more-info-price'>
                                                        <div className='price-content'>
                                                            <div className='price'>
                                                                <span><FormattedMessage id="detailDoctor.titlePrice" /></span>
                                                                <span>
                                                                    {language === languages.EN ? `${doctor.priceData.valueEn}$` : `${doctor.priceData.valueVi}đ`}
                                                                </span>
                                                            </div>
                                                            <div className='note'>{doctor.note}</div>
                                                        </div>
                                                        <div className='method-payment'>
                                                            {
                                                                language === languages.EN ?
                                                                    `The patient can pay the cost in the form of: ${doctor.paymentData.valueEn}`
                                                                    :
                                                                    `Người bệnh có thể thanh toán chi phí bằng hình thức: ${doctor.paymentData.valueVi}`
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='hide-detail' onClick={() => setIsShowMorePrice(false)}><FormattedMessage id="detailDoctor.hide" /></div>
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
            }
        </>
    )
}

export default ScheduleDoctor;