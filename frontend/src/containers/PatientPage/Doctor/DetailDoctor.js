import { useLocation } from "react-router-dom";
import HeaderDetail from "../HeaderDetail";
import "./DetailDoctor.scss";
import ScheduleDoctor from "./ScheduleDoctor";
import BookingModal from "./BookingModal";
import { useState } from "react";
import DescriptionDoctor from "./DescriptionDoctor";

const DetailDoctor = () => {

    const location = useLocation();
    const doctor = location.state.doctor;

    const [isShow, setIsShow] = useState(false);
    const [timeSelected, setTimeSelected] = useState();
    const [toggleBooked, setToggleBooked] = useState(false);

    const size = "big";
    const description = true;

    return (
        <div className="detail-doctor-container">
            <HeaderDetail
                title={`Phó giáo sư, tiến sĩ, bác sĩ ${doctor.name}`}
            />

            <DescriptionDoctor
                doctor={doctor}
                size={size}
                description={description}
            />

            <ScheduleDoctor
                doctor={doctor}
                setTimeSelected={setTimeSelected}
                setIsShow={setIsShow}
                toggleBooked={toggleBooked}
            />

            <div className="more-information-doctor-container">
                <div className="more-information-doctor-content" dangerouslySetInnerHTML={{ __html: doctor.doctorData.contentHTML }}></div>
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