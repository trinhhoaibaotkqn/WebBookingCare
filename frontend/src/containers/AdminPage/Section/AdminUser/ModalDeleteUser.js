const ModalDeleteUser = (props) => {

    const { modalDelete, handleModalDelete } = props;
    return (
        <div style={modalDelete ? { display: "block" } : { display: "none" }} className="modal-user modal-delete-user">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Delete user</div>
                    <span className="close" onClick={() => handleModalDelete()}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-element element-title-delete">
                        <h2>Are you sure delete this user?</h2>
                    </div>
                    <div className="modal-element element-cancel-btn">
                        <button className="cancel-btn" onClick={() => handleModalDelete()}>cancel</button>
                    </div>
                    <div className="modal-element element-add-btn">
                        <button className="add-btn">add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteUser;