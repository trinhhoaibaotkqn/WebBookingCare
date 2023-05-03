import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { handleApiGetAllFacility } from "../../../services/userService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CommonUtils from "../../../utils/CommonUtils";

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

    const [listFacility, setListFacility] = useState();

    useEffect(() => {
        handleApiGetAllFacility(dispatch, setListFacility)
    }, [dispatch])

    return (
        <div className="section-share section-facility section-gray">
            <div className="section-content">
                <div className="section-header">
                    <div className="title">Cơ sở y tế nổi bật</div>
                    <div className="header-button">xem thêm</div>
                </div>
                <Slider {...settings}>
                    {listFacility && listFacility.length > 0 && listFacility.map((item, index) => {
                        return (
                            <div key={index}>
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