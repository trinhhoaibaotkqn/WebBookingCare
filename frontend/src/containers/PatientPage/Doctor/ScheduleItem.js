import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { languages } from "../../../utils/Constants";

const ScheduleItem = (props) => {
    let { isLoading, item, language } = props;
    return (
        <>
            {
                isLoading ?
                    <div className="child-time-option">
                        <Skeleton />
                    </div>
                    :
                    <div
                        className="child-time-option"
                    >
                        {language === languages.VI ? item.timeData.valueVi : item.timeData.valueEn}
                    </div>
            }
        </>
    )
}

export default ScheduleItem;