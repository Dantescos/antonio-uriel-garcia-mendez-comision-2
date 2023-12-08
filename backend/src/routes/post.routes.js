import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";
import {getPosts,ctrlGetPost,ctrlCreatePost,ctrlUpdatePosts,ctrlDeletePost,} from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { createPostSchema } from "../schemas/post.schema.js";

const router = Router();


router.get("/posts", getPosts);
router.get("/posts/:id", ctrlGetPost);
router.post("/posts",authRequired,validateSchema(createPostSchema),ctrlCreatePost);
router.delete("/posts/:id", authRequired, ctrlDeletePost);
router.put("/posts/:id", authRequired, ctrlUpdatePosts);

export default router;
