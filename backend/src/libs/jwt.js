import { settingSecretToken } from "../config/config.js";
import jwt from "jsonwebtoken";

const {secret} = settingSecretToken();



//creamos el token
export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

export default createAccessToken;
