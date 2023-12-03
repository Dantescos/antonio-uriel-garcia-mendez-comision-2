import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar en el provider");
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [errors, setErrors] = useState([]);



  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setErrors(error.response.data);
      } else if (error.request) {
        console.error("Error durante la solicitud:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signout = () => {
    
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
 
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, signout, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

