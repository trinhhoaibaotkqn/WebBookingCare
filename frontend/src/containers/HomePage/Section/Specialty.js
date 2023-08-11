import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { handleApiGetTopSpecialty } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

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

    useEffect(() => {
        handleApiGetTopSpecialty(LIMIT, setListSpecialty);
    }, [dispatch])

    return (
        <div className="section-share">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="specialty.title" /></div>
                    <div className="header-button" onClick={() => navigate("/all-specialties")}><FormattedMessage id="btnSeeMore" /></div>
                </div>
                <Slider {...settings}>
                    {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item) => {
                        return (
                            <div key={item.id}
                                onClick={() => navigate(`/detail-specialty/${item.name}`, {
                                    state: {
                                        specialty: item,
                                    }
                                })}
                            >
                                <div className="item-content">
                                    <div className="item-image image-specialty" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.image)})` }}></div>
                                    <div className="subs-title">{item.name}</div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}
export default Specialty;