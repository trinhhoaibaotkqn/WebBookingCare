import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleApiGetTopDoctor } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import CommonUtils from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";

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
        handleApiGetTopDoctor(5, dispatch, setListDoctors);
    }, [dispatch])

    return (
        <div className="section-share section-doctor">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="outstandingDoctor.title" /></div>
                    {/* <div className="header-button" onClick={() => navigate("/all-doctors")}>xem thêm</div> */}
                </div>
                <Slider {...settings}>
                    {listDoctors && listDoctors.map(item => {
                        let title;
                        if (language === "vi") {
                            title = `${item.doctorInfoData.positionData.valueVi === "Không" ? "" : `${item.doctorInfoData.positionData.valueVi}, `}Bác sỹ ${item.doctorInfoData.name}`
                        }
                        else {
                            title = `${item.doctorInfoData.positionData.valueEn === "None" ? "" : `${item.doctorInfoData.positionData.valueEn}, `}Doctor ${item.doctorInfoData.name}`
                        }
                        return (
                            <div key={item.id}
                                onClick={() => navigate(`/detail-doctor/${item.doctorInfoData.name}`, {
                                    state: {
                                        doctor: item,
                                    }
                                })}>
                                <div className="item-content">
                                    <div className="item-image-doctor" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.doctorInfoData.image)})` }}></div>
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