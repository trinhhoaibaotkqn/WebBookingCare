import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { handleApiLogin } from "../../services/authService";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [eye, setEye] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClickEye = () => {
        setEye(!eye);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        handleApiLogin(userData, toast, dispatch, navigate);
    }

    return (
        <div className="login-background">
            <div className="login-content">
                <div className="login-form-wrap">
                    <NavLink className="home-btn" to="/"><ImHome /></NavLink>
                    <h2>LOGIN</h2>
                    <form className="login-form">
                        <div className="login-element">
                            <input type="email" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-element">
                            <input type={eye ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <span
                                className="icon-hide-password"
                                onClick={() => handleClickEye()}
                            >
                                {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        <div className="login-element">
                            <button onClick={(e) => handleLogin(e)}>Login</button>
                        </div>
                    </form>
                    <div className="create-account-wrap">
                        <p>Not a member? <NavLink className="create-account-btn" to="/register">Create Account</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;