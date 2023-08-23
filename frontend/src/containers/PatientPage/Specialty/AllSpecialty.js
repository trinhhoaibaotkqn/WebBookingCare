import { useEffect, useState } from "react";
import HeaderDetail from "../HeaderDetail";
import Pagination from "../../../components/Pagination";
import "./AllSpecialty.scss";
import { BsSearch } from "react-icons/bs";
import { handleGetAllSpecialty } from "../../../services/userService";
import { useDispatch } from "react-redux";
import CommonUtils from "../../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const AllSpecialty = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 2;

    const [listSpecialty, setListSpecialty] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleGetAllSpecialty(LIMIT, currentPage, dispatch, setListSpecialty, setTotalPage, setIsLoading);
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
                    isLoading ?
                        <>
                            {Array(LIMIT).fill(0).map((_, index) => {
                                return (
                                    <div className="element-container" key={index}>
                                        <div className="image-specialty"><Skeleton height={"100%"} /></div>
                                        <div className="main-title"><Skeleton width={"200px"} /></div>
                                    </div>
                                )
                            })}

                        </>
                        :
                        (listSpecialty && listSpecialty.length > 0 && listSpecialty.map(item => {
                            return (
                                <div className="element-container" key={item.id}
                                    onClick={() => navigate(`/detail-specialty/${item.name}`, {
                                        state: {
                                            specialty: item,
                                        }
                                    })}>
                                    <div className="image-specialty"
                                        style={{ backgroundImage: `url(${CommonUtils.getPreviewImgfromDatabase(item?.image)})` }}
                                    ></div>
                                    <div className="main-title">{item.name}</div>
                                </div>

                            )
                        }))
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

export default AllSpecialty;