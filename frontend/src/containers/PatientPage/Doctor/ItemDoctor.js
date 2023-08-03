import { useState } from "react";
import DescriptionDoctor from "./DescriptionDoctor";
import ScheduleDoctor from "./ScheduleDoctor";
import BookingModal from "./BookingModal";

const ItemDoctor = (props) => {
    let { doctor } = props;

    const [isShow, setIsShow] = useState(false);
    const [timeSelected, setTimeSelected] = useState();
    const [toggleBooked, setToggleBooked] = useState(false);

    return (
        <>
            <DescriptionDoctor
                doctor={doctor}
                size={"small"}
                description={true}
                formList={true}
            />
            <ScheduleDoctor
                doctor={doctor}
                setTimeSelected={setTimeSelected}
                setIsShow={setIsShow}
                toggleBooked={toggleBooked}
                componentSpecialty={true}
            />
            <BookingModal
                doctor={doctor}
                isShow={isShow}
                setIsShow={setIsShow}
                timeSelected={timeSelected}
                setToggleBooked={setToggleBooked}
                toggleBooked={toggleBooked}
            />
        </>
    )
}

export default ItemDoctor;