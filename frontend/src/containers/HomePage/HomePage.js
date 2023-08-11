import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Facility from "./Section/Facility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import LeftMenu from "./LeftMenu";

import "./HomePage.scss";
import HomeBanner from "./Section/HomeBanner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CLEAN_DATA_HOME } from "../../store/slice/userSlice";

const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(CLEAN_DATA_HOME());
        }
    }, [dispatch])
    return (
        <div className="homepage">
            <HomeHeader />
            <HomeBanner />
            <Specialty />
            <Facility />
            <OutStandingDoctor />
            <Handbook />
            {/* <About /> */}
            <HomeFooter />
            <LeftMenu />
        </div>
    )
}

export default HomePage;