import Comment from "../models/comment.model.js";
import User from "../models/usuarios.modelo.js";
import Post from "../models/post.model.js";


const checkUserExistence = async (userId, res) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return false;
  }
  return true;
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

export const getComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el comentario" });
  }
};

export const createComment = async (req, res) => {
  try {
    const { autor, description } = req.body;
    const postId = req.params.postId;

    // Consultar si el autor existe
    const existingUser = await User.findById(autor);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

 
    const newComment = new Comment({ autor, description, post: postId });
    
    
    const commentSaved = await newComment.save();

   
    existingPost.comments.push(commentSaved._id);
    

    await existingPost.save();

    res.status(201).json(commentSaved);
  } catch (error) {
    console.error("Error al crear un nuevo comentario:", error);
    res.status(400).json({ message: "Error al crear un nuevo comentario", details: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
};