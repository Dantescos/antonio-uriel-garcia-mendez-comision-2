import axios from "./setCredentialsAxios.js";

const API = "http://localhost:3200";

export const registerRequest = (user) => axios.post(`${API}/register`, user);
export const loginRequest = (user) => axios.post(`${API}/login`, user);
export const verifyToken = (user) => axios.post(`${API}/login`, user);