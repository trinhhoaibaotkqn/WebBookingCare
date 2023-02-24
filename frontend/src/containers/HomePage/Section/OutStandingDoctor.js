import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import urlImage from "../../../assets/images/bsckii-tran-minh-khuyen.jpg";

const OutStandingDoctor = () => {
    let settings = {
        dots: false,
        infinite: true,
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
        <div className="section-share section-doctor">
            <div className="section-content">
                <div className="section-header">
                    <div className="title">Bác sĩ nổi bật tuần qua</div>
                    <div className="header-button">xem thêm</div>
                </div>
                <Slider {...settings}>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Hiếm muộn - Hỗ trợ sinh sản, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Hiếm muộn</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content">
                            <div className="item-image-doctor" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="title-doctor">
                                <div className="subs-title">Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                <div className="subs-title-doctor-2">Nam học</div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
export default OutStandingDoctor;