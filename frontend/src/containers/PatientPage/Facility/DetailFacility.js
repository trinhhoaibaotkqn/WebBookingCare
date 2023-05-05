import { useLocation } from "react-router-dom";
import HeaderDetail from "../HeaderDetail";
import "./DetailFacility.scss";
import { handleApiGetListDoctorByFacility } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ItemDoctor from "../Specialty/ItemDoctor";


const DetailFacility = () => {

    const dispatch = useDispatch();

    const location = useLocation();
    const facility = location.state.facility;
    console.log(facility);

    const [listDoctor, setListDoctor] = useState();

    useEffect(() => {
        handleApiGetListDoctorByFacility(facility.id, dispatch, setListDoctor);
    }, [dispatch, facility])

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
            <div id="description" className="description-facility">
                <div className="title-description">Giới thiệu</div>
                <div dangerouslySetInnerHTML={{ __html: facility.descriptionHTML }}></div>
            </div>
        </div>
    )
}

export default DetailFacility;