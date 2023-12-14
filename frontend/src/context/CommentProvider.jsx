import { createContext, useContext, useState } from "react";
import {
  createCommentReq,
  deleteCommentReq,
  getCommentsReq,
  getCommentByIdReq,
  updateCommentReq,
} from "../api/commentAxios.js";
import { usePost } from "./PostProvider.jsx";

// Crear un contexto para manejar los comentarios
const CommentContext = createContext();

// Hook personalizado para consumir el contexto de comentarios
export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("Error en el contexto de los comentarios");
  return context;
};

// Componente proveedor del contexto de comentarios
export const CommentProvider = ({ children }) => {
  // Consumir el contexto de posts para obtener información sobre los comentarios
  const { post } = usePost();

  // Estado local para almacenar la lista de comentarios
  const [comment, setComment] = useState([]);

  // Función para crear un nuevo comentario
  const createComment = async (comment, postId) => {
    try {
      const res = await createCommentReq(comment, postId);
      return res;
    } catch (error) {
      console.error('Error al crear el comentario:', error);
      throw error;
    }
  };

  // Función para obtener todos los comentarios asociados a un post
  const getAllComments = async (postId) => {
    const res = await getCommentsReq(postId);
    try {
      setComment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para eliminar un comentario
  const deleteComment = async (idPost, idComment) => {
    try {
      const res = await deleteCommentReq(idPost, idComment);
      if (res.status === 200) setComment(comment.filter((comment) => comment._id !== idComment));
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener un comentario por su ID
  const getCommentById = async (id) => {
    try {
      const res = await getCommentByIdReq(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar un comentario
  const updateComment = async (comment, idComment, idPost) => {
    try {
      const res = await updateCommentReq(idPost, idComment, comment);
      res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Proporcionar el contexto y sus funciones a los componentes hijos
  return (
    <CommentContext.Provider
      value={{
        comment,
        createComment,
        getAllComments,
        deleteComment,
        getCommentById,
        updateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

// Exportar la función `createCommentReq` por separado
export { createCommentReq };
