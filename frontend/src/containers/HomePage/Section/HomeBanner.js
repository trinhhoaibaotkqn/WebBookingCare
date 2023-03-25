import { FaHospitalAlt, FaMicroscope, FaAmbulance, FaTooth, FaStethoscope } from 'react-icons/fa';
import { GoSearch } from "react-icons/go";
import { GiPersonInBed } from "react-icons/gi";
import { FormattedMessage } from "react-intl";
import LanguageUtils from "../../../utils/LanguageUtil";
import { useSelector } from 'react-redux';

const HomeBanner = () => {
    const language = useSelector(state => state.common.language)
    return (
        <div className="home-header-banner">
            <div className="content-up">
                <div className="title1"><FormattedMessage id="homebanner.title1" /></div>
                <div className="title2"><FormattedMessage id="homebanner.title2" /></div>
                <div className="search">
                    <div className="icon-search"><GoSearch /></div>
                    <input type="text" placeholder={LanguageUtils.getMessageByKey("homebanner.text-search", language)} />
                </div>
            </div>
            <div className="content-down">
                <div className="option">
                    <div className="icon-option"><FaHospitalAlt /></div>
                    <div className="option-title">Khám<br></br>chuyên khoa</div>
                </div>
                <div className="option">
                    <div className="icon-option"><GiPersonInBed /></div>
                    <div className="option-title">Khám<br></br>tổng quát</div>
                </div>
                <div className="option">
                    <div className="icon-option"><FaMicroscope /></div>
                    <div className="option-title">Xét nghiệm<br></br>y học</div>
                </div>
                <div className="option">
                    <div className="icon-option"><FaStethoscope /></div>
                    <div className="option-title">Sức khỏe<br></br>tinh thần</div>
                </div>
                <div className="option">
                    <div className="icon-option"><FaAmbulance /></div>
                    <div className="option-title">Sức khỏe<br></br>danh nghiệp</div>
                </div>
                <div className="option">
                    <div className="icon-option"><FaTooth /></div>
                    <div className="option-title">Khám<br></br>nha khoa</div>
                </div>
            </div>
        </div>
    )
}
export default HomeBanner;