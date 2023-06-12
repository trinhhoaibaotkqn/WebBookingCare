import "./HomeHeader.scss";
import { FaBars } from 'react-icons/fa';
import { AiFillQuestionCircle } from "react-icons/ai";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_LANGUAGE, OPEN_MENU } from "../../store/slice/commonSlice";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleOpenMenu = () => {
        dispatch(OPEN_MENU());
    }

    const handleChangeLanguage = (lang) => {
        dispatch(CHANGE_LANGUAGE(lang));
    }
    const language = useSelector((state) => state.common.language);

    return (
        <div className="home-header-container">
            <div className="home-header-content">
                <div className="left-content">
                    <div
                        className="header-bar"
                        onClick={() => handleOpenMenu()}
                    >
                        <FaBars />
                    </div>
                    <div className="header-logo" onClick={() => navigate("/")}></div>
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
                            (
                                language === "en" ?
                                    <div
                                        className="language-en"
                                        onClick={() => handleChangeLanguage("ru")}
                                    >EN</div>
                                    :
                                    <div
                                        className="language-en"
                                        onClick={() => handleChangeLanguage("vi")}
                                    >RU</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeHeader;