import { useDispatch, useSelector } from "react-redux";
import { handleApiDeleteUser } from "../../../../services/adminService";

const ModalDeleteUser = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.auth.login.currentUser);
    const { modalDelete, handleModalDelete, dataDelete, handleListenChange } = props;

    const handleDeleteUser = () => {
        handleApiDeleteUser(dataDelete.id, dispatch, handleListenChange, userLogin);
        handleModalDelete();
    }
    return (
        <div style={modalDelete ? { display: "block" } : { display: "none" }} className="modal-user modal-delete-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Delete user</div>
                    <span className="close" onClick={() => handleModalDelete()}>&times;</span>
                </div>
                <div className="modal-body">
                    {dataDelete ?
                        <div className="modal-element element-title-delete">
                            <h2>Are you sure delete {dataDelete.name}?</h2>
                        </div>
                        : <></>
                    }
                    <div className="modal-element element-cancel-btn">
                        <button className="cancel-btn" onClick={() => handleModalDelete()}>cancel</button>
                    </div>
                    <div className="modal-element element-add-btn">
                        <button className="add-btn"
                            onClick={() => handleDeleteUser()}
                        >delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteUser;