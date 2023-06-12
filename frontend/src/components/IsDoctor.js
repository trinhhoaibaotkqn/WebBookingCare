import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const IsDoctor = ({ children }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    if (!user) {
        return <Navigate to="/" replace />
    }
    if (user.roleid === "R2")
        return children;
}

export default IsDoctor;