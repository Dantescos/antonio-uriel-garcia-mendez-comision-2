import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyToken } from "../api/auth";
import Cookies from "js-cookie";

// Crear un contexto para manejar la autenticación
export const AuthContext = createContext();

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar en el provider");
  return context;
};

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado local para el usuario, estado de autenticación, errores y datos del token
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [tokenData, setTokenData] = useState(null);

  // Función para realizar el registro de un nuevo usuario
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  // Función para iniciar sesión
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error.response?.data);
      console.error(error);
      setErrors(error.response.data);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Limpieza de errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Verificación de la sesión del usuario al cargar la página
  useEffect(() => {
    async function verifyLogin() {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          if (res.data) {
            setIsAuthenticated(true);
            setUser(res.data);
            setTokenData(res.data);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    verifyLogin();
  }, []);

  // Proporcionar el contexto y sus funciones a los componentes hijos
  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, isAuthenticated, errors, tokenData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
