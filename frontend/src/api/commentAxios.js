import axios from "./setCredentialsAxios";

export const getCommentsReq = async (postId) => {
  try {
    const response = await axios.get(`/post/${postId}/comment`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCommentByIdReq = async (postId, commentId) => {
  try {
    const response = await axios.get(`/post/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createCommentReq = async (comment, postId) => {
  try {
    const response = await axios.post(`/post/${postId}/comment`, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateCommentReq = async (postId, commentId, comment) => {
  try {
    const response = await axios.put(`/post/${postId}/comment/${commentId}`, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteCommentReq = async (postId, commentId) => {
  try {
    const response = await axios.delete(`/post/${postId}/comment/${commentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}