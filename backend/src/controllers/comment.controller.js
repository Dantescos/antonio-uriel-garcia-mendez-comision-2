import Comment from "../models/comment.model.js"


export const AllComments = async (req, res) => {
    try {
        const allComments = await Comment.find() 
        if (!allComments) return res.status(404).json({message: "No se encontraron comentarios"})
        res.status(200).json(allComments)
    } catch (error) {
        res.status(400).json({message: "Error al obtener todos los comentarios"})
    }
} 
export const CommentById = async (req, res) => {
    const {id} = req.params

    try {
       const commentFound = await Comment.findById(id)

        if (!commentFound) return res.status(404).json({message: "Comentario no encontrado"})

        res.status(200).json(commentFound)
    } catch (error) {
        res.status(400).json({message: "Error al obtener el comentario por id"})
    }
}

export const createComment = async(req, res) => {
    const {description} = req.body
    const {id} = req.params
    try {
        const newComment = new Comment({
            description: description.description,
            author : req.user.id, 
            from: id,
        })

        const commentSaved = await newComment.save()
        res.status(200).json(commentSaved)

    } catch (error) {
        res.status(400).json({message: "Error al crear comentario"})
    }
}

export const updateComment = async (req, res) => {
    try {
        
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

       
        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permisos para editar este comentario' });
        }

    
        const commentUpdate = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!commentUpdate) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json(commentUpdate);
    } catch (error) {
        res.status(400).json({ message: 'Error al editar comentario' });
    }
};

export const deleteComment = async(req, res) => {
    try {
        
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

     
        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permisos para eliminar este comentario' });
        }

    
        const commentDelete = await Comment.findByIdAndDelete(req.params.id);

        if (!commentDelete) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json(commentDelete);
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar comentario' });
    }
}




