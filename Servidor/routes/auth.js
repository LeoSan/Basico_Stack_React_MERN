//Importamos la librerias de express {Tres paquetes fundamentales para los router }
const express = require('express');
const router  = express.Router();
const {check} = require('express-validator');

//llamamos al controlador 
const authController = require('../controller/authController');  // Nueva Parte

//Importamos midle 
const auth = require('../middleware/auth');


//Comunicación Para el controlador 
router.post('/',[
    check('email',     'Debes agregar  un email valido.').isEmail(), //Nueva Parte 
    check('password',  'El password es incorrecto.').isEmpty(), //Nueva Parte 
] , 
authController.autenticarUsuario 
);


router.get('/',
    auth,//Pieza de código   
    authController.usuarioAutenticado 
);

module.exports = router;