import express from "express";
import morgan from "morgan";
import CookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import helmet from "helmet";
import cors from "cors";
import {connectDB} from "../database/db.js"
import {indexRoutes} from "../src/routes/index.routes.js";
import PostRouter from "./routes/post.routes.js";

 export const app = express();


app.use(
    cors({
      origin: "http://localhost:5173",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(CookieParser());
app.options('*', cors());
app.use("/api", authRoutes);
app.use("/api/posts", PostRouter);
app.use(helmet());
app.use("/", indexRoutes);

export default app;
