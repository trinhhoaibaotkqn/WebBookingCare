import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../../utils/CommonUtils';
import { RiFolderUploadLine } from "react-icons/ri";
import { MdOutlineLocalHospital } from "react-icons/md";
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { handleApiEditFacility } from '../../../../services/adminService';

const ModalEditFacility = (props) => {
    let { isOpenEdit, setIsOpenEdit, dataEdit, handleListenChange } = props;

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.auth.login.currentUser);

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [descriptionHTML, setDescriptionHTML] = useState();
    const [descriptionMarkdown, setDescriptionMarkdown] = useState();

    const [previewImgUrl, setPreviewImgUrl] = useState();
    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setPreviewImgUrl(objectUrl);
            setImage(base64);
        }
    }

    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        setDescriptionHTML(html);
        setDescriptionMarkdown(text);
    }

    const handleEditSpecialty = () => {
        const data = {
            name,
            address,
            descriptionHTML,
            descriptionMarkdown
        }
        if (image) {
            data.image = image;
        }
        handleApiEditFacility(dataEdit.id, data, dispatch, handleListenChange, setIsOpenEdit, userLogin);
    }

    useEffect(() => {
        setName(dataEdit?.name);
        setAddress(dataEdit?.address);
        setImage();
        setDescriptionHTML(dataEdit?.descriptionHTML);
        setDescriptionMarkdown(dataEdit?.descriptionMarkdown);
        if (dataEdit && dataEdit.image && dataEdit.image.data) {
            let imageBase64 = new Buffer(dataEdit.image, 'base64').toString('binary');
            setPreviewImgUrl(imageBase64);
        } else {
            setPreviewImgUrl();
        }
    }, [dataEdit])

    return (
        <div style={isOpenEdit ? { display: "block" } : { display: "none" }} className="modal-user modal-addnew-specialty">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="title-modal-header">Edit new specialty</div>
                    <span className="close" onClick={() => setIsOpenEdit(false)}>&times;</span>
                </div>
                <div className="modal-body">
                    <div className="modal-element name-facility">
                        <span className="modal-icon-label"><MdOutlineLocalHospital /></span>
                        <input placeholder='Name' value={name ? name : ""} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="modal-element address-facility">
                        <span className="modal-icon-label"><MdOutlineLocalHospital /></span>
                        <input placeholder='Address' value={address ? address : ""} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="modal-element element-image-specialty">
                        <div id="image-user">
                            <input id="previewImg-edit" type="file" style={{ display: "none" }}
                                onChange={(e) => { handleOnChangeImage(e) }}
                            />
                            <label className="label-upload" htmlFor="previewImg-edit"><RiFolderUploadLine /> Upload</label>
                            <div className="preview-image">
                                <Gallery>
                                    <Item
                                        original={previewImgUrl}
                                        width="1024"
                                        height="768"
                                    >
                                        {({ ref, open }) => (
                                            <img alt="avatar" ref={ref} onClick={open} src={previewImgUrl} width="220px" />
                                        )}
                                    </Item>
                                </Gallery>
                            </div>
                        </div>
                    </div>
                    <div className="modal-element markdow-specialty">
                        <MdEditor
                            style={{ height: '60vh', margin: '0 10px 10px 10px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>

                    <div className="modal-element element-btn">
                        <button className="cancel-btn" onClick={() => setIsOpenEdit(false)}>cancel</button>
                        <button className="add-btn" onClick={() => handleEditSpecialty()}>edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditFacility;