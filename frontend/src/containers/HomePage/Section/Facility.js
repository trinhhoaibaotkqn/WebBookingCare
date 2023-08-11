import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { handleApiGetTopClinic } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

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

    useEffect(() => {
        handleApiGetTopClinic(LIMIT, setListFacility);
    }, [dispatch])

    return (
        <div className="section-share section-facility section-gray">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="facility.title" /></div>
                    <div className="header-button" onClick={() => navigate("/all-facilities")}><FormattedMessage id="btnSeeMore" /></div>
                </div>
                <Slider {...settings}>
                    {listFacility && listFacility.length > 0 && listFacility.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => navigate(`/detail-facility/${item.name}`, {
                                    state: {
                                        facility: item,
                                    }
                                })}
                            >
                                <div className="item-content">
                                    <div className="item-image image-facility" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.image)})` }}></div>
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
export default Facility;