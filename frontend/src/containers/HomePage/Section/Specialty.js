import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import urlImage from "../../../assets/images/co-xuong-khop.jpg";
import urlImage2 from "../../../assets/images/than-kinh.jpg";

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

    return (
        <div className="section-share">
            <div className="section-content">
                <div className="section-header">
                    <div className="title">Chuyên khoa phổ biến</div>
                    <div className="header-button">xem thêm</div>
                </div>
                <Slider {...settings}>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage2})` }}></div>
                            <div className="subs-title">Thần kinh</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image image-specialty" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title">Cơ xương khớp</div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
export default Specialty;