// Importa la instancia de axios configurada con las credenciales
import axios from "./setCredentialsAxios.js";

// Función para obtener todos los posts
export const getPostsReq = () => axios.get("/post");

// Función para obtener un post por su ID
export const getPostByIdReq = (id) => axios.get(`/post/${id}`);

// Función para crear un nuevo post
export const createPostReq = (post) => axios.post("/post", post);

// Función para actualizar un post por su ID
export const updatePostReq = (id, post) => axios.put(`/post/${id}`, post);

// Función para eliminar un post por su ID
export const deletePostReq = (id) => axios.delete(`/post/${id}`);
