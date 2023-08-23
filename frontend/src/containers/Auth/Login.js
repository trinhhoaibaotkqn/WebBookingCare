import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import "./Login.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { handleApiLoginUser, navigateUserAfterLogin } from "../../services/authService";
import Loading from "../../components/Loading";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const doctor = location?.state?.doctor;

    const [eye, setEye] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClickEye = () => {
        setEye(!eye);
    }

    const handleLogin = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const userData = {
            email,
            password
        };
        let userLoggedIn = await handleApiLoginUser(userData, toast, dispatch);
        if (userLoggedIn)
            navigateUserAfterLogin(doctor, userLoggedIn, navigate);
        setIsLoading(false);
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
                        <div>Not a member? </div>
                        <div className="create-account-btn"
                            onClick={() => navigate("/register", { state: { doctor: doctor } })}
                        >
                            Create Account
                        </div>
                    </div>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default Login;