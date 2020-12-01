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
    const {nombre_original, password, nombre} = req.body; 
   //console.log(req.body); //->Metodo que ayuda debugear

    //Instancioamos el modelo 
    const enlace = new Enlaces();

    //Transformamos 
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
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
    res.json({archivo:enlace.nombre, password:false});

    next();
   

}

//Obtiene un listado de todos los enlaces 
exports.todosEnlaces = async (req, res, next ) =>{
    try {

        const enlaces = await Enlaces.find({}).select('url -_id');
        res.json({enlaces});
        console.log(enlaces);
        
    } catch (error) {

        res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
    }
}


//Retorna si tiene password o no 
exports.tienePassword = async (req, res, next ) =>{
    try {

        const enlace = await Enlaces.findOne({url: req.params.url}); 
        if (!enlace){
            res.status(400).json({msg: 'Disculpa no se encontro  ningun enlace.'});
            return next();
        }

        if(enlace.password){
          return   res.json({password: true, enlace:enlace.url, archivo:enlace.nombre }); 
        }

        next();
        
        
    } catch (error) {

        res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
    }
}

//Verifica si el password  es correcto 

exports.verificarPass = async (req, res, next)=>{
    const { password } = req.body; 
    const { url } = req.params; 

    //Consultar por el enlace 

    const enlace = await Enlaces.findOne({ url }); 


    //Verificar Password 

    if(bcrypt.compareSync(password, enlace.password )){
        //Permitir Usuario Descargar Archivo 
        next();
    }else{

        return res.status(401).json({msg: 'Pusiste mal la clave.'});

    }
    

}