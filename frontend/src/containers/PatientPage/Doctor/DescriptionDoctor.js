import "./DescriptionDoctor.scss";
import CommonUtils from "../../../utils/CommonUtils";
import { useSelector } from "react-redux";
import { description_doctor } from "../../../utils/Constants";
import { useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const DescriptionDoctor = (props) => {
    let { doctor, size, description, timeSelected, formList, isLoading } = props;

    const language = useSelector(state => state.common.language);
    const navigate = useNavigate();
    let name;
    if (!isLoading) {
        if (language === "vi") {
            name = `${doctor.doctorInfoData.positionData.valueVi === "Không" ? "" : `${doctor.doctorInfoData.positionData.valueVi}, `}Bác sỹ ${doctor.doctorInfoData.name}`
        }
        else {
            name = `${doctor.doctorInfoData.positionData.valueEn === "None" ? "" : `${doctor.doctorInfoData.positionData.valueEn}, `}Doctor ${doctor.doctorInfoData.name}`
        }
    }

    const handleClickNameDoctor = (e) => {
        if (formList) {
            navigate(`/detail-doctor/${doctor.doctorInfoData.name}`, {
                state: {
                    doctor: doctor,
                }
            })
        } else {
            e.preventDefault();
        }
    }

    return (
        <>{isLoading ?
            <div className={size === description_doctor.BIG ? "description-doctor-container" : "description-doctor-container modal"} style={{ height: "fit-content" }}>
                <div className="avatar"><Skeleton height={"100px"} circle={true} /></div>
                <div className="description-content">
                    <div className="name-doctor"
                        style={formList ? { cursor: "pointer" } : {}}
                    >
                        {<Skeleton />}
                    </div>
                    {
                        timeSelected && !description ?
                            <>
                                <div className="time-selected"><Skeleton /></div>
                                <div className="title-booking"><Skeleton /></div>
                            </>
                            :
                            <div className="description-doctor">
                                <pre>
                                    <Skeleton height={"100px"} />
                                </pre>
                            </div>
                    }
                </div>
            </div>
            :
            <div className={size === description_doctor.BIG ? "description-doctor-container" : "description-doctor-container modal"}>
                <div className="avatar" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(doctor.doctorInfoData.image)})` }}></div>
                <div className="description-content">
                    <div className="name-doctor"
                        style={formList ? { cursor: "pointer" } : {}}
                        onClick={(e) => { handleClickNameDoctor(e) }}
                    >
                        {doctor ? name : <Skeleton />}
                    </div>
                    {
                        timeSelected && !description ?
                            <>
                                <div className="time-selected">{timeSelected.timeData.valueVi} - {timeSelected.date}</div>
                                <div className="title-booking">đặt lịch khám</div>
                            </>
                            :
                            <div className="description-doctor">
                                <pre>
                                    {doctor.doctorMarkDownData.description}
                                </pre>
                            </div>
                    }
                </div>
            </div>
        }
        </>
    )
}

export default DescriptionDoctor;