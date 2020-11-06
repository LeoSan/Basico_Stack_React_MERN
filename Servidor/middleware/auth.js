const jwt = require('jsonwebtoken');
require('dotenv').config({path:'variables.env'}); 

module.exports = (req, res, next) =>{
    console.log("Yo soy tu puto midle"); 

    const authHeader = req.get('Authorization'); 
    try {

        if(authHeader){
            //Obtener  el token 
            const  token = authHeader.split(' ')[1];
    
            const usuario = jwt.verify(token, process.env.SECRETA); 
            //res.json({usuario});
            req.usuario = usuario; // Permite la comunicaciòn interna   
        }
    } catch (error) {
        res.status(400).json({msg: `Token.  ${error} `});
    }
    return next(); 
}