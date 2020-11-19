//Importamos paquetes 
const multer = require('multer');
const shortid = require('shortid');

//Eliminar archivo 
const fs = require('fs');



exports.subirArchivo = async (req, res, next ) =>{

//Creamos nuestro  configurador 
const configuracionMulter = {
    //limits = { fileSize : req.usuario ?  1024 * 1024 * 10 : 1024 * 1024},
    storage: fileStorage = multer.diskStorage({
        destination:(req, file, cb) =>{
            cb(null, __dirname+'/../uploads')
        }, 
        filename:(req, file, cb) =>{
            //const extension  = file.mimetype.split('/')[1];
            const extension  = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, `${shortid.generate()}${extension}`)
        }, 
        fileFilter:(req, file, cb ) =>{
            if(file.mimetype.split('/')[1] === "pdf"){
                return cb(null, `No se permiten PDFs`);
            }
        }
    })
}

//Instanciamos  nuestro multer y lo dejamos preparado cuando queramos usarlos que para este caso será en el controlador 
const upload = multer(configuracionMulter).single('archivo');



    upload(req, res, async(error) =>{
        console.log(req.file);
        
        //Valido  si  no hay eerores 
        if (!error){
            res.json({archivo: req.file.filename}); 
        }else{
            res.status(400).json({msg: `Hubo una falla al subir el archivo ->${error} `});
            return next();
        }

    } )
    
    

}

exports.eliminarArchivo = async (req, res, next ) =>{

  console.log("Eliminar archivo", req.archivo);
  
  try {
    fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`);
    console.log("Archivo eliminado");    
  } catch (error) {
    res.status(400).json({msg: `Disculpa, ocurrio una falla -> ${error}`});
  }
  
}