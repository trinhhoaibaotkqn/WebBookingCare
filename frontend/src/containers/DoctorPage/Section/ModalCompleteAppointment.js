import { handleApiDoneAppointment } from "../../../services/doctorService";
import { useDispatch } from "react-redux";
import { RiFolderUploadLine } from "react-icons/ri";
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState } from "react";
import CommonUtils from "../../../utils/CommonUtils";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

const ModalCompleteAppointment = (props) => {
    let { isOpenModal, setIsOpenModal, dataComplete, toggleUpdateData, setToggleUpdateData } = props;

    const dispatch = useDispatch();
    const language = useSelector(state => state.common.language);
    const userLogin = useSelector(state => state.auth.login.currentUser);

    let [isLoading, setIsLoading] = useState(false);

    const [image, setImage] = useState();
    const [previewImgUrl, setPreviewImgUrl] = useState();
    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setPreviewImgUrl(objectUrl);
            setImage(base64);
        }
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setPreviewImgUrl();
    }

    const handleCompleteAppointment = async () => {
        setIsLoading(true);
        const data = {
            id: dataComplete.id,
            image: image,
            name: dataComplete.patientData.name,
            language: language,
            patientEmail: dataComplete.patientData.email
        }
        await handleApiDoneAppointment(data, dispatch, setIsOpenModal, toggleUpdateData, setToggleUpdateData, userLogin);
        setIsLoading(false);
    }

    return (
        <>
            <div style={isOpenModal ? { display: "block" } : { display: "none" }} className="modal-user">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="title-modal-header">Confirm complete appointment</div>
                        <span className="close" onClick={() => handleCloseModal()}>&times;</span>
                    </div>
                    <div className="modal-body">
                        {dataComplete ?
                            <div className="title-complete">
                                <h3>Appointment of patient {dataComplete.patientData.name} has been completed?</h3>
                                <div className="title-upload">Send prescription</div>
                                <div id="image-prescription">
                                    <input id="previewImgEdit" type="file" style={{ display: "none" }}
                                        onChange={(e) => handleOnChangeImage(e)}
                                    />
                                    <label className="label-upload" htmlFor="previewImgEdit"><RiFolderUploadLine /> Upload</label>
                                    <div className="preview-image">
                                        <Gallery>
                                            <Item
                                                original={previewImgUrl}
                                                width="1024"
                                                height="768"
                                            >
                                                {({ ref, open }) => (
                                                    <img alt="đơn thuốc" ref={ref} onClick={open} src={previewImgUrl} height="200px" />
                                                )}
                                            </Item>
                                        </Gallery>
                                    </div>
                                </div>
                            </div>
                            : <></>
                        }
                        <div className="btn-container">
                            <button className="cancel-btn" onClick={() => handleCloseModal()}>cancel</button>
                            <button className="done-btn"
                                onClick={() => { handleCompleteAppointment() }}
                            >Complete</button>
                        </div>
                    </div>
                </div>
            </div>
            <Loading
                isLoading={isLoading}
            />
        </>
    )
}
export default ModalCompleteAppointment;