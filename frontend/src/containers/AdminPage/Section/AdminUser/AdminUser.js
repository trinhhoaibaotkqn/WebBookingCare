// import urlImage from "../../../assets/images/avatar.jpg";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import { RiFileEditFill } from "react-icons/ri";
import 'photoswipe/dist/photoswipe.css';
// import { Gallery, Item } from 'react-photoswipe-gallery';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";

import {
    CLEAN_ALL_LIST,
    OPEN_AMIN, OPEN_DOCTOR, OPEN_PATIENT,
} from "../../../../store/slice/adminSlice";
import CommonUtils from "../../../../utils/CommonUtils";
import { useNavigate } from "react-router-dom";
import { handleApiGetInfoDoctor, handleApiGetListNameFacility, handleApiGetListNameSpecialty, handleApiGetListUsers } from "../../../../services/adminService";
import Pagination from "../../../../components/Pagination";

const AdminUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.login.currentUser);
    const listRole = useSelector((state) => state.admin.code.listRole);
    const listGender = useSelector((state) => state.admin.code.listGender);
    const listPosition = useSelector((state) => state.admin.code.listPosition);
    const isReady = listRole && listRole.length > 0 && listGender && listGender.length > 0 && listPosition && listPosition.length > 0
    const language = useSelector((state) => state.common.language);

    // const [listOptionSelect, setListOptionSelect] = useState(null);
    // const [selectedOption, setSelectedOption] = useState(null);

    const optionAdmin = useSelector(state => state.admin.admin.isOpen);
    const optionDoctor = useSelector(state => state.admin.doctor.isOpen);
    const optionPatient = useSelector(state => state.admin.patient.isOpen);

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModaDelete] = useState(false);
    const [listenUpdate, setListenUpdate] = useState(false);

    const [data, setData] = useState();
    const [dataEdit, setDataEdit] = useState();
    const [dataDelete, setDataDelete] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(0);

    const handleModalAdd = () => {
        setModalAdd(!modalAdd);
    }
    const handleModalEdit = (user) => {
        setModalEdit(!modalEdit);
        setDataEdit(user);
    }
    const handleModalDelete = (user) => {
        setModaDelete(!modalDelete);
        setDataDelete(user);
    }
    const handleClickOption = (ROLE) => {
        setCurrentPage(1);
        switch (ROLE) {
            case "R1":
                dispatch(OPEN_AMIN());
                break;
            case "R2":
                dispatch(OPEN_DOCTOR());
                break;
            case "R3":
                dispatch(OPEN_PATIENT());
                break;
            default:
        }
    }

    const handleListenChange = () => {
        setListenUpdate(!listenUpdate);
    }

    const handleClickEditMarkdown = async (doctor) => {
        const infoDoctor = await handleApiGetInfoDoctor(doctor.id, dispatch, user);
        navigate("/system/admin/user/edit-info-doctor", {
            state: {
                doctor: doctor,
                infoDoctor: infoDoctor
            }
        })
    }

    useEffect(() => {
        if (optionDoctor)
            handleApiGetListUsers("R2", dispatch, user, setData, currentPage, setTotalPage, setPerPage);
        if (optionPatient)
            handleApiGetListUsers("R3", dispatch, user, setData, currentPage, setTotalPage, setPerPage);
        if (optionAdmin)
            handleApiGetListUsers("R1", dispatch, user, setData, currentPage, setTotalPage, setPerPage);

        return () => {
            console.log(">>>>>>clean up")
            dispatch(CLEAN_ALL_LIST());
        }
    }, [dispatch, optionDoctor, optionPatient, optionAdmin, listenUpdate, currentPage]);

    useEffect(() => {
        handleApiGetListNameFacility(dispatch, user);
        handleApiGetListNameSpecialty(dispatch, user);
    }, [dispatch])

    return (
        <div className="section-admin-container">
            <div className="section-admin-content">
                <div className="btn-add-new-container">
                    <div className="btn-add-new"
                        onClick={() => handleModalAdd()}
                    >
                        <GrAddCircle /> Add new user
                    </div>
                    <div className="input-find-user">
                        <input placeholder="Nhập email" />
                        <button>Find</button>
                    </div>
                </div>
                <div className="option-choose">
                    <div className={optionAdmin ? "option-item active" : "option-item"}
                        onClick={() => handleClickOption("R1")}>
                        Admin
                    </div>
                    <div className={optionDoctor ? "option-item active" : "option-item"}
                        onClick={() => handleClickOption("R2")}>
                        Doctor
                    </div>
                    <div className={optionPatient ? "option-item active" : "option-item"}
                        onClick={() => handleClickOption("R3")}>
                        Patient
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
                                {/* <th>Image</th> */}
                                <th>Action</th>
                            </tr>
                            {isReady && data && data.length > 0 && data.map((item, index) => {
                                return (<tr key={item.id}>
                                    <td>{index + 1 + (currentPage - 1) * perPage}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {
                                            language === "vi" ?
                                                CommonUtils.getRoleByKey(listGender, item.gender)?.valueVi :
                                                CommonUtils.getRoleByKey(listGender, item.gender)?.valueEn
                                        }

                                    </td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        {language === "vi" ?
                                            CommonUtils.getRoleByKey(listRole, item.roleid).valueVi :
                                            CommonUtils.getRoleByKey(listRole, item.roleid).valueEn
                                        }
                                    </td>
                                    <td>
                                        {language === "vi" ?
                                            CommonUtils.getRoleByKey(listPosition, item.positionId)?.valueVi :
                                            CommonUtils.getRoleByKey(listPosition, item.positionId)?.valueEn
                                        }
                                    </td>
                                    {/* <td>{CommonUtils.getPreviewImgfromDatabase(item.image) ?
                                        <Gallery>
                                            <Item
                                                original={CommonUtils.getPreviewImgfromDatabase(item.image)}
                                                width="1024"
                                                height="768"
                                            >
                                                {({ ref, open }) => (
                                                    <img alt="avatar" ref={ref} onClick={open} style={{ cursor: "pointer" }}
                                                        src={CommonUtils.getPreviewImgfromDatabase(item.image)} height="25px"
                                                    />
                                                )}
                                            </Item>
                                        </Gallery> :
                                        <></>}
                                    </td> */}
                                    <td>
                                        <button className="btn-edit"
                                            onClick={() => handleModalEdit(item)}
                                        >
                                            <MdModeEdit />
                                        </button>
                                        <button className="btn-delete"
                                            onClick={() => handleModalDelete(item)}
                                        >
                                            <MdDeleteForever />
                                        </button>
                                        {listRole && item.roleid === "R2" ?
                                            <button className="btn-edit-markdown"
                                                onClick={() => handleClickEditMarkdown(item)}
                                            >
                                                <RiFileEditFill />
                                            </button>
                                            : <></>
                                        }
                                    </td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

            <ModalAddNewUser
                modalAdd={modalAdd}
                handleModalAdd={handleModalAdd}
                handleListenChange={handleListenChange}
            />

            <ModalEditUser
                modalEdit={modalEdit}
                handleModalEdit={handleModalEdit}
                dataEdit={dataEdit}
                handleListenChange={handleListenChange}
            />

            <ModalDeleteUser
                modalDelete={modalDelete}
                handleModalDelete={handleModalDelete}
                dataDelete={dataDelete}
                handleListenChange={handleListenChange}
            />
        </div>
    )
}

export default AdminUser;