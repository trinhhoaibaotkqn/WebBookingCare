import { useLocation } from "react-router-dom";
import HeaderDetail from "../HeaderDetail";
import "./DetailDoctor.scss";
import CommonUtils from "../../../utils/CommonUtils";
import { useSelector } from "react-redux";
import ScheduleDoctor from "./ScheduleDoctor";

const DetailDoctor = () => {
    const language = useSelector(state => state.common.language);
    const location = useLocation();
    const doctor = location.state.doctor;
    console.log(doctor)
    let name;
    if (language === "vi") {
        name = `${doctor.positionData.valueVi === "Không" ? "" : `${doctor.positionData.valueVi}, `}${doctor.roleData.valueVi} ${doctor.name}`
    }
    if (language === "en") {
        name = `${doctor.positionData.valueEn === "None" ? "" : `${doctor.positionData.valueEn}, `}${doctor.roleData.valueEn} ${doctor.name}`
    }

    return (
        <div className="detail-doctor-container">
            <HeaderDetail
                title={`Phó giáo sư, tiến sĩ, bác sĩ ${doctor.name}`}
            />
            <div className="description-doctor-container">
                <div className="avatar" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(doctor.image)})` }}></div>
                <div className="description-content">
                    <div className="name-doctor">{name}</div>
                    <div className="description-doctor">
                        <pre>
                            {doctor.doctorData.description}
                        </pre>
                    </div>
                </div>
            </div>

            <ScheduleDoctor
                doctor={doctor}
            />

            <div className="more-information-doctor-container">
                <div className="more-information-doctor-content" dangerouslySetInnerHTML={{ __html: doctor.doctorData.contentHTML }}></div>
            </div>
        </div>
    )
}

export default DetailDoctor;