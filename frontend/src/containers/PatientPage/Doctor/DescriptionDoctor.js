import "./DescriptionDoctor.scss";
import CommonUtils from "../../../utils/CommonUtils";
import { useSelector } from "react-redux";
import { description_doctor } from "../../../utils/Constants";
import { useNavigate } from 'react-router-dom';

const DescriptionDoctor = (props) => {
    let { doctor, size, description, timeSelected, formList } = props;

    const language = useSelector(state => state.common.language);
    const navigate = useNavigate();
    let name;
    if (language === "vi") {
        name = `${doctor.doctorInfoData.positionData.valueVi === "Không" ? "" : `${doctor.doctorInfoData.positionData.valueVi}, `}Bác sỹ ${doctor.doctorInfoData.name}`
    }
    else {
        name = `${doctor.doctorInfoData.positionData.valueEn === "None" ? "" : `${doctor.doctorInfoData.positionData.valueEn}, `}Doctor ${doctor.doctorInfoData.name}`
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
        <div className={size === description_doctor.BIG ? "description-doctor-container" : "description-doctor-container modal"}>
            <div className="avatar" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(doctor.doctorInfoData.image)})` }}></div>
            <div className="description-content">
                <div className="name-doctor"
                    style={formList ? { cursor: "pointer" } : {}}
                    onClick={(e) => { handleClickNameDoctor(e) }}
                >
                    {name}
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
    )
}

export default DescriptionDoctor;