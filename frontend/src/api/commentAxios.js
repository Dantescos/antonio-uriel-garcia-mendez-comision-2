// commentApi.js
import axios from "./setCredentialsAxios.js";

export const getCommentsReq = async (postId) => {
  try {
    const response = await axios.get(`/post/${postId}/comment`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error; 
  }
}

export const getCommentByIdReq = async (postId, commentId) => {
  try {
    const response = await axios.get(`/post/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentario por ID:', error);
    throw error;
  }
}

export const createCommentReq = async (comment, postId) => {
  try {
    const response = await axios.post(`/post/${postId}/comment`, comment);
    return response.data;
  } catch (error) {
    console.error('Error al crear comentario:', error);
    throw error;
  }
}

export const updateCommentReq = async (postId, commentId, comment) => {
  try {
    const response = await axios.put(`/post/${postId}/comment/${commentId}`, comment);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    throw error;
  }
}

export const deleteCommentReq = async (postId, commentId) => {
  try {
    const response = await axios.delete(`/post/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    throw error;
  }
}
