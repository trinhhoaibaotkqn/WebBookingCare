import { AiOutlineMail, AiOutlineFileProtect } from "react-icons/ai";
import { FaRegAddressBook } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine, RiAdminLine, RiFolderUploadLine } from "react-icons/ri";
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import CommonUtils from "../../../../utils/CommonUtils";

import { handleApiEditUser } from "../../../../services/adminService";
import { languages } from "../../../../utils/Constants";

const ModalEditUser = (props) => {
    const { modalEdit, handleModalEdit, dataEdit, handleListenChange } = props;
    const dispatch = useDispatch();
    const listRole = useSelector((state) => state.admin.code.listRole);
    const listGender = useSelector((state) => state.admin.code.listGender);
    const listPosition = useSelector((state) => state.admin.code.listPosition);
    const language = useSelector((state) => state.common.language);
    const userLogin = useSelector(state => state.auth.login.currentUser);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [roleid, setRoleid] = useState();
    const [positionId, setPositionId] = useState();
    const [isUpdateEmail, setIsUpdateEmail] = useState();
    const [isUpdatePassword, setIsUpdatePassword] = useState();
    const [image, setImage] = useState();

    const handleEditUser = () => {
        const userEdit = {
            isUpdateEmail,
            isUpdatePassword,
            name,
            email,
            password,
            passwordConfirm,
            gender,
            address,
            phoneNumber,
            roleid,
            positionId,
        }
        if (image) {
            userEdit.image = image;
        }
        handleApiEditUser(dataEdit.id, userEdit, dispatch, handleListenChange, userLogin);
        handleModalEdit();
    }

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

    useEffect(() => {
        setName(dataEdit?.name);
        setEmail(dataEdit?.email);
        setGender(dataEdit?.gender);
        setAddress(dataEdit?.address);
        setPhoneNumber(dataEdit?.phoneNumber);
        setRoleid(dataEdit?.roleid);
        setPositionId(dataEdit?.positionId);
        setIsUpdateEmail(false);
        setIsUpdatePassword(false);
        setImage();
        if (dataEdit && dataEdit.image && dataEdit.image.data) {
            let imageBase64 = new Buffer(dataEdit.image, 'base64').toString('binary');
            setPreviewImgUrl(imageBase64);
        } else {
            setPreviewImgUrl();
        }
    }, [dataEdit])

    return (
        <div style={modalEdit ? { display: "block" } : { display: "none" }} className="modal-user modal-edit-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Edit user</div>
                    <span className="close" onClick={() => handleModalEdit()}>&times;</span>
                </div>
                {dataEdit ?
                    <div className="modal-body">
                        <div className="modal-element element-image-edit">
                            <div id="image-user">
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
                                                <img alt="avatar" ref={ref} onClick={open} src={previewImgUrl} height="200px" />
                                            )}
                                        </Item>
                                    </Gallery>
                                </div>
                            </div>
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><BsPerson /></span>
                            <input type="text" defaultValue={dataEdit.name} placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><RiAdminLine /></span>
                            <select defaultValue={dataEdit.roleid} onChange={(e) => { setRoleid(e.target.value) }}>
                                {listRole && listRole.map(item => {
                                    return (
                                        <option key={item.id} value={item.key}>
                                            {language === "vi" ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><AiOutlineMail /></span>
                            <input type="email"
                                defaultValue={dataEdit.email}
                                placeholder="Email"
                                readOnly={isUpdateEmail ? false : true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="icon-setting"
                                onClick={() => setIsUpdateEmail(!isUpdateEmail)}
                            >
                                {isUpdateEmail ? <GiCancel /> : <MdEdit />}
                            </span>
                        </div>
                        <div className="modal-element element-address">
                            <span className="modal-icon-label"><FaRegAddressBook /></span>
                            <input type="text" defaultValue={dataEdit.address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><RiLockPasswordLine /></span>
                            <input type="password"
                                placeholder="Password"
                                readOnly={isUpdatePassword ? false : true}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="icon-setting"
                                onClick={() => setIsUpdatePassword(!isUpdatePassword)}
                            >
                                {isUpdatePassword ? <GiCancel /> : <MdEdit />}
                            </span>
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label" ><BsGenderAmbiguous /></span>
                            <select defaultValue={dataEdit.gender} onChange={(e) => setGender(e.target.value)}>
                                {listGender && listGender.length > 0 && listGender.map((item, index) => {
                                    return (
                                        <option key={index} value={item.key}>
                                            {language === languages.EN ? item.valueEn : item.valueVi}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><BsTelephone /></span>
                            <input type="text" defaultValue={dataEdit.phoneNumber} placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><RiLockPasswordLine /></span>
                            <input type="password"
                                placeholder="Confirm password"
                                readOnly={isUpdatePassword ? false : true}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>
                        <div className="modal-element">
                            <span className="modal-icon-label"><AiOutlineFileProtect /></span>
                            <select defaultValue={dataEdit.positionId} onChange={(e) => setPositionId(e.target.value)}>
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
                            <button className="cancel-btn" onClick={() => handleModalEdit()}>cancel</button>
                        </div>
                        <div className="modal-element element-add-btn">
                            <button className="add-btn" onClick={() => handleEditUser()}>Save</button>
                        </div>
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}

export default ModalEditUser;