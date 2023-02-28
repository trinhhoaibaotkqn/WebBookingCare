import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Facility from "./Section/Facility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import LeftMenu from "./LeftMenu";

import "./HomePage.scss";

const HomePage = () => {
    return (
        <div className="homepage">
            <HomeHeader />
            <Specialty />
            <Facility />
            <OutStandingDoctor />
            <Handbook />
            <About />
            <HomeFooter />
            <LeftMenu />
        </div>
    )
}

export default HomePage;