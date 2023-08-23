import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";
import CommonUtils from "../../../utils/CommonUtils";

const DoctorItem = (props) => {
    let { isLoading, item, title } = props;

    const navigate = useNavigate()
    return (
        <>
            {isLoading ?
                <div>
                    <div className="item-content">
                        <div className="item-image-doctor"><Skeleton circle={true} height={"calc(11.5vw - 2.5px)"} /></div>
                        <div className="title-doctor">
                            <div className="subs-title"><Skeleton /></div>
                            {/* <div className="subs-title-doctor-2"><Skeleton /></div> */}
                        </div>
                    </div>
                </div>
                :
                <div className="item-content" onClick={() => navigate(`/detail-doctor/${item.doctorInfoData.name}`, {
                    state: {
                        doctor: item,
                    }
                })}>
                    <div className="item-image-doctor" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.doctorInfoData.image)})` }}></div>
                    <div className="title-doctor">
                        <div className="subs-title">{title}</div>
                        {/* <div className="subs-title-doctor-2">Nam học</div> */}
                    </div>
                </div>
            }
        </>

    )
}

export default DoctorItem;