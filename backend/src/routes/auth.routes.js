import { Router } from "express";
import {login, register, logout,profile,} from "../controllers/auth.controller.js";
import { validateRegister , validateLogin , handleErrorValidation } from "../middlewares/validateAtribute.js";
import { authrequired } from "../middlewares/validatorToken.js";

const routes = Router();

routes.post("/register", validateRegister,handleErrorValidation, register);

routes.post("/login", validateLogin,handleErrorValidation, login);

routes.post("/logout", logout);

routes.get("/profile", authrequired , profile);

export default routes;
