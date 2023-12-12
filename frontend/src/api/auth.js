
import axios from "./setCredentialsAxios";

export const registerReq = (user) => axios.post(`/register`, user);


export const loginReq = (user) => axios.post(`/login`, user);


export const verifyToken = () => axios.get(`/verifyToken`);