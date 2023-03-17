import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../../../utils/Constants";
import { handleApiSaveDataDoctorInfo } from "../../../services/doctorService";
import {
    GET_DOCTOR_INFO_FAILED,
    GET_DOCTOR_INFO_START, GET_DOCTOR_INFO_SUSSCESS
} from "../../../store/slice/doctorSlice";
import axios from "axios";

const InformationCheckup = () => {
    const dispatch = useDispatch();

    const language = useSelector(state => state.common.language);
    const listPrice = useSelector(state => state.doctor.price.listPrice);
    const listPayment = useSelector(state => state.doctor.payment.listPayment);
    const listProvince = useSelector(state => state.doctor.province.listProvince);
    // const [doctorData, setDoctorData] = useState();

    const [isEdit, setIsEdit] = useState(false);
    const doctorId = 10;
    const [priceId, setPriceId] = useState((listPrice && listPrice.length > 0) ? listPrice[0]?.key : "");
    const [paymentId, setPaymentId] = useState((listPayment && listPayment.length) > 0 ? listPayment[0]?.key : "");
    const [provinceId, setProvinceId] = useState((listProvince && listProvince.length) > 0 ? listProvince[0]?.key : "");
    const [addressClinic, setAddressClinic] = useState();
    const [nameClinic, setNameClinic] = useState();
    const [note, setNote] = useState();

    const handleClickBtnSave = () => {
        const data = {
            doctorId,
            priceId,
            provinceId,
            paymentId,
            addressClinic,
            nameClinic,
            note
        }
        console.log(data);
        handleApiSaveDataDoctorInfo(data, dispatch);
        setIsEdit(false);
    }

    useEffect(() => {
        const handleLoadDoctorInfoFromDB = async () => {
            dispatch(GET_DOCTOR_INFO_START());
            try {
                console.log(">>>>>call api doctor info");
                const res = await axios.get(`http://localhost:8080/doctor/get-doctor-info/${doctorId}`,
                    {
                        "withCredentials": true
                    }
                );
                if (res.data && res.data.errCode === 0) {
                    dispatch(GET_DOCTOR_INFO_SUSSCESS(res.data.data));
                    setPriceId(res.data.data.priceId);
                    setPaymentId(res.data.data.paymentId);
                    setProvinceId(res.data.data.provinceId);
                    setAddressClinic(res.data.data.addressClinic);
                    setNameClinic(res.data.data.nameClinic);
                    setNote(res.data.data.note);
                }
            } catch (err) {
                dispatch(GET_DOCTOR_INFO_FAILED());
            }
        }
        handleLoadDoctorInfoFromDB()
    }, [dispatch]);
    return (
        <div className="infor-checkup-container">
            <div className="infor-checkup-content">
                <div className="input-element">
                    <div className="title-input">Giá</div>
                    <select
                        value={priceId}
                        onChange={(e) => setPriceId(e.target.value)}
                        disabled={isEdit ? false : true}
                    >
                        {listPrice && listPrice.length > 0 && listPrice.map((item, index) => {
                            let price;
                            if (language === languages.EN) {
                                price = item.valueEn + " $";
                            } else {
                                price = item.valueVi + " VND";
                            }
                            return (
                                <option value={item.key} key={index}>{price}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="input-element">
                    <div className="title-input">Địa chỉ phòng khám</div>
                    <input
                        onChange={(e) => setAddressClinic(e.target.value)}
                        disabled={isEdit ? false : true}
                        defaultValue={addressClinic}
                    />
                </div>
                <div className="input-element">
                    <div className="title-input">Tỉnh</div>
                    <select
                        onChange={(e) => setProvinceId(e.target.value)}
                        disabled={isEdit ? false : true}
                        value={provinceId}
                    >
                        {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                            return (
                                <option value={item.key} key={index}>
                                    {language === languages.EN ? item.valueEn : item.valueVi}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="input-element element-note">
                    <div className="title-input">Ghi chú</div>
                    <input
                        onChange={(e) => setNote(e.target.value)}
                        disabled={isEdit ? false : true}
                        defaultValue={note}
                    />
                </div>
                <div className="input-element">
                    <div className="title-input">Hình thức thanh toán</div>
                    <select
                        onChange={(e) => setPaymentId(e.target.value)}
                        disabled={isEdit ? false : true}
                        value={paymentId}
                    >
                        {listPayment && listPayment.length > 0 && listPayment.map((item, index) => {
                            return (
                                <option value={item.key} key={index}>
                                    {language === languages.EN ? item.valueEn : item.valueVi}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="input-element">
                    <div className="title-input">Tên phòng khám</div>
                    <input
                        onChange={(e) => setNameClinic(e.target.value)}
                        disabled={isEdit ? false : true}
                        defaultValue={nameClinic}
                    />
                </div>
                {isEdit ?
                    <div className="input-element">
                        <button className="two-btn save-btn" onClick={() => handleClickBtnSave()}>Lưu thông tin</button>
                        <button className="two-btn cancel-btn"
                            onClick={() => setIsEdit(false)}
                        >
                            Hủy
                        </button>
                    </div>
                    :
                    <div className="input-element">
                        <button className="edit-btn" onClick={() => setIsEdit(true)}>Chỉnh sửa thông tin</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default InformationCheckup;