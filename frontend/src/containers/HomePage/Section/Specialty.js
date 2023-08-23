import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { handleApiGetTopSpecialty } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import Skeleton from 'react-loading-skeleton'

import SpecialtyItem from "./SpecialtyItem";

const Specialty = () => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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

    const [listSpecialty, setListSpecialty] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleApiGetTopSpecialty(LIMIT, setListSpecialty, setIsLoading);
    }, [dispatch])

    return (
        <div className="section-share">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="specialty.title" /></div>
                    <div className="header-button" onClick={() => navigate("/all-specialties")}><FormattedMessage id="btnSeeMore" /></div>
                </div>
                {!isLoading ?
                    <Slider {...settings}>
                        {(listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item) => {
                            return (
                                <div key={item.id}>
                                    <SpecialtyItem
                                        isLoading={isLoading}
                                        item={item}
                                    />
                                </div>
                            )
                        }))}
                    </Slider>
                    :
                    <Slider {...settings}>
                        <SpecialtyItem
                            isLoading={isLoading}
                        />
                        <SpecialtyItem
                            isLoading={isLoading}
                        />
                        <SpecialtyItem
                            isLoading={isLoading}
                        />
                        <SpecialtyItem
                            isLoading={isLoading}
                        />
                        <SpecialtyItem
                            isLoading={isLoading}
                        />
                    </Slider>
                }
            </div>
        </div>
    )
}
export default Specialty;