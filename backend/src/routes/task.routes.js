import { Router } from "express";
import { authrequired } from "../middlewares/validatorToken.js";

const router = Router();

router.get("/tasks",authrequired,)
router.get("/tasks/id",authrequired,)
router.post("/tasks",authrequired,)
router.delete("/tasks/:id",authrequired,)
router.put("/tasks/:id",authrequired,)
export default router