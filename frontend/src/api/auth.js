// Importar axios configurado con credenciales
import axios from "./setCredentialsAxios";

// Función para realizar una solicitud de registro
export const registerRequest = async (user) => axios.post(`/register`, user);

// Función para realizar una solicitud de inicio de sesión
export const loginRequest = async (user) => axios.post(`/login`, user);

// Función para verificar el token del usuario actual
export const verifyToken = () => axios.get(`/verifyToken`);


