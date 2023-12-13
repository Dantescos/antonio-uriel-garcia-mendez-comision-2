
import axios from "./setCredentialsAxios";

export const registerRequest  = async  (user) => axios.post(`/register`, user);


export const loginRequest  = async (user) => axios.post(`/login`, user);


export const verifyToken = () => axios.get(`/verifyToken`);

export const findUserById= async(id)=>axios.get(`/finduser/${id}`);