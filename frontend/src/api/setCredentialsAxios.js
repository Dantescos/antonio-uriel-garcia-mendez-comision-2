import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3200",
  withCredentials: true,
});

export default instance;
