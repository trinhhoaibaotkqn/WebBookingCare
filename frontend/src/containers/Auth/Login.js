import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import "./Login.scss";
import { NavLink } from "react-router-dom";

const Login = () => {

    const [eye, setEye] = useState(false);

    const handleClickEye = () => {
        setEye(!eye);
    }

    return (
        <div className="login-background">
            <div className="login-content">
                <div className="login-form-wrap">
                    <NavLink className="home-btn" to="/"><ImHome /></NavLink>
                    <h2>LOGIN</h2>
                    <form className="login-form">
                        <div className="login-element"><input type="email" placeholder="Email" /></div>
                        <div className="login-element">
                            <input type={eye ? "text" : "password"} placeholder="Password" />
                            <span
                                className="icon-hide-password"
                                onClick={() => handleClickEye()}
                            >
                                {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        <div className="login-element"><button>Login</button></div>
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