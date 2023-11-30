import { Router } from "express";
import { authrequired } from "../middlewares/validatorToken.js";
import { ctrlDeletePost,ctrlGetPost, ctrlCreatePost, ctrlUpdatePosts , ctrlGetPosts } from "../controllers/post.controller.js";

const routes = Router();

routes.get("/post",authrequired, ctrlGetPosts);
routes.get("/post/:id",authrequired, ctrlGetPost);
routes.post("/post",authrequired, ctrlCreatePost);
routes.delete("/post/:id", authrequired, ctrlDeletePost);
routes.put("/post/:id",authrequired, ctrlUpdatePosts );

export default routes;
