import { useDispatch } from "react-redux";
import { handleApiDeleteFacility } from "../../../../services/adminService";

const ModalDeleteFacility = (props) => {
    const dispatch = useDispatch();
    const { isOpenDelete, setIsOpenDelete, dataDelete, handleListenChange } = props;

    const handleDeleteUser = () => {
        handleApiDeleteFacility(dataDelete.id, dispatch, handleListenChange, setIsOpenDelete);
    }
    return (
        <div style={isOpenDelete ? { display: "block" } : { display: "none" }} className="modal-user modal-delete-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Delete facility</div>
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

export default ModalDeleteFacility;