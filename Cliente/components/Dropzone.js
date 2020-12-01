import React, {useCallback, useContext} from 'react';
import { useDropzone  } from 'react-dropzone'
import clienteAxios from '../config/axios'
//import Formulario from './Formulario';

//Importamos nuestro app context 
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

import Formulario from './Formulario';


const Dropzone = ( ) => {
    
        //Acceder el state de AppState 
        const AppContext = useContext(appContext);
        const { mostrarAlerta, subirArchivo, crearEnlace,  cargando } =  AppContext;


        // Acceder al state  de  AuthState  
        const AuthContext = useContext(authContext);
        const { usuario, autenticado } = AuthContext;


    //Paso 1: Definir  Funciones principales 

    const onDropRejected = ()=>{

        mostrarAlerta('No se pudo subir, el Limite es 1MB, obten una cuenta gratis para subir archivos más grandes');
    }
    
    //Metodo  que permite subir los archivos 
    const onDropAccepted = useCallback(  ( acceptedFiles )=>{
            //crear un formdate
            const formData = new FormData();
            formData.append('archivo', acceptedFiles[0] );
            subirArchivo( formData, acceptedFiles[0].path );

    },  []); 

    //Paso 2:// Extraer contenido  de Dropzone aqui dispara los eventos al usarse el Dropzone 
    
    const maxSize = autenticado ? 1000000000000 : 1000000;
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize});

    //Paso 3:   //Metodo  que me permite listar los archivos. 


    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} 
            className="bg-white flex-1 p-3 mb-4 shadow-lg rounded" >
            <p className="font-bold text-xl">{archivo.path}</p>
            <p className="text-sm text-gray-500 ">{ ( archivo.size / Math.pow(1024, 2)).toFixed(2)} Mb</p>
        </li>
    ));
    
    return ( 
        <>
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-blue-400 border-2 bg-green-100 px-4">
                { 
                    acceptedFiles.length > 0 ? 

                    (
                        <>
                        <div className="mt-10 w-full">
                            <h4 className="text-2xl font-bold text-center mb-4">Archivos </h4>
                            <ul>
                                 {archivos}
                            </ul>
                            
                            { autenticado===true ? <Formulario/> : null 


                            }
                            
                            { cargando ? 
                                    (
                                        <p className="my-10 text-center text-blue-500">Subiendo Archivo </p>
                                    ): (
                                            <button className="bg-green-600 w-full py-3 rounded-lg text-white my-10 hover:bg-yellow-500" 
                                            type="button" 
                                            onClick={ () =>crearEnlace() }
                                            >
                                            Compartir                     
                                            </button>

                                    ) 
                            }    
                        </div>
                        </>
                    ):(
                        //Paso Super importante-> Aqui constuimos  el front  del subir archivo, usando su clase dropzone  getRootProps, getInputProps
                        <div  {  ...getRootProps({ className:'dropzone w-full py-32'  })  }>
                        <input className="h-100 " {...getInputProps()} />
                        
                            {
                                isDragActive ? ( <p className="text-2xl text-center text-yellow-600">Sueltame </p> ): (
                                    <div className="text-center">
                                        <p className="text-2xl text-center text-yellow-600">Arrastrame aquí.</p>
                                        <button className="bg-green-600 w-full py-3 rounded-lg text-white my-10 hover:bg-yellow-500" type="button">Subir Archivo</button>
                                    </div>    
                                )
                            }
                        </div>

                    )
                    
                }
            </div>
        </>

     );
}
 
export default Dropzone;
 