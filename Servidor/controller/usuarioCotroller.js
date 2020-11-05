const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const {validationResult} = require('express-validator');

exports.nuevoUsuario = async(req, res)=>{


    //Mostrar mensaje de error de express-validator 
    const errores  = validationResult(req); 

    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //Es una forma de validar si esta llegando bien el json -> Externo generado por postman
    console.log(req.body);
    const {email, password} = req.body; 

        try {

            // Anexo  Vaidación 
            let  usuario = await Usuario.findOne({email}); 

            if ( usuario ){

                return  res.status(400).json({msg: `El usuario con este email, ${email} ya esta registrado`});

            }

        //Creamos usuario si no esta duplicado 
            usuario = new Usuario(req.body);

            //Hashear  la clave con el salt
            //Creamos la instancias de bcrypt para el Hasheo de la  clave, con esto lo mandamos como parametro  
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt)

            await usuario.save();

            res.json({msj: 'Usuario Creado Exitosamente!!'});

        } catch (error) {
            res.json({msj: `Hubo un  error  en  la comunicación !! -> ${error} `});
        }


}