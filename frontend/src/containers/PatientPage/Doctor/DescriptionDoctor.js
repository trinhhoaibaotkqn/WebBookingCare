import "./DescriptionDoctor.scss";
import CommonUtils from "../../../utils/CommonUtils";
import { useSelector } from "react-redux";
import { description_doctor } from "../../../utils/Constants";

const DescriptionDoctor = (props) => {
    let { doctor, size, description, timeSelected } = props;

    const language = useSelector(state => state.common.language);
    let name;
    if (language === "vi") {
        name = `${doctor.positionData.valueVi === "Không" ? "" : `${doctor.positionData.valueVi}, `}${doctor.roleData.valueVi} ${doctor.name}`
    }
    if (language === "en") {
        name = `${doctor.positionData.valueEn === "None" ? "" : `${doctor.positionData.valueEn}, `}${doctor.roleData.valueEn} ${doctor.name}`
    }

    return (
        <div className={size === description_doctor.BIG ? "description-doctor-container" : "description-doctor-container modal"}>
            <div className="avatar" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(doctor.image)})` }}></div>
            <div className="description-content">
                <div className="name-doctor">{name}</div>
                {
                    timeSelected && !description ?
                        <>
                            <div className="time-selected">{timeSelected.timeData.valueVi} - {timeSelected.date}</div>
                            <div className="title-booking">đặt lịch khám</div>
                        </>
                        :
                        <div className="description-doctor">
                            <pre>
                                {doctor.doctorData.description}
                            </pre>
                        </div>
                }
            </div>
        </div>
    )
}

export default DescriptionDoctor;