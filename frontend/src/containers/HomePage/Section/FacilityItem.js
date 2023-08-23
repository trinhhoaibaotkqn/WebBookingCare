import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";
import CommonUtils from "../../../utils/CommonUtils";

const FacilityItem = (props) => {
    let { isLoading, item } = props;

    const navigate = useNavigate()
    return (
        <>
            {isLoading ?
                <div>
                    <div className="item-content">
                        <div className="item-image image-facility"><Skeleton height={"calc(13vw - 10px)"} /></div>
                        <div className="subs-title"><Skeleton /></div>
                    </div>
                </div>
                :
                <div
                    onClick={() => navigate(`/detail-facility/${item.name}`, {
                        state: {
                            facility: item,
                        }
                    })}
                >
                    <div className="item-content">
                        <div className="item-image image-facility" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.image)})` }}></div>
                        <div className="subs-title">{item.name}</div>
                    </div>
                </div>
            }
        </>

    )
}

export default FacilityItem;