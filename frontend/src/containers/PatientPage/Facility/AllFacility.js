import { useEffect, useState } from "react";
import HeaderDetail from "../HeaderDetail";
import Pagination from "../../../components/Pagination";
import "../Specialty/AllSpecialty.scss";
import { BsSearch } from "react-icons/bs";
import { handleApiGetAllFacility } from "../../../services/userService";
import { useDispatch } from "react-redux";
import CommonUtils from "../../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";

const AllFacility = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 2;

    const [listFacility, setListFacility] = useState([]);

    useEffect(() => {
        handleApiGetAllFacility(LIMIT, currentPage, dispatch, setListFacility, setTotalPage);
    }, [dispatch, currentPage]);

    return (
        <>
            <HeaderDetail
                title={"Chuyên khoa"}
            />
            <div className="search-container">
                <input placeholder="Tìm kiếm" />
                <BsSearch />
            </div>
            <div className="all-list-container">
                {
                    listFacility && listFacility.length > 0 && listFacility.map(item => {
                        return (
                            <div className="element-container" key={item.id}
                                onClick={() => navigate(`/detail-facility/${item.name}`, {
                                    state: {
                                        facility: item,
                                    }
                                })}>
                                <div className="image-facility"
                                    style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item?.image)})` }}
                                ></div>
                                <div className="main-title-facility">{item.name}</div>
                            </div>

                        )
                    })
                }
            </div>
            <Pagination
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}

export default AllFacility;