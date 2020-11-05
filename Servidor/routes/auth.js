//Importamos la librerias de express
const express = require('express');

const {check} = require('express-validator');

//llamamos al controlador 
const authController = require('../controller/authController');  // Nueva Parte

//Importamos la Librerias  de Router 
const router  = express.Router();

//Comunicación Para el controlador 
router.post('/',[
    check('email',     'Debes agregar  un email valido.').isEmail(), //Nueva Parte 
    check('password',  'El password es incorrecto.').isEmpty(), //Nueva Parte 
] , 
authController.autenticarUsuario 
);


router.get('/', 
authController.usuarioAutenticado 
);

module.exports = router;