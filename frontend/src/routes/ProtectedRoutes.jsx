import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex"



function ProtectedRoutes() {
    const { isAuthenticated, user } = useAuth();

    if(!isAuthenticated)return <Navigate to= "/login" replace/>
    if (!isAuthenticated) return <Navigate to="/login"/>

    return <Outlet/>


}

export default ProtectedRoutes