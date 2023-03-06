import { AiOutlineMail, AiOutlinePicture, AiOutlineFileProtect } from "react-icons/ai";
import { FaRegAddressBook } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine, RiAdminLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { handleApiEditUser } from "../../../../services/adminService";

const ModalEditUser = (props) => {
    const { modalEdit, handleModalEdit, dataEdit, handleListenChange } = props;
    const dispatch = useDispatch();

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
            positionId
        }
        handleApiEditUser(dataEdit.id, userEdit, dispatch, handleListenChange);
        handleModalEdit();
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
                            <span className="modal-icon-label"><AiOutlinePicture /></span>
                            <input type="text" placeholder="Image" />
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
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
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
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
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
                                <option value="P0">None</option>
                                <option value="P1">Master</option>
                                <option value="P2">Doctor</option>
                                <option value="P3">Associate Professor</option>
                                <option value="P4">Professor</option>
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