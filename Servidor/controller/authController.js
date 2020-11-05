const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config({path:'variables.env'}); 


exports.autenticarUsuario = async (req, res, next) =>{
        //Declaramos Variables 

 //REvisar si  hay errores 

     
//     console.log(req.body); // forma para validar si llegan los datos 
     const {email, password} = req.body; //Distrotions 
     
    // Buscar el  usuario 
     const usuario = await Usuario.findOne({ email });

     if (!usuario){
         res.status(400).json({msg: 'El usuario No Existe'});
         return next();// El next permite avanzar al  siguiente bloque de código. 
     }

    //verificar la clave  y usuario 
    if ( bcrypt.compareSync(password, usuario.password) ){
       //Crear jsonweToken 
       const token = jwt.sign({
           nombre:usuario.nombre,
           id:usuario._id,
           email:usuario.email,
       }, process.env.SECRETA, {
           expiresIn:'8h' 
       }); 

       res.json({token})

    }else{
        res.status(400).json({msg: 'Clave incorrecta.'});
        return next();// El next permite avanzar al  siguiente bloque de código. 
    }



}

exports.usuarioAutenticado = async (req, res ) =>{


}
