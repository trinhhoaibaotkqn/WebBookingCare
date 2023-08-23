import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { handleApiGetTopClinic } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import FacilityItem from "./FacilityItem";

const Facility = () => {
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
    const LIMIT = 8;

    const [listFacility, setListFacility] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleApiGetTopClinic(LIMIT, setListFacility, setIsLoading);
    }, [dispatch])

    return (
        <div className="section-share section-facility section-gray">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="facility.title" /></div>
                    <div className="header-button" onClick={() => navigate("/all-facilities")}><FormattedMessage id="btnSeeMore" /></div>
                </div>
                {isLoading ?
                    <Slider {...settings}>
                        <FacilityItem
                            isLoading={isLoading} />
                        <FacilityItem
                            isLoading={isLoading} />
                        <FacilityItem
                            isLoading={isLoading} />
                        <FacilityItem
                            isLoading={isLoading} />
                    </Slider>
                    :
                    <Slider {...settings}>
                        {listFacility && listFacility.length > 0 && listFacility.map((item) => {
                            return (
                                <div key={item.id}>
                                    <FacilityItem
                                        isLoading={isLoading}
                                        item={item}
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
export default Facility;