import jwt from "jsonwebtoken"
import {settingSecretToken} from "../config/config.js"

const {secret} = settingSecretToken()

export const authenticated = (req, res, next) => {

    const {token} = req.cookies
    if (!token) return res.status(401).json({message: "Acceso no autorizado, no posee token"})

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({message: "Token invalido"})
        req.user = user
    })

    next()
}