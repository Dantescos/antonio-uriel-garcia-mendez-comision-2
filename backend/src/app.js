import express from "express";
import morgan from "morgan";
import cookiParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import helmet from "helmet";
import cors from "cors";
import {connectDB} from "../database/db.js"

 export const app = express();
 connectDB()

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookiParser());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use(helmet());
//app.use("/", indexRoutes);

export default app;
