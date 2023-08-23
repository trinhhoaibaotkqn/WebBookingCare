import { useLocation } from "react-router-dom";
import HeaderDetail from "../HeaderDetail";
import "./DetailFacility.scss";
import { handleApiGetListDoctorByFacility } from "../../../services/userService";
import Pagination from "../../../components/Pagination";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ItemDoctor from "../Doctor/ItemDoctor";
import { CLEAN_LIST_DOCTOR_BY_FACILITY } from "../../../store/slice/userSlice";


const DetailFacility = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const facility = location.state.facility;

    const [listDoctor, setListDoctor] = useState();

    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 2;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleApiGetListDoctorByFacility(facility.id, dispatch, setListDoctor, LIMIT, currentPage, setTotalPage, setIsLoading);

        return () => {
            dispatch(CLEAN_LIST_DOCTOR_BY_FACILITY());
        }
    }, [dispatch, facility, currentPage])

    return (
        <div className="detail-facility-container">
            <HeaderDetail
                title={facility.name}
            />
            <div className="content-name-address">
                <div className="name-facility">{facility.name}</div>
                <div className="address-facility">{facility.address}</div>
                <div className="navigation-facility">
                    <div className="nav-item">Đặt lịch khám</div>
                    <div className="nav-item">Giới thiệu</div>
                    <div className="nav-item">Thế mạnh chuyên môn</div>
                    <div className="nav-item">Trang thiết bị</div>
                    <div className="nav-item">Vị trí</div>
                    <div className="nav-item">Quy trình đi khám</div>
                </div>
            </div>
            <div id="list-doctor" className="list-doctor-container">
                <div className="title-list-doctor">Bác sỹ</div>
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
            <div id="description" className="description-facility">
                <div className="title-description">Giới thiệu</div>
                <div dangerouslySetInnerHTML={{ __html: facility.descriptionHTML }}></div>
            </div>
        </div>
    )
}

export default DetailFacility;