import { createContext, useContext, useState } from "react";
import { createPostReq, deletePostReq, getPostByIdReq, getPostsReq, updatePostReq } from "../api/postAxios.js";

// Crear un contexto para manejar los posteos
const PostContext = createContext();

// Hook personalizado para consumir el contexto de posteos
export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) throw new Error("Error en el contexto de los posteos");
    return context;
};

// Componente proveedor del contexto de posteos
export const PostProvider = ({ children }) => {
    // Estado local para almacenar la lista de posteos
    const [post, setPost] = useState([]);

    // Función para crear un nuevo posteo
    const createPost = async (post) => {
        const res = await createPostReq(post);
    };

    // Función para obtener todos los posteos
    const getAllPost = async () => {
        const res = await getPostsReq();
        try {
            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Función para eliminar un posteo
    const deletePost = async (id) => {
        try {
            const res = await deletePostReq(id);
            if (res.status === 200) setPost(post.filter((post) => post._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    // Función para obtener un posteo por su ID
    const getPostById = async (id) => {
        try {
            const res = await getPostByIdReq(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    // Función para actualizar un posteo
    const updatePost = async (id, post) => {
        try {
            const res = await updatePostReq(id, post);
            res.data;
        } catch (error) {
            console.log(error);
        }
    };

    // Proporcionar el contexto y sus funciones a los componentes hijos
    return (
        <PostContext.Provider
            value={{
                post,
                createPost,
                getAllPost,
                deletePost,
                getPostById,
                updatePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
