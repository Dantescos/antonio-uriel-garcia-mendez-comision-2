import {Router} from "express"
import { authenticated } from "../middlewares/validateToken.js"
import { createComment, deleteComment, AllComments, CommentById, updateComment } from "../controllers/comment.controller.js"



const routes = Router()

routes.get("/post/:id/comment", AllComments)
routes.get("/post/:id/comment/:id", authenticated, CommentById)
routes.post("/post/:id/comment", authenticated, createComment)
routes.put("/post/:id/comment/:id", authenticated, updateComment)
routes.delete("/post/:id/comment/:id", authenticated, deleteComment)

export default routes