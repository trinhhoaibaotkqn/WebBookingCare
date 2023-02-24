import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaRegAddressBook } from 'react-icons/fa';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { ImHome } from 'react-icons/im';
import { NavLink } from "react-router-dom";

import "./Register.scss";

const Register = () => {

    const [eye, setEye] = useState(false);

    const handleClickEye = () => {
        setEye(!eye);
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
                            <input type="text" placeholder="Name" />
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><AiOutlineMail /></span>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="register-element grid-container">
                            <div className="grid-gender">
                                <span className="icon-label"><BsGenderAmbiguous /></span>
                                <select>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="grid-phone-number">
                                <span className="icon-label-phone"><BsTelephone /></span>
                                <input type="text" placeholder="Phone number" />
                            </div>
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><RiLockPasswordLine /></span>
                            <input type={eye ? "text" : "password"} placeholder="Password" />
                            <span
                                className="icon-hide-password"
                                onClick={() => handleClickEye()}
                            >
                                {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><RiLockPasswordLine /></span>
                            <input type={eye ? "text" : "password"} placeholder="Confirm password" />
                            <span
                                className="icon-hide-password"
                                onClick={() => handleClickEye()}
                            >
                                {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        <div className="register-element">
                            <span className="icon-label"><FaRegAddressBook /></span>
                            <input type="text" placeholder="Address" />
                        </div>
                        <div className="register-element"><button>register</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;