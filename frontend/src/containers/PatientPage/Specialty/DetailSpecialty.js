import HeaderDetail from "../HeaderDetail";
import { useLocation } from "react-router-dom";
import "./DetailSpecialty.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { handleApiGetListDoctorBySpecialty } from "../../../services/userService";
import ItemDoctor from "./ItemDoctor";

const DetailSpecialty = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const specialty = location.state.specialty;

    const [showHide, setShowHide] = useState(true);
    const [listDoctor, setListDoctor] = useState();



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
                    {listDoctor && listDoctor.length > 0 && listDoctor.map((item, index) => {
                        return (
                            <div key={index} className="child-doctor">
                                <ItemDoctor
                                    doctor={item}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailSpecialty;