import axios from "axios";

// Crea una instancia de axios con configuraciones personalizadas
const instance = axios.create({
  // Establece la URL base para todas las solicitudes
  baseURL: "http://localhost:3200/api",

  // Habilita el envío de credenciales (cookies, encabezados de autorización) en las solicitudes
  withCredentials: true,
});

// Exporta la instancia de axios configurada
export default instance;
