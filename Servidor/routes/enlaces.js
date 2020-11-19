//Importamos la librerias de express {Estas  tres  librerias  son esenciales para el router}
const express = require('express');
const {check} = require('express-validator');
const router  = express.Router();

//Importamos midleware para validar nuestra auterización  
const auth = require('../middleware/auth');

//llamamos al controlador 
const enlaController = require('../controller/enlacesController');  // Nueva Parte
const archivoController = require('../controller/archivosController');  // Nueva Parte


//Creaos  nuestro  end-point y nuestra comunicaciòn con el controlador 
router.post('/'
    ,[
        check('nombre', 'Sube un archivo').not().isEmpty(), 
        check('nombre_original', 'Sube un archivo').not().isEmpty(), 

    ]
    , auth 
    , enlaController.nuevoEnlace
);

//Creaos  nuestro  end-point y nuestra comunicaciòn con el controlador 
router.get('/:url'
    , enlaController.obtenerEnlace
    , archivoController.eliminarArchivo
);



module.exports = router;
