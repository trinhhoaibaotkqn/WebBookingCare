import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaRegAddressBook } from 'react-icons/fa';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImHome } from 'react-icons/im';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    checkValidDataRegister, handleApiRegister
} from "../../services/authService";


import "./Register.scss";

const Register = () => {

    const location = useLocation();
    const doctor = location.state?.doctor;

    const [eye, setEye] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickEye = () => {
        setEye(!eye);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            gender,
            phoneNumber,
            password,
            passwordConfirm,
            address
        }
        const isValid = checkValidDataRegister(userData, toast);
        delete userData.passwordConfirm;
        if (isValid) {
            const registerSuccess = await handleApiRegister(userData, toast, dispatch, navigate, doctor);
            if (doctor && registerSuccess) {
                navigate("/login", {
                    state: {
                        doctor: doctor,
                    }
                });
            }
        }
    }

    return (
        <div className="register-background">
            <div className="register-content">
                <div className="register-form-wrap">
                    <NavLink className="home-btn" to="/"><ImHome /></NavLink>
                    <h2>REGISTER</h2>
                    <form className="register-form">
                        <div className="register-element">
                            <span className="icon-label"><BsPerson /></span>
                            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><AiOutlineMail /></span>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="register-element grid-container">
                            <div className="grid-gender">
                                <span className="icon-label"><BsGenderAmbiguous /></span>
                                <select onChange={(e) => setGender(e.target.value)}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="grid-phone-number">
                                <span className="icon-label-phone"><BsTelephone /></span>
                                <input type="text" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><RiLockPasswordLine /></span>
                            <input type={eye ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <span
                                className="icon-hide-password"
                                onClick={() => handleClickEye()}
                            >
                                {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><RiLockPasswordLine /></span>
                            <input type={eye ? "text" : "password"} placeholder="Confirm password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                            <span
                                className="icon-hide-password"
                                onClick={() => handleClickEye()}
                            >
                                {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><FaRegAddressBook /></span>
                            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="register-element">
                            <button onClick={(e) => handleRegister(e)}>register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;