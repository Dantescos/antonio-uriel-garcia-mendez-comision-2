import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";
import {getPosts,ctrlGetPost,ctrlCreatePost,ctrlUpdatePosts,ctrlDeletePost,} from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { createPostSchema } from "../schemas/post.schema.js";

const router = Router();


router.get("/post",authRequired, getPosts);
router.get("/post/:id",authRequired, ctrlGetPost);
router.post("/post",authRequired,validateSchema(createPostSchema),ctrlCreatePost);
router.delete("/post/:id", authRequired, ctrlDeletePost);
router.put("/post/:id", authRequired, ctrlUpdatePosts);

export default router;
