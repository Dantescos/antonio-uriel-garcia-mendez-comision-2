import axios from "./setCredentialsAxios";
//aun no logro hacer funcional los comentarios por algun motivo me fallan las rutas 
// Obtener comentarios para un post específico
export const getCommentsReq = async (postId) => {
  try {
    const response = await axios.get(`/post/${postId}/comment`);
    return response.data;
  } catch (error) {
    // Captura cualquier error y lo lanza para que pueda ser manejado en el código que utiliza esta función
    throw error;
  }
}

// Obtener un comentario por ID para un post específico
export const getCommentByIdReq = async (postId, commentId) => {
  try {
    const response = await axios.get(`/post/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    // Captura cualquier error y lo lanza para que pueda ser manejado en el código que utiliza esta función
    throw error;
  }
}

// Crear un nuevo comentario para un post específico
export const createCommentReq = async (newComment , postId) => {
  try {
    if (postId) {
      const url = `/post/${postId}/comment`;
      console.log('URL de la solicitud:', url);
      const response = await axios.post(url, newComment);
      return response.data;
    } else {
      console.error('Error: postId is undefined.');
      return null;
    }
  } catch (error) {
    console.error('Error en createCommentReq:', error);
    throw error;
  }
};

// Actualizar un comentario por ID para un post específico
export const updateCommentReq = async (postId, commentId, comment) => {
  try {
    const response = await axios.put(`/post/${postId}/comment/${commentId}`, comment);
    return response.data;
  } catch (error) {
    // Captura cualquier error y lo lanza para que pueda ser manejado en el código que utiliza esta función
    throw error;
  }
}

// Eliminar un comentario por ID para un post específico
export const deleteCommentReq = async (postId, commentId) => {
  try {
    const response = await axios.delete(`/post/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    // Captura cualquier error y lo lanza para que pueda ser manejado en el código que utiliza esta función
    throw error;
  }
}