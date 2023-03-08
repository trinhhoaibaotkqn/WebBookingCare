// import urlImage from "../../../assets/images/avatar.jpg";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import 'photoswipe/dist/photoswipe.css';
// import { Gallery, Item } from 'react-photoswipe-gallery';

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";

import {
    GET_ADMIN_FAILED, GET_ADMIN_START, GET_ADMIN_SUCCESS,
    GET_DOCTOR_START, GET_DOCTOR_SUCCESS, GET_DOCTOR_FAILED,
    GET_PATIENT_FAILED, GET_PATIENT_START, GET_PATIENT_SUCCESS,
    OPEN_AMIN, OPEN_DOCTOR, OPEN_PATIENT,
    GET_ROLE_START, GET_ROLE_SUCCESS, GET_ROLE_FAILED,
} from "../../../../store/slice/adminSlice";
import CommonUtils from "../../../../utils/CommonUtils";
// import CommonUtils from "../../../../utils/CommonUtils";

const AdminUser = () => {
    const dispatch = useDispatch();
    const listRole = useSelector((state) => state.admin.role.listRole);
    const language = useSelector((state) => state.common.language);

    const [listAdmin, setListAdmin] = useState();
    const [listPatient, setListPatient] = useState();
    const [listDoctor, setListDoctor] = useState();

    const optionAdmin = useSelector((state) => state.admin.admin.isOpen);
    const optionDoctor = useSelector((state) => state.admin.doctor.isOpen);
    const optionPatient = useSelector((state) => state.admin.patient.isOpen);

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModaDelete] = useState(false);
    const [listenUpdate, setListenUpdate] = useState(false);

    const [data, setData] = useState(listAdmin);
    const [dataEdit, setDataEdit] = useState();
    const [dataDelete, setDataDelete] = useState();

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
    const handleClickOptionAdmin = () => {
        dispatch(OPEN_AMIN());
        setData(listAdmin);
    }
    const handleClickOptionDoctor = () => {
        dispatch(OPEN_DOCTOR());
        setData(listDoctor);
    }
    const handleClickOptionPatient = () => {
        dispatch(OPEN_PATIENT());
        setData(listPatient);
    }

    const handleListenChange = () => {
        setListenUpdate(!listenUpdate);
    }

    useEffect(() => {
        const handleApiGetData = async (keyRole, optionAdmin, optionDoctor, optionPatient) => {
            console.log(">>>>>>call api");
            keyRole === "R1" ?
                dispatch(GET_ADMIN_START()) : (keyRole === "R2" ?
                    dispatch(GET_DOCTOR_START()) :
                    dispatch(GET_PATIENT_START()));
            try {
                const res = await axios.get(`http://localhost:8080/admin/get-user/${keyRole}`,
                    {
                        "withCredentials": true
                    });
                if (res.data) {
                    if (optionAdmin && keyRole === "R1")
                        setData(res.data);
                    if (optionDoctor && keyRole === "R2")
                        setData(res.data);
                    if (optionPatient && keyRole === "R3")
                        setData(res.data);
                    keyRole === "R1" ?
                        setListAdmin(res.data) : (keyRole === "R2" ?
                            setListDoctor(res.data) :
                            setListPatient(res.data));
                    keyRole === "R1" ?
                        dispatch(GET_ADMIN_SUCCESS(res.data)) : (keyRole === "R2" ?
                            dispatch(GET_DOCTOR_SUCCESS(res.data)) :
                            dispatch(GET_PATIENT_SUCCESS(res.data)));
                }
            } catch (err) {
                keyRole === "R1" ?
                    dispatch(GET_ADMIN_FAILED()) : (keyRole === "R2" ?
                        dispatch(GET_DOCTOR_FAILED()) :
                        dispatch(GET_PATIENT_FAILED()))
            }
        }
        if (optionDoctor)
            handleApiGetData("R2", optionAdmin, optionDoctor, optionPatient);
        if (optionPatient)
            handleApiGetData("R3", optionAdmin, optionDoctor, optionPatient);
        if (optionAdmin)
            handleApiGetData("R1", optionAdmin, optionDoctor, optionPatient);
    }, [dispatch, listenUpdate, optionAdmin, optionDoctor, optionPatient]);

    useEffect(() => {
        console.log(">>>>>call api role");
        const handleLoadRoleFromDB = async () => {
            dispatch(GET_ROLE_START());
            try {
                const res = await axios.get("http://localhost:8080/admin/get-role",
                    {
                        "withCredentials": true
                    });
                if (res.data.errCode === 0) {
                    dispatch(GET_ROLE_SUCCESS(res.data.objCode));
                }
            } catch (err) {
                dispatch(GET_ROLE_FAILED());
            }
        }
        handleLoadRoleFromDB();
    }, [dispatch]);

    return (
        <div className="user-admin-container">
            <div className="user-admin-content">
                <div className="btn-add-new-container">
                    <div className="btn-add-new"
                        onClick={() => handleModalAdd()}
                    >
                        <GrAddCircle /> Add new user
                    </div>
                </div>
                <div className="option-choose">
                    <div className={optionAdmin ? "option-item active" : "option-item"}
                        onClick={() => handleClickOptionAdmin()}>
                        Admin
                    </div>
                    <div className={optionDoctor ? "option-item active" : "option-item"}
                        onClick={() => handleClickOptionDoctor()}>
                        Doctor
                    </div>
                    <div className={optionPatient ? "option-item active" : "option-item"}
                        onClick={() => handleClickOptionPatient()}>
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
                            {data && data.map((item, index) => {
                                return (<tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        {language === "vi" ?
                                            CommonUtils.getRoleByKey(listRole, item.roleid).valueVi :
                                            CommonUtils.getRoleByKey(listRole, item.roleid).valueEn
                                        }
                                    </td>
                                    <td>{item.positionId}</td>
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
                                    </td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>
            </div>

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