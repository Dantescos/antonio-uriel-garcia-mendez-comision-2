import { createContext, useContext, useState } from "react";
import { createCommentReq,deleteCommentReq, getCommentsReq, getCommentByIdReq, updateCommentReq} from "../api/commentAxios.js"
import { usePost } from "./PostProvider.jsx";


const CommentContext = createContext()

export const useComment = () => {
    const context = useContext(CommentContext)
    if(!context) throw new Error("Error en el contexto de los commentarios")
    return context
}

export const CommentProvider = ({children}) => {

    const {post} = usePost()

    const [comment, setComment] = useState([])

 
    const createComment = async (comment, postId) => {
        console.log("idpost:", postId)
        console.log("newcomment: ",comment)
        try {
            const res = await createCommentReq(comment, postId)
            return res
        } catch (error) {
            console.error('Error al crear el comentario:', error);
            throw error;
        }
    }

    const getAllComments = async (postId) => {
       
        const res = await getCommentsReq(postId)
        try {
            setComment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    
    const deleteComment = async (id) => {
        try {
          const res = await deleteCommentReq(id)
          if (res.status === 200) setComment(comment.filter((comment) => comment._id !== id))
        } catch (error) {
          console.log(error)
        }
      };

    const getCommentById = async (id) => {
        try {
        const res = await getCommentByIdReq(id)
        return res.data
        } catch (error) {
        console.log(error)
        }
    };


    const updateComment = async (id, comment) => {
        try {
        const res = await updateCommentReq(id, comment)
        res.data
        } catch (error) {
        console.log(error)
        }
    };



    return <CommentContext.Provider value={{
        comment,
        createComment,
        getAllComments,
        deleteComment,
        getCommentById,
        updateComment,
        }}>

            {children}
        
    </CommentContext.Provider>
}

export { createCommentReq };