
import {body,validationResult} from 'express-validator'

 export const validateRegister =[
    body("username").notEmpty().withMessage("el nombre de usuario no debe estar vacio ").isLength({min:6}).withMessage("el minimo de largo es 6 caracteres "),

    body("email").notEmpty().withMessage("email no puede estar vacio").isEmail().withMessage("ingrese un mail valido"),

    body("password").notEmpty().withMessage("el password no puede estar vacio ").isLength({min:6}).withMessage("el minimo de largo es 6 caracteres ")

]
export const validateLogin =[
    body("username").notEmpty().withMessage("el nombre de usuario no debe estar vacio ").isLength({min:6}).withMessage("el minimo de largo es 6 caracteres "),

    body("email").notEmpty().withMessage("email no puede estar vacio").isEmail().withMessage("ingrese un mail valido"),

    body("password").notEmpty().withMessage("el password no puede estar vacio ").isLength({min:6}).withMessage("el minimo de largo es 6 caracteres ")

]

export const handleErrorValidation = (req,res,next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({message:"errror en la valiacion de atributos"})
}
next()
 }