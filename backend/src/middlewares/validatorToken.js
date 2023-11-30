import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";
import { token } from "morgan";

const {secret} = settingSecretToken();



export const authrequired = (req, res, next) => {

  const {token} = req.cookie;

  if (!token) return res.status(401).json({ mesage: "no se detecta token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });

    req.user = user;

    next();
  });
};
