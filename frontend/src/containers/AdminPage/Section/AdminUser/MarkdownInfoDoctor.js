import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleApiSaveInfoDoctor } from '../../../../services/adminService';

const MarkdownInfoDoctor = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const doctor = location.state.doctor;
    const infoDoctor = location.state.infoDoctor;

    const [description, setDescription] = useState();
    const [contentHTML, setContentHTML] = useState();
    const [contentMarkdown, setContentMarkdown] = useState();

    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleSaveMarkdown = () => {
        const content = {
            contentHTML,
            contentMarkdown,
            description,
            doctorId: doctor.id
        }
        handleApiSaveInfoDoctor(content, dispatch, navigate);
    }

    useEffect(() => {
        setDescription(infoDoctor.description);
        setContentHTML(infoDoctor.contentHTML);
        setContentMarkdown(infoDoctor.contentMarkdown)
    }, [infoDoctor])

    return (
        <div className="markdown-background">
            <div className="btn-container">
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{doctor.name}</td>
                            <th>Email</th>
                            <td>{doctor.email}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn-markdown btn-save-markdown"
                    onClick={() => navigate("/system/admin/user")}
                >
                    Cancel
                </button>
                <button className="btn-markdown btn-cancel-markdown"
                    onClick={() => handleSaveMarkdown()}
                >
                    Save
                </button>
            </div>
            <div className='text-description'>
                <div >Description about doctor:</div>
                <textarea rows="4" cols="150"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
                >
                </textarea>
            </div>
            <div className="markdown-container">
                <MdEditor
                    style={{ height: '70vh', margin: '0 10px 10px 10px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />
            </div>
        </div>
    )
}
export default MarkdownInfoDoctor;