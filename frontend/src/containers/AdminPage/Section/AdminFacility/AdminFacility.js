import Select from 'react-select';
import 'photoswipe/dist/photoswipe.css';
// import { Gallery, Item } from 'react-photoswipe-gallery';
import { GrAddCircle } from "react-icons/gr";
import ModalAddNewFacility from './ModalAddNewFacility';
import { useEffect, useState } from 'react';
import { handleApiGetListFacility } from '../../../../services/adminService';
import { useDispatch } from 'react-redux';
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import ModalEditFacility from './ModalEditFacility';
import ModalDeleteFacility from './ModalDeleteFacility';

const AdminFacility = () => {

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [dataEdit, setDataEdit] = useState();
    const [dataDelete, setDataDelete] = useState();
    const [listenChange, setListenChange] = useState(false);

    const handleListenChange = () => {
        setListenChange(!listenChange);
    }

    const dispatch = useDispatch();

    const [listFacility, setListFacility] = useState();

    const handleClickBtnEdit = (item) => {
        setIsOpenEdit(true);
        setDataEdit(item);
    }
    const handleClickBtnDelete = (item) => {
        setDataDelete(item);
        setIsOpenDelete(true);
    }

    useEffect(() => {
        handleApiGetListFacility(dispatch, setListFacility)
    }, [dispatch, listenChange])

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
                                <th>Address</th>
                                {/* <th>Image</th> */}
                                <th>Action</th>
                            </tr>
                            {listFacility && listFacility.length > 0 && listFacility.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
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
            <ModalAddNewFacility
                isOpenAdd={isOpenAdd}
                setIsOpenAdd={setIsOpenAdd}
                handleListenChange={handleListenChange}
            />
            <ModalEditFacility
                isOpenEdit={isOpenEdit}
                setIsOpenEdit={setIsOpenEdit}
                dataEdit={dataEdit}
                handleListenChange={handleListenChange}
            />
            <ModalDeleteFacility
                isOpenDelete={isOpenDelete}
                setIsOpenDelete={setIsOpenDelete}
                dataDelete={dataDelete}
                handleListenChange={handleListenChange}
            />
        </div >
    )
}

export default AdminFacility;