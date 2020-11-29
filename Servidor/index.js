const express = require('express');
const connectarDB = require('./config/db'); // Importamos nuestro conector de BD // Debes crear la conexion antes

const cors = require('cors');//Esto es para solucionar el error de comunicación entre servidores. 


//Crear el servidor 
const app = express();

console.log(`Iniciando nuestro servidor en node.js - express`);


// ejecutamos la función para conectar a la base de datos
 connectarDB(); // Debes crear la conexion antes 

 //Habilitar Cors -> Linea Nueva se debe instalar cors 
 console.log(`Habilitamos CORS`);

 const opcionesCors = {
     origin:process.env.FRONTEND_URL
 }
 app.use(  cors( opcionesCors ) ); 


//Creamos el puesrto para la app
 const port = process.env.PORT || 4000;  // Debes instalar  y crear el env que son las variables de entorno

//Habilitar leer los valores de un body 
app.use( express.json() );

// Habilitar carpeta publica 
 console.log(`Habilitar carpeta publica `);
 app.use(express.static('uploads'));


//Rutas de Accesos 

//Crear usuario 
app.use('/api/usuarios', require('./routes/usuarios'));  // esta  sentencia aun no se crear hasta que puedas generar los controladores 

//Autenticar usuario 
app.use('/api/auth', require('./routes/auth'));  // esta  sentencia aun no se crear hasta que puedas generar los controladores 

//Creamos nuestro  end-point para  crear  urls  
app.use('/api/enlaces', require('./routes/enlaces'));  


//Creamos nuestro  end-point para  subir  arhivos. 
app.use('/api/archivos', require('./routes/archivos'));  


//Iniciamos nuestro  servidor 
app.listen(port, '0.0.0.0', () => {

    console.log(`El servidor esta funcionando en el puerto -> ${port}`);
});