import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const IsNotAuthenticated = ({ children }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    if (user) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default IsNotAuthenticated;