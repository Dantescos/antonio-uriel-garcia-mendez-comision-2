import { body } from "express-validator";

 export const createPostschema= [
    body('title')
    .isString().withMessage('Debe colorcar un titulo valido')
    .notEmpty().withMessage('No puede dejar su titulo vacio'),
    body('content')
    .isString().withMessage('Debe colorcar su contenido')
    .notEmpty().withMessage('el contenido no puede estar vacio'),
    body('imageUrl')
    .optional()
    .isURL()
    .withMessage('ingrese una url valida')
   

]
export const editorPostschema= [
    body('title')
    .optional()
    .isString().withMessage('Debe colocar un titulo valido')
    .notEmpty().withMessage('no debe ser vacio'),
    body('content')
    .optional()
    .isString().withMessage('debe ser string')
    .notEmpty().withMessage('no debe ser vacio'),
    body('imageUrl')
    .optional()
    .isURL().withMessage('ingrese una url valida')
    .notEmpty().withMessage('no debe ser vacio'),

]
