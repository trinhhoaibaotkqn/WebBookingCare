import Select from 'react-select';
import 'photoswipe/dist/photoswipe.css';
// import { Gallery, Item } from 'react-photoswipe-gallery';
import { GrAddCircle } from "react-icons/gr";
import ModalAddNewSpecialty from './ModalAddNewSpecialty';
import { useEffect, useState } from 'react';
import { handleApiGetListSpecialty } from '../../../../services/adminService';
import { useDispatch, useSelector } from 'react-redux';
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import ModalEditSpecialty from './ModalEditSpecialty';
import ModalDeleteSpecialty from './ModalDeleteSpecialty';
import Pagination from '../../../../components/Pagination';

const AdminSpecialty = () => {
    const userLogin = useSelector(state => state.auth.login.currentUser);

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataEdit, setDataEdit] = useState();
    const [dataDelete, setDataDelete] = useState();
    const [listenChange, setListenChange] = useState(false);

    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(0);

    const handleListenChange = () => {
        setListenChange(!listenChange);
    }

    const dispatch = useDispatch();

    const [listSpecialty, setListSpecialty] = useState();

    const handleClickBtnEdit = (item) => {
        setIsOpenEdit(true);
        setDataEdit(item);
    }
    const handleClickBtnDelete = (item) => {
        setDataDelete(item);
        setIsOpenDelete(true);
    }

    useEffect(() => {
        handleApiGetListSpecialty(dispatch, setListSpecialty, userLogin, currentPage, setTotalPage, setPerPage);
    }, [dispatch, listenChange, currentPage])

    return (
        <div className="section-admin-container">
            <div className="section-admin-content">
                <div className="btn-add-new-container">
                    <div className="btn-add-new"
                        onClick={() => setIsOpenAdd(true)}
                    >
                        <GrAddCircle /> Add new specialty
                    </div>
                    <div className="select-tag">
                        <Select
                            // defaultValue={selectedOption}
                            // onChange={setSelectedOption}
                            // options={listOptionSelect}
                            isClearable={true}
                            placeholder={"Chọn chuyên khoa"}
                        />
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Name</th>
                                {/* <th>Image</th> */}
                                <th>Action</th>
                            </tr>
                            {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1 + (currentPage - 1) * perPage}</td>
                                        <td>{item.name}</td>
                                        {/* <td></td> */}
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => handleClickBtnEdit(item)}
                                            >
                                                <MdModeEdit />
                                            </button>
                                            <button className="btn-delete"
                                                onClick={() => handleClickBtnDelete(item)}
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </td>
                                    </tr>
                                )
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

            <ModalAddNewSpecialty
                isOpenAdd={isOpenAdd}
                setIsOpenAdd={setIsOpenAdd}
                handleListenChange={handleListenChange}
            />
            <ModalEditSpecialty
                isOpenEdit={isOpenEdit}
                setIsOpenEdit={setIsOpenEdit}
                dataEdit={dataEdit}
                handleListenChange={handleListenChange}
            />
            <ModalDeleteSpecialty
                isOpenDelete={isOpenDelete}
                setIsOpenDelete={setIsOpenDelete}
                dataDelete={dataDelete}
                handleListenChange={handleListenChange}
            />
        </div >
    )
}

export default AdminSpecialty;