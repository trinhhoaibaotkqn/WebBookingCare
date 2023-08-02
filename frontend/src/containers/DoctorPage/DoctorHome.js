import { Outlet } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleApiGetAllCode } from "../../services/doctorService";
import { CLEAN_ALL_CODE } from "../../store/slice/doctorSlice";

const DoctorHome = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.auth.login.currentUser);

    useEffect(() => {
        handleApiGetAllCode("TIME", dispatch, userLogin);
        handleApiGetAllCode("PRICE", dispatch, userLogin);
        handleApiGetAllCode("PAYMENT", dispatch, userLogin);
        handleApiGetAllCode("PROVINCE", dispatch, userLogin);

        return () => {
            console.log(">>>>>>clean up")
            dispatch(CLEAN_ALL_CODE());
        }
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