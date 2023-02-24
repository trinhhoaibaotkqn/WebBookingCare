import "./HomeHeader.scss";
import { FaBars, FaHospitalAlt, FaMicroscope, FaAmbulance, FaTooth, FaStethoscope } from 'react-icons/fa';
import { AiFillQuestionCircle } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { GiPersonInBed } from "react-icons/gi";
import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageUtils from "../../utils/LanguageUtil";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE, OPEN_MENU } from "../../store/slice/commonSlice";

const HomeHeader = () => {
    const dispatch = useDispatch();

    const handleOpenMenu = () => {
        dispatch(OPEN_MENU());
    }

    const handleChangeLanguage = (lang) => {
        dispatch(CHANGE_LANGUAGE(lang));
    }
    const language = useSelector((state) => state.common.language);

    return (
        <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div
                            className="header-bar"
                            onClick={() => handleOpenMenu()}
                        >
                            <FaBars />
                        </div>
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="child-center-content">
                            <div className="title"><FormattedMessage id="homeheader.speciality" /></div>
                            <div className="subs-title"><FormattedMessage id="homeheader.searchdoctor" /></div>
                        </div>
                        <div className="child-center-content">
                            <div className="title"><FormattedMessage id="homeheader.health-facility" /></div>
                            <div className="subs-title"><FormattedMessage id="homeheader.hospotal-clinic" /></div>
                        </div>
                        <div className="child-center-content">
                            <div className="title"><FormattedMessage id="homeheader.doctor" /></div>
                            <div className="subs-title"><FormattedMessage id="homeheader.choose-doctor" /></div>
                        </div>
                        <div className="child-center-content">
                            <div className="title"><FormattedMessage id="homeheader.package" /></div>
                            <div className="subs-title"><FormattedMessage id="homeheader.check-health" /></div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <div className="icon-question"><AiFillQuestionCircle /></div>
                            <div className="text-support"><FormattedMessage id="homeheader.support" /></div>
                        </div>
                        <div className="language">
                            {language && language === "vi" ?
                                <div
                                    className="language-vi"
                                    onClick={() => handleChangeLanguage("en")}
                                >VN</div>
                                :
                                <div
                                    className="language-en"
                                    onClick={() => handleChangeLanguage("vi")}
                                >EN</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

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
        </React.Fragment>
    )
}
export default HomeHeader;