//Importo  el modelo 
const Enlaces = require('../models/Enlace');

//Importamos  paquete 
const shortid = require('shortid');
//Importamos paquete hash
const bcrypt = require('bcrypt');


//Importamos paquete para validar 
const {validationResult} = require('express-validator');


const jwt = require('jsonwebtoken');
const Enlace = require('../models/Enlace');
require('dotenv').config({path:'variables.env'}); 


exports.nuevoEnlace = async (req, res, next ) =>{

    //Mostrar mensaje de error de express-validator  desde el router // Debes  importar validationResult 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
        
    
    //Variables 
    const {nombre_original, password} = req.body; 
   //console.log(req.body); //->Metodo que ayuda debugear

    //Instancioamos el modelo 
    const enlace = new Enlaces();

    //Transformamos 
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original; 
    enlace.password = password;
    
    //valido si el  usuario esta login 
    if (req.usuario){

        const {password, numDescarga} = req.body; 

          //Asignar a enlace  el numero de descargas 
          if(numDescarga){
              enlace.numDescarga = numDescarga;
          }

        //Asignar contraseña 
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
            
        }
        //Asignar autor 
        enlace.autor = req.usuario.id;

    }
    
    //console.log("Valido  datos de usuario ", req.usuario); 

    //Guardar en la base de datos.
    try {
        await enlace.save();
        return res.json({msg:`${enlace.url}`});
        next();
    } catch (error) {
        res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
        
    }
    

}

//Obtener enlace 
exports.obtenerEnlace = async (req, res, next ) =>{

    //console.log(req.params); 
    // verificar enlaces 
    const enlace = await Enlaces.findOne({url: req.params.url}); 
    if (!enlace){
        res.status(400).json({msg: 'Disculpa no se encontro  ningun enlace.'});
        return next();
    }
    
    //Si encontro enlace 
    

    // Si las decargas son iguales a 1 

    if (enlace.numDescarga === 1 ){

        //Eliminar el archivo 
        req.archivo = enlace.nombre; 

        //Eliminar entrada de la base de datos 
        await Enlaces.findByIdAndRemove(enlace._id); // Solo  acepta la  id 
        next();// esto  permite desplazarte al  otro middleware es decir otro fragmento de código.  
    }else{

        // Si las descargas son mayores a 1 
        enlace.numDescarga--;
        await enlace.save();
        console.log( enlace.numDescarga );


    }


    res.json({archivo:enlace.nombre});

    

}
