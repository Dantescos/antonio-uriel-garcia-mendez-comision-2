import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { token } from "morgan";

export const authrequired = (req, res, next) => {
  const cookies = req.cookie;

  if (!token) return res.status(401).json({ mesage: "no se detecta token" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });

    req.user = user;

    next();
  });
};
