
import {body,validationResult} from 'express-validator'

 export const validateRegister =[
    body("username").notEmpty().withMessage("Username no debe estar vacío").isLength({ min: 6 }).withMessage("El Username debe tener al menos 6 caractéres"),

  body("email").isEmail().withMessage("Por favor ingrese un mail válido"),

  body("password").notEmpty().withMessage("El Password es obligatorio").isLength({ min: 6 }).withMessage("Longitud mínima del password es de 6 caractéres"),

]
export const validateLogin =[
    body("email").isEmail().withMessage("Por favor ingrese un mail válido"),

    body("password").notEmpty().withMessage("El Password es obligatorio").isLength({ min: 6 }).withMessage("Longitud mínima del password es de 6 caractéres"),
]

export const handleErrorValidation = (req,res,next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json([error.errors[0].msg])
}
next()
 }