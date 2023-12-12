import { json } from "express"
import Post from "../models/post.model.js"

export const getPosts = async(req, res) => {
    try {
        const allpost = await Post.find() 
        res.status(200).json(allpost)
    } catch (error) {
        res.status(400).json({message: "Error al obtener todos los posteos"})
    }
} 

export const ctrlGetPost = async(req, res) => {
    const {id} = req.params

    try {
       const postFound = await Post.findById(id)

        if (!postFound) return res.status(404).json({message: "Posteo no encontrado"})

        res.status(200).json(postFound)
    } catch (error) {
        res.status(400).json({message: "Error al obtener el posteo por id"})
    }
}

export const ctrlCreatePost = async(req, res) => {
    const {title, description, imgURL} = req.body
    try {
        const newPost = new Post({
            title,
            description,
            imgURL,
            autor: req.user.id 
        })

        const postSaved = await newPost.save()
        res.status(200).json(postSaved)

    } catch (error) {
        res.status(400).json({message: "Error al crear posteo"})
    }
}

export const ctrlUpdatePosts = async(req, res) => {
    try {
        const postUpdate = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!postUpdate) return res.status(404).json({message: "Posteo no encontrado"})

        res.status(200).json(postUpdate)
    } catch (error) {
                res.status(400).json({message: "Error al editar posteo"})
    }
}

export const ctrlDeletePost = async(req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id)

        if (!deletePost) return res.status(404).json({message: "Posteo no encontrado"})
        res.status(200).json({message: "Posteo eliminado con éxito"})
    } catch (error) {
        res.status(400).json({message: "Error al eliminar posteo", error})
    }
}