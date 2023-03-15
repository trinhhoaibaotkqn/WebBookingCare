import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GET_TOP_DOCTORS_FAILED,
    GET_TOP_DOCTORS_START,
    GET_TOP_DOCTORS_SUSSCESS,
} from "../../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import CommonUtils from "../../../utils/CommonUtils";

const OutStandingDoctor = () => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            }
        ]
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const language = useSelector(state => state.common.language);

    const [listDoctors, setListDoctors] = useState();

    useEffect(() => {
        const handleGetTopDoctor = async (limit) => {
            dispatch(GET_TOP_DOCTORS_START());
            try {
                console.log("call api get top doctor")
                const res = await axios.get(`http://localhost:8080/user/get-top-doctor-home/${limit}`,
                    {
                        "withCredentials": true
                    });
                if (res.data) {
                    setListDoctors(res.data);
                    dispatch(GET_TOP_DOCTORS_SUSSCESS(res.data));
                }
            } catch (err) {
                dispatch(GET_TOP_DOCTORS_FAILED());
            }
        }
        handleGetTopDoctor(5);
    }, [dispatch])

    return (
        <div className="section-share section-doctor">
            <div className="section-content">
                <div className="section-header">
                    <div className="title">Bác sĩ nổi bật tuần qua</div>
                    <div className="header-button">xem thêm</div>
                </div>
                <Slider {...settings}>
                    {listDoctors && listDoctors.map(item => {
                        let title;
                        if (language === "vi") {
                            title = `${item.positionData.valueVi === "Không" ? "" : `${item.positionData.valueVi}, `}${item.roleData.valueVi} ${item.name}`
                        }
                        if (language === "en") {
                            title = `${item.positionData.valueEn === "None" ? "" : `${item.positionData.valueEn}, `}${item.roleData.valueEn} ${item.name}`
                        }
                        return (
                            <div key={item.id}
                                onClick={() => navigate(`/detail-doctor/${item.name}`, {
                                    state: {
                                        doctor: item,
                                    }
                                })}>
                                <div className="item-content">
                                    <div className="item-image-doctor" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.image)})` }}></div>
                                    <div className="title-doctor">
                                        <div className="subs-title">{title}</div>
                                        <div className="subs-title-doctor-2">Nam học</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}
export default OutStandingDoctor;