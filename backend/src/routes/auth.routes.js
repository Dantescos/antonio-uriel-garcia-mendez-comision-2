import { Router } from "express";
import {login, register, logout,profile,} from "../controllers/auth.controller.js";
import { authrequired } from "../middlewares/validatorToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const routes = Router();

routes.post("/register", validateSchema(registerSchema), register);

routes.post("/login", validateSchema(loginSchema), login);

routes.post("/logout", logout);

routes.get("/profile", authrequired, profile);

export default routes;
