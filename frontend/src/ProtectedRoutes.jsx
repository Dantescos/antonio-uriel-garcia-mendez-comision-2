import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContex"



function ProtectedRoutes() {
    const { isAuthenticated, loading } = useAuth();

    if(!isAuthenticated)return <Navigate to= "/login" replace/>
    if(!loading && !isAuthenticated) return <Navigate to= "/login" replace/>
  return <Outlet/>

}

export default ProtectedRoutes