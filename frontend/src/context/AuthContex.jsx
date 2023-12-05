import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest , verifyToken } from "../api/auth";
import Cookies from "js-cookie";


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
  
  const[loading , setLoading] = useState(true)




 const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors(error.response.data)
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };



  useEffect(() => {
    if (errors && errors.length > 0) {
       const timer = setTimeout(() => {
         setErrors([]);
       }, 5000);
       return () => clearTimeout(timer);
    }
   }, [errors]);

  useEffect(() => {
    async function verifyLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return setUser(null);
         }
        try {
          const res = await verifyToken(cookies.token);
          if (!res.data) return setIsAuthenticated(false);
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setLoading(false)
        }
      }
    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout,loading, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

