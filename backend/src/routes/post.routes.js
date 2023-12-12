import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getPosts,ctrlGetPost,ctrlCreatePost,ctrlUpdatePosts,ctrlDeletePost,} from "../controllers/post.controller.js";


const router = Router();


router.get("/post",authRequired, getPosts);
router.get("/post/:id",authRequired, ctrlGetPost);
router.post("/post",authRequired,ctrlCreatePost);
router.delete("/post/:id", authRequired, ctrlDeletePost);
router.put("/post/:id", authRequired, ctrlUpdatePosts);

export default router;
