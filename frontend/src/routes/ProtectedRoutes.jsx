import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

function ProtectedRoutes() {
    // Obtener información sobre la autenticación del contexto
    const { isAuthenticated, user } = useAuth();

    // Verificar si el usuario no está autenticado y redirigir a la página de inicio de sesión
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Renderizar el contenido protegido si el usuario está autenticado
    return <Outlet />;
}

export default ProtectedRoutes;
