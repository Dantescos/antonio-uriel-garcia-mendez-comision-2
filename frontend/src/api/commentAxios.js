import axios from "./setCredentialsAxios.js";

export const getCommentsReq = (postId) => axios.get(`/post/${postId}/comment`)

export const getCommentByIdReq = (postId, commentId) => axios.get(`/post/${postId}/comment/${commentId}`)

export const createCommentReq = (comment, postId) => axios.post(`/post/${postId}/comment`, comment)

export const updateCommentReq = (postId, commentId, comment) => axios.put(`/post/${postId}/comment/${commentId}`, comment)

export const deleteCommentReq = (postId, commentId) => axios.delete(`/post/${postId}/comment/${commentId}`)