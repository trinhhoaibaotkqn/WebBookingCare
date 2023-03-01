import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const IsAuthenticated = ({ children }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    if (!user) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default IsAuthenticated;