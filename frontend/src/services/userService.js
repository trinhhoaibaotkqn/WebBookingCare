import {
    BOOK_APPOINTMENT_START, BOOK_APPOINTMENT_SUSSCESS, BOOK_APPOINTMENT_FAILED,

} from "../store/slice/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const handleApiBookAppointment = async (data, dispatch, setIsShow, setToggleBooked, toggleBooked) => {
    dispatch(BOOK_APPOINTMENT_START);
    try {
        const res = await axios.post(`http://localhost:8080/user/book-appointment`, data,
            {
                "withCredentials": true
            }
        );
        if (res.data && res.data.errCode === 0) {
            dispatch(BOOK_APPOINTMENT_SUSSCESS(res.data.booking));
            toast.success(res.data.message);
            setToggleBooked(!toggleBooked);
            setIsShow(false);
        }
    } catch (err) {
        dispatch(BOOK_APPOINTMENT_FAILED());
        toast.error(err.response.data.message);
    }
}