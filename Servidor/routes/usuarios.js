//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const usuarioController = require('../controller/usuarioCotroller');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//End-Point - Crear usuario 
router.post('/',[
    check('nombre',    'El nombre es obligatorio.').not().isEmpty(), //Nueva Parte 
    check('email',     'Debes agregar  un email valido.').isEmail(), //Nueva Parte 
    check('password',  'El password debe ser de al menos 6 caracteres.').isLength({min:6}), //Nueva Parte 
] , 
    usuarioController.nuevoUsuario 
);

module.exports = router;