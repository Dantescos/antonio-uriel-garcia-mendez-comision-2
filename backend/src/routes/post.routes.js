import { Router } from "express";
import { authRequired } from "../middlewares/validatorToken.js";
import { ctrlDeletePost,ctrlGetPost, ctrlCreatePost, ctrlUpdatePosts, getPosts  } from "../controllers/post.controller.js";

const routes = Router();

routes.get("/post",authRequired, ctrlGetPost);
routes.get("/post/:id",authRequired, getPosts);
routes.post("/post",authRequired, ctrlCreatePost);
routes.delete("/post/:id", authRequired, ctrlDeletePost);
routes.put("/post/:id",authRequired, ctrlUpdatePosts );

export default routes;
