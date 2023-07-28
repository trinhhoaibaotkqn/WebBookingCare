import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const IsAdmin = ({ children }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    if (!user || user.roleid !== "R1") {
        return <Navigate to="/" replace />
    }
    if (user.roleid === "R1")
        return children;
}

export default IsAdmin;