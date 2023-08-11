import { useLocation } from "react-router-dom";
import HeaderDetail from "../HeaderDetail";
import "./DetailDoctor.scss";
import ScheduleDoctor from "./ScheduleDoctor";
import BookingModal from "./BookingModal";
import { useState } from "react";
import DescriptionDoctor from "./DescriptionDoctor";
import { useSelector } from "react-redux";

const DetailDoctor = () => {

    const location = useLocation();
    const doctor = location.state.doctor;
    const language = useSelector(state => state.common.language);

    const [isShow, setIsShow] = useState(false);
    const [timeSelected, setTimeSelected] = useState();
    const [toggleBooked, setToggleBooked] = useState(false);

    let title;
    if (language === "vi") {
        title = `${doctor.doctorInfoData.positionData.valueVi === "Không" ? "" : `${doctor.doctorInfoData.positionData.valueVi}, `}Bác sỹ ${doctor.doctorInfoData.name}`
    }
    else {
        title = `${doctor.doctorInfoData.positionData.valueEn === "None" ? "" : `${doctor.doctorInfoData.positionData.valueEn}, `}Doctor ${doctor.doctorInfoData.name}`
    }

    return (
        <div className="detail-doctor-container">
            <HeaderDetail
                title={title}
            />

            <DescriptionDoctor
                doctor={doctor}
                size={"big"}
                description={true}
            />

            <ScheduleDoctor
                doctor={doctor}
                setTimeSelected={setTimeSelected}
                setIsShow={setIsShow}
                toggleBooked={toggleBooked}
            />

            <div className="more-information-doctor-container">
                <div className="more-information-doctor-content" dangerouslySetInnerHTML={{ __html: doctor.doctorMarkDownData.contentHTML }}></div>
            </div>

            <BookingModal
                doctor={doctor}
                isShow={isShow}
                setIsShow={setIsShow}
                timeSelected={timeSelected}
                setToggleBooked={setToggleBooked}
                toggleBooked={toggleBooked}
            />
        </div>
    )
}

export default DetailDoctor;