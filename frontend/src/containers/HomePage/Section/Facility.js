import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import urlImage from "../../../assets/images/bv-viet-duc.jpg";
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

    return (
        <div className="section-share section-facility section-gray">
            <div className="section-content">
                <div className="section-header">
                    <div className="title">Cơ sở y tế nổi bật</div>
                    <div className="header-button">xem thêm</div>
                </div>
                <Slider {...settings}>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-facility" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
export default Facility;