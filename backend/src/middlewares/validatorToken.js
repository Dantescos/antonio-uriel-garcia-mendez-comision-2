import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";


const {secret} = settingSecretToken();



export const authRequired = (req, res, next) => {

  const {token} = req.cookie;

  if (!token) return res.status(401).json({ mesage: "no se detecta token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });

    req.user = user;

    next();
  });
};
