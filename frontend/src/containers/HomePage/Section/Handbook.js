import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import urlImage from "../../../assets/images/cam-nang-1.png";
import { FormattedMessage } from "react-intl";

const Handbook = () => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="section-share section-gray">
            <div className="section-content">
                <div className="section-header">
                    <div className="title"><FormattedMessage id="handbook.title" /></div>
                    <div className="header-button"><FormattedMessage id="btnSeeMore" /></div>
                </div>
                <Slider {...settings}>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                    <div>
                        <div className="item-content handbook">
                            <div className="item-image image-handbook" style={{ backgroundImage: `url(${urlImage})` }}></div>
                            <div className="subs-title-handbook">Trung tâm Sức khỏe Nam Giới Men’s Health có tốt không? Chia sẻ kinh nghiệm đi khám</div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
export default Handbook;