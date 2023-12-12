import express from "express";
import morgan from "morgan";
import CookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comments.routes.js"
import postRouter from "./routes/post.routes.js";

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
app.use("/api", postRouter);
app.use(helmet());
app.use(authRoutes)
app.use(postRoutes)
app.use(commentRoutes)

export default app;
