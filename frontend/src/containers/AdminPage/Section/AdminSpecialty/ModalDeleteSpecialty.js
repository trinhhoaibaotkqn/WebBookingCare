import { useDispatch, useSelector } from "react-redux";
import { handleApiDeleteSpecialty } from "../../../../services/adminService";

const ModalDeleteSpecialty = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.auth.login.currentUser);
    const { isOpenDelete, setIsOpenDelete, dataDelete, handleListenChange } = props;

    const handleDeleteUser = () => {
        handleApiDeleteSpecialty(dataDelete.id, dispatch, handleListenChange, setIsOpenDelete, userLogin);
    }
    return (
        <div style={isOpenDelete ? { display: "block" } : { display: "none" }} className="modal-user modal-delete-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Delete specialty</div>
                    <span className="close" onClick={() => setIsOpenDelete()}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-element element-title-delete">
                        <h2>Are you sure delete specialty {dataDelete?.name}?</h2>
                    </div>
                    <div className="modal-element element-cancel-btn">
                        <button className="cancel-btn" onClick={() => setIsOpenDelete()}>cancel</button>
                    </div>
                    <div className="modal-element element-add-btn">
                        <button className="add-btn"
                            onClick={() => handleDeleteUser()}
                        >
                            delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteSpecialty;