import { FaRegAddressBook } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineFileProtect } from "react-icons/ai";
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine, RiAdminLine, RiFolderUploadLine } from "react-icons/ri";
import { useState } from "react";
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { handleApiCreateUser } from "../../../../services/adminService";
import { useDispatch, useSelector } from 'react-redux';
import CommonUtils from '../../../../utils/CommonUtils';
import { languages } from '../../../../utils/Constants';
// import { useNavigate } from "react-router-dom";

const ModalAddNewUser = (props) => {
    const dispatch = useDispatch();
    const listRole = useSelector((state) => state.admin.code.listRole);
    const listGender = useSelector((state) => state.admin.code.listGender);
    const listPosition = useSelector((state) => state.admin.code.listPosition);
    const language = useSelector((state) => state.common.language);
    const userLogin = useSelector(state => state.auth.login.currentUser);

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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [gender, setGender] = useState("M");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roleid, setRoleid] = useState("R1");
    const [positionId, setPositionId] = useState("P0");
    const [image, setImage] = useState();

    const handleCreateUser = () => {
        const user = {
            name,
            email,
            password,
            passwordConfirm,
            gender,
            address,
            phoneNumber,
            roleid,
            positionId,
            image
        };
        handleApiCreateUser(user, dispatch, handleListenChange, handleModalAdd, clearModal, userLogin);
    }

    const clearModal = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setGender("M");
        setAddress("");
        setPhoneNumber("");
        setRoleid("R1");
        setPositionId("P0");
    }

    const { modalAdd, handleModalAdd, handleListenChange } = props;
    return (
        <div style={modalAdd ? { display: "block" } : { display: "none" }} className="modal-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Add new user</div>
                    <span className="close" onClick={() => handleModalAdd()}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsPerson /></span>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><AiOutlineMail /></span>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><RiLockPasswordLine /></span>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><RiLockPasswordLine /></span>
                        <input type="password" placeholder="Confirm password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsGenderAmbiguous /></span>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            {listGender && listGender.length > 0 && listGender.map((item, index) => {
                                return (
                                    <option key={index} value={item.key}>
                                        {language === languages.EN ? item.valueEn : item.valueVi}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="modal-element element-address">
                        <span className="modal-icon-label"><FaRegAddressBook /></span>
                        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="modal-element element-image">
                        <div id="image-user">
                            <input id="previewImg" type="file" style={{ display: "none" }}
                                onChange={(e) => handleOnChangeImage(e)}
                            />
                            <label className="label-upload" htmlFor="previewImg"><RiFolderUploadLine /> Upload</label>
                            <div className="preview-image">
                                <Gallery>
                                    <Item
                                        original={previewImgUrl}
                                        width="1024"
                                        height="768"
                                    >
                                        {({ ref, open }) => (
                                            <img alt="avatar" ref={ref} onClick={open} src={previewImgUrl} height="60px" />
                                        )}
                                    </Item>
                                </Gallery>
                            </div>
                        </div>
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsTelephone /></span>
                        <input type="text" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><RiAdminLine /></span>
                        <select value={roleid} onChange={(e) => setRoleid(e.target.value)}>
                            {listRole && listRole.map((item, index) => {
                                return (
                                    <option key={index} value={item.key}>
                                        {language === "vi" ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><AiOutlineFileProtect /></span>
                        <select value={positionId} onChange={(e) => setPositionId(e.target.value)}>
                            {listPosition && listPosition.length > 0 && listPosition.map((item, index) => {
                                return (
                                    <option key={index} value={item.key}>
                                        {language === languages.EN ? item.valueEn : item.valueVi}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="modal-element element-cancel-btn">
                        <button className="cancel-btn" onClick={() => handleModalAdd()}>cancel</button>
                    </div>
                    <div className="modal-element element-add-btn">
                        <button className="add-btn" onClick={() => handleCreateUser(handleModalAdd)}>add</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalAddNewUser;