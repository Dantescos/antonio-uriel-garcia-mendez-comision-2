import  Post  from "../models/post.model.js";

export const ctrlGetPosts = async (req, res) => {
    try {
    const allpost = await Post.find({
      user:req.user.id
    }).populate("user")
    res.status(200).json(allpost)
  } catch (error) {
return res.status(400).json({message: "error al buscar todas las tareas"})
  
    }
     }

export const ctrlCreatePost = async (req, res) => {
    const {title,description } = req.body
    try {
    const newpost = new Post({
      title,
      description,
      user: req.user.id
       })
       const taskSave= await newpost.save()
       res.status(200).json(taskSave)
  } catch (error) {
    return res.status (400).json({ mesasage: "error al crear el post"})
     }
 }

export const ctrlUpdatePosts = async (req, res) => {
try{
  const updatedPost = await Post.findByIdAndUpdate(req.params.id,req.body, {new:true}).populate("user")
  if(!updatedPost) return res.status(404).json({mesasage:"tarea no encontrada"})
  res.status(200).json(updatedPost)
} catch (error){
  return res.status(400).json ({mesasage: "error al actualizar la tarea"})
}
}

export const ctrlDeletePost = async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id)
    if(!deletePost) return Task.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "tarea eliminada"})
  }catch (error){
return res.status(400).json({message: "error al actualizar el post"});
  }
  
 }

export const ctrlGetPost = async (req,res) => {
const{id} = req.params
try{
  const postFound = await Post.findById(id)
  if(!postFound) return res.status(404).json({message:"tarea no encontrada"})
  res.status(200).json(postFound)
  }catch (error){
    return res.status(400).json({message: "error al buscar la tarea"})
  }
 }