//Importamos la librerias de express {Estas  tres  librerias  son esenciales para el router}
const express = require('express');
const router  = express.Router();
const archivosController = require('../controller/archivosController');  // Nueva Parte

//Importamos midleware para validar nuestra auterización  
const auth = require('../middleware/auth');

//Creaos  nuestro  end-point y nuestra comunicaciòn con el controlador 
router.post('/'
    , auth
    , archivosController.subirArchivo
);


//Creaos  nuestro  end-point y nuestra comunicaciòn con el controlador para decargar archivo 
router.get('/:archivo'
    , archivosController.descargarArchivo
    , archivosController.eliminarArchivo
);


module.exports = router;
