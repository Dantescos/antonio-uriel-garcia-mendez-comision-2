import axios from "./setCredentialsAxios.js";

const API = "http://localhost:3200";

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyToken = (user) => axios.post(`/login`, user);
