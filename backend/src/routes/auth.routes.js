// Endpoint from server
import { Router } from "express";
import {register, login, logout, profile, verifyToken} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import {validateLogin, validateRegister, handleErrorValidation} from "../middlewares/validateAtribute.js"

const router = Router()


router.post("/register", validateRegister, handleErrorValidation,register)


router.post("/login", validateLogin, handleErrorValidation, login)


router.post("/logout", logout)


router.get("/verifyToken", verifyToken)

router.get("/profile", authRequired, profile)

export default router