import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";


const {secret} = settingSecretToken();


export const authRequired = (payload) => { 
  return new Promise((resolve, reject) => {

      jwt.sign(payload, secret, {expiresIn: "10h"}, (err, token) => {
              err ? reject(err) : resolve(token)
          }
      )
  })
}