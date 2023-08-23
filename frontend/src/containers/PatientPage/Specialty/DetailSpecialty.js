import HeaderDetail from "../HeaderDetail";
import { useLocation } from "react-router-dom";
import "./DetailSpecialty.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { handleApiGetListDoctorBySpecialty } from "../../../services/userService";
import ItemDoctor from "../Doctor/ItemDoctor";
import { CLEAN_LIST_DOCTOR_BY_SPECIALTY } from "../../../store/slice/userSlice";
import Pagination from "../../../components/Pagination";

const DetailSpecialty = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const specialty = location.state.specialty;

    const [showHide, setShowHide] = useState(true);
    const [listDoctor, setListDoctor] = useState();

    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 2;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleApiGetListDoctorBySpecialty(specialty.id, dispatch, setListDoctor, LIMIT, currentPage, setTotalPage, setIsLoading);

        return () => {
            dispatch(CLEAN_LIST_DOCTOR_BY_SPECIALTY());
        }
    }, [dispatch, specialty, currentPage])

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
                    {isLoading ?
                        <>
                            {Array(LIMIT).fill(0).map((_, index) => {
                                return (
                                    <div key={index} className="child-doctor">
                                        <ItemDoctor
                                            isLoading={isLoading}
                                        />
                                    </div>
                                )
                            })}
                        </>
                        :

                        (listDoctor && listDoctor.length > 0 && listDoctor.map((item, index) => {
                            return (
                                <div key={index} className="child-doctor">
                                    <ItemDoctor
                                        doctor={item}
                                    />
                                </div>
                            )
                        })) || <div>Hiện chưa có bác sỹ</div>
                    }
                </div>
            </div>
            <Pagination
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default DetailSpecialty;