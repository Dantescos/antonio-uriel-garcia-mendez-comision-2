 import Post from "../models/post.model.js";


export const getPosts = async (req, res) => {

    try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts" });
  } 
};

export const ctrlCreatePost = async (req, res) => {
  const { title, description, comments, imageURL } = req.body;

  try {
    const newPost = new Post({
      title,
      description,
      comments,
      autor: req.user.id,
      imageURL
    });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al crear el post" });
  }
};


export const ctrlGetPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

export const ctrlUpdatePosts = async (req, res) => {
  const postId = req.params.id;
  const { title, comments, imageURL } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, comments, imageURL },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};


export const ctrlDeletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};