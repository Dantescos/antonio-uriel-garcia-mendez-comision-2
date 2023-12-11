import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";


const {secret} = settingSecretToken();



export const authRequired = (req, res, next) => {

  const {token} = req.cookies;

  if (!token) return res.status(401).json({ message: "no se detecta token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "invalido token" });

    req.user = user;

    next();
  });
};
