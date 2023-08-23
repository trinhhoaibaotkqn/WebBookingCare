import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleApiGetTopDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import DoctorItem from "./DoctorItem";

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
    const language = useSelector(state => state.common.language);

    const [listDoctors, setListDoctors] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        handleApiGetTopDoctor(5, dispatch, setListDoctors, setIsLoading);
    }, [dispatch])

    return (
        <div className="section-share section-doctor">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="outstandingDoctor.title" /></div>
                    {/* <div className="header-button" onClick={() => navigate("/all-doctors")}>xem thêm</div> */}
                </div>
                {isLoading ?
                    <Slider {...settings}>
                        <DoctorItem
                            isLoading={isLoading}
                        />
                        <DoctorItem
                            isLoading={isLoading}
                        />
                        <DoctorItem
                            isLoading={isLoading}
                        />
                        <DoctorItem
                            isLoading={isLoading}
                        />
                    </Slider>
                    :
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
                                <div key={item.id}>
                                    <DoctorItem
                                        isLoading={isLoading}
                                        item={item}
                                        title={title}
                                    />
                                </div>
                            )
                        })}
                    </Slider>
                }
            </div>
        </div>
    )
}
export default OutStandingDoctor;