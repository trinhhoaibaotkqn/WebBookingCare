// import urlImage from "../../../assets/images/avatar.jpg";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";

import ModalAddNewUser from "./ModalAddNewUser";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";

const AdminUser = () => {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModaDelete] = useState(false);
    const [user, setUser] = useState({});

    const handleModalAdd = () => {
        setModalAdd(!modalAdd);
    }

    const handleModalEdit = () => {
        setModalEdit(!modalEdit);
    }

    const handleModalDelete = () => {
        setModaDelete(!modalDelete);
    }

    const handleAddUser = (userData) => {
        setUser(userData);
    }
    console.log(user);
    return (
        <div className="user-admin-container">
            <div className="user-admin-content">
                <div className="option-choose">
                    <div className="option-item">Admin</div>
                    <div className="option-item active">Doctor</div>
                    <div className="option-item">Patient</div>
                </div>
                <div className="btn-add-new-container">
                    <div className="btn-add-new"
                        onClick={() => handleModalAdd()}
                    >
                        <GrAddCircle /> Add new user
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Phone number</th>
                                <th>Role</th>
                                <th>Position</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Trinh Hoai Bao</td>
                                <td>trinhhoaibaotkqn@gmail.com</td>
                                <td>Nam</td>
                                <td>Binh hai thang binh quang nam</td>
                                <td>1038748573</td>
                                <td>Doctor</td>
                                <td>Nha si</td>
                                <td></td>
                                {/* <img src={urlImage} alt="Girl in a jacket" width="50px" height="60px" /> */}
                                <td>
                                    <button className="btn-edit"
                                        onClick={() => handleModalEdit()}
                                    >
                                        <MdModeEdit />
                                    </button>
                                    <button className="btn-delete"
                                        onClick={() => handleModalDelete()}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Tobias</td>
                                <td>sdgsd</td>
                                <td>sdgfsdf</td>
                                <td>fdsads</td>
                                <td>adfafd</td>
                                <td>adaf</td>
                                <td>afafds</td>
                                <td>afdfa</td>
                                <td>
                                    <button className="btn-edit"><MdModeEdit /></button>
                                    <button className="btn-delete"><MdDeleteForever /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalAddNewUser
                modalAdd={modalAdd}
                handleModalAdd={handleModalAdd}
                handleAddUser={handleAddUser}
            />

            <ModalEditUser
                modalEdit={modalEdit}
                handleModalEdit={handleModalEdit}
            />

            <ModalDeleteUser
                modalDelete={modalDelete}
                handleModalDelete={handleModalDelete}
            />
        </div>
    )
}

export default AdminUser;