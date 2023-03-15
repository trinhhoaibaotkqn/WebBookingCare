import { Outlet } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";
import {
    GET_LIST_TIME_FAILED,
    GET_LIST_TIME_START,
    GET_LIST_TIME_SUSSCESS
} from "../../store/slice/doctorSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const DoctorHome = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const handleLoadTimeFromDB = async () => {
            dispatch(GET_LIST_TIME_START());
            try {
                console.log(">>>>>call api time");
                const res = await axios.get("http://localhost:8080/doctor/get-allcode/TIME",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_LIST_TIME_SUSSCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_LIST_TIME_FAILED());
            }
        }
        handleLoadTimeFromDB();
    }, [dispatch]);

    return (
        <div>
            <DoctorHeader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default DoctorHome;