import HeaderDetail from "../HeaderDetail";
import { useLocation } from "react-router-dom";
import "./DetailSpecialty.scss";
import { useEffect, useState } from "react";
import DescriptionDoctor from "../Doctor/DescriptionDoctor";
import { useDispatch, useSelector } from "react-redux";
import ScheduleDoctor from "../Doctor/ScheduleDoctor";
import BookingModal from "../Doctor/BookingModal";
import { MdKeyboardArrowDown } from "react-icons/md";
import { handleApiGetListDoctorBySpecialty } from "../../../services/userService";

const DetailSpecialty = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const specialty = location.state.specialty;

    const [showHide, setShowHide] = useState(true);
    const doctor = useSelector(state => state.user.topDoctors.listDoctors[3]);
    console.log(specialty)
    const [listDoctor, setListDoctor] = useState();

    const [isShow, setIsShow] = useState(false);
    const [timeSelected, setTimeSelected] = useState();
    const [toggleBooked, setToggleBooked] = useState(false);

    useEffect(() => {
        handleApiGetListDoctorBySpecialty(specialty.id, dispatch, setListDoctor);
    }, [dispatch, specialty])

    return (
        <div className="detail-specialty-container">
            <HeaderDetail
                title={specialty.name}
            />
            <div className="info-specialty-container">
                <div className={showHide ? "info-specialty-content" : "info-specialty-content show-more"} dangerouslySetInnerHTML={{ __html: specialty.descriptionHTML }}></div>
                <div className="btn-show-hide" onClick={() => setShowHide(!showHide)}>{showHide ? 'Đọc thêm' : 'Ẩn bớt'}</div>
            </div>
            <div className="list-doctor-container">
                <div className="btn-provine">Toàn quốc  <MdKeyboardArrowDown /></div>
                <div className="list-doctor-content">
                    <div className="child-doctor">
                        <DescriptionDoctor
                            doctor={doctor}
                            size={"small"}
                            description={true}
                        />
                        <ScheduleDoctor
                            doctor={doctor}
                            setTimeSelected={setTimeSelected}
                            setIsShow={setIsShow}
                            toggleBooked={toggleBooked}
                            componentSpecialty={true}
                        />
                        <BookingModal
                            doctor={doctor}
                            isShow={isShow}
                            setIsShow={setIsShow}
                            timeSelected={timeSelected}
                            setToggleBooked={setToggleBooked}
                            toggleBooked={toggleBooked}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSpecialty;