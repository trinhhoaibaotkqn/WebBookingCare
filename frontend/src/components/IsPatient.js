import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const IsPatient = ({ children }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    if (!user || user.roleid !== "R3") {
        return <Navigate to="/" replace />
    }
    if (user.roleid === "R3")
        return children;
}

export default IsPatient;