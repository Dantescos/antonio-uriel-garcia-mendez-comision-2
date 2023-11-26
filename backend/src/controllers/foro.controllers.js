import { postModels } from "../models/postModel.js";


export const ctrlView = async (req , res) =>{
  try {
    const posts = await postModels.findAll();
  return res.render('posts.ejs',{posts})

} catch (error) {
  console.error(error);
  return res.status(500).json({
    mesasage: "error server",
  });
}
 }
export const ctrlGetPost = async (req, res) => {
  try {
    const posts = await postModels.findAll();
    if (!posts) return res.status(404);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mesasage: "error server",
    });
  }
};
export const ctrlCreatePost = async (req, res) => {
  try {
    const newPost = await postModels.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error server",
    });
  }
};
export const ctrlUpdatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const posteditor = await postModels.findByPk(id);
    if (!posteditor) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }
    posteditor.update(req.body);
    return res.status(200).json(posteditor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error Server",
    });
  }
};
export const ctrlDeletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const PostDeleted = await postModels.destroy({
      where: {
        id: id,
      },
    });
    if (!PostDeleted) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }
    return res.status(200).json({
      message: "Tarea eliminada",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error server",
    });
  }
};
