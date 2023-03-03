import { AiOutlineMail, AiOutlineFileProtect } from "react-icons/ai";
import { FaRegAddressBook } from 'react-icons/fa';
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine, RiAdminLine, RiFolderUploadLine } from "react-icons/ri";
import { useState } from "react";
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

const ModalAddNewUser = (props) => {
    const [previewImgUrl, setPreviewImgUrl] = useState();
    const handleOnChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        let objectUrl = URL.createObjectURL(file);
        setPreviewImgUrl(objectUrl);
    }

    const { modalAdd, handleModalAdd, handleAddUser } = props;
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
                    <div className="modal-element element-address">
                        <span className="modal-icon-label"><FaRegAddressBook /></span>
                        <input type="text" placeholder="Address" />
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
                        <button className="cancel-btn" onClick={() => handleModalAdd()}>cancel</button>
                    </div>
                    <div className="modal-element element-add-btn">
                        <button className="add-btn" onClick={() => handleAddUser({ username: "bao", email: "das" })}>add</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalAddNewUser;