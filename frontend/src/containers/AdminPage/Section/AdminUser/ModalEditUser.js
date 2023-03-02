import { AiOutlineMail, AiOutlinePicture, AiOutlineFileProtect } from "react-icons/ai";
import { FaRegAddressBook } from 'react-icons/fa';
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine, RiAdminLine } from "react-icons/ri";

const ModalEditUser = (props) => {

    const { modalEdit, handleModalEdit } = props;
    return (
        <div style={modalEdit ? { display: "block" } : { display: "none" }} className="modal-user modal-edit-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Edit user</div>
                    <span className="close" onClick={() => handleModalEdit()}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-element element-image">
                        <span className="modal-icon-label"><AiOutlinePicture /></span>
                        <input type="text" placeholder="Image" />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsPerson /></span>
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><AiOutlineMail /></span>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><RiLockPasswordLine /></span>
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="modal-element element-address">
                        <span className="modal-icon-label"><FaRegAddressBook /></span>
                        <input type="text" placeholder="Address" />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><RiLockPasswordLine /></span>
                        <input type="password" placeholder="Confirm password" />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsGenderAmbiguous /></span>
                        <select>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><BsTelephone /></span>
                        <input type="text" placeholder="Phone number" />
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><RiAdminLine /></span>
                        <select>
                            <option value="male">Admin</option>
                            <option value="female">Doctor</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="modal-element">
                        <span className="modal-icon-label"><AiOutlineFileProtect /></span>
                        <select>
                            <option value="male">Professor</option>
                            <option value="female">Master</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="modal-element element-cancel-btn">
                        <button className="cancel-btn" onClick={() => handleModalEdit()}>cancel</button>
                    </div>
                    <div className="modal-element element-add-btn">
                        <button className="add-btn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditUser;