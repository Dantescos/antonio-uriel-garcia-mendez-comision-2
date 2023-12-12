
import axios from "./setCredentialsAxios";

export const registerRequest  = async  (user) => axios.post(`/register`, user);


export const loginRequest  = async (user) => axios.post(`/login`, user);


export const verifyToken = () => axios.get(`/verifyToken`);