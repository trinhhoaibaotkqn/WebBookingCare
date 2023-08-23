import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from "react-router-dom";
import CommonUtils from "../../../utils/CommonUtils";

const SpecialtyItem = (props) => {
    let { isLoading, item } = props;

    const navigate = useNavigate()
    return (
        <>
            {isLoading ?
                <div>
                    <div className="item-content">
                        <div className="item-image image-specialty"><Skeleton /></div>
                        <div className="subs-title"><Skeleton /></div>
                    </div>
                </div>
                :
                <div className="item-content" onClick={() => navigate(`/detail-specialty/${item.name}`, {
                    state: {
                        specialty: item,
                    }
                })}>
                    <div className="item-image image-specialty" style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item.image)})` }}></div>
                    <div className="subs-title">{item.name}</div>
                </div>
            }
        </>

    )
}

export default SpecialtyItem;