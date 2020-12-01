import React,  {useReducer} from 'react';
import appContext  from './appContext';
import appReducer  from './appReducer'; 

import clienteAxios from '../../config/axios';


//Importamos el tipo de accion 
import { 
    MOSTRAR_ALERTA, 
    OCULTAR_ALERTA,
    SPINER_LOADING,  
    SUBIR_ARCHIVO_EXITO, 
    SUBIR_ARCHIVO_ERROR, 
    CREAR_ENLACE_EXITO, 
    CREAR_ENLACE_ERROR, 
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,  

} from '../../types';




const AppState = ( {children} ) => {
    
        //Definir un state  inicial 
        const inicialState = {
            mensaje_archivo:{
                msg:'', 
                classCss:''
            },
            nombre:'', 
            nombre_original:'', 
            cargando:null, 
            numDescarga:1, 
            password:'', 
            autor:null, 
            url:'', 

        }


    
    // Definir el Reducer 
        const [state, dispatch] = useReducer(appReducer, inicialState); 

    // Funciones 
    
    
    //Funcion  que permite validar si el archivo  es grande si se pasa del filtro solo  muestra mensaje 
    const mostrarAlerta = (msg)=>{
        console.log(msg);
        
        let objetoAlerta = {
            mensajeAlerta:msg, 
            estiloAlerta:'bg-red-800'
        }
        
        
        dispatch({
            type: MOSTRAR_ALERTA, 
            payload:objetoAlerta
        })

        setTimeout(() => {

            objetoAlerta.mensajeAlerta = null; 
            objetoAlerta.estiloAlerta  = null; 

            dispatch({
                type: OCULTAR_ALERTA, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            }); 
            
        }, 5000);        

    }


    // Funcion de subir archivo 

    const subirArchivo = async  ( formData, nombreArchivoOriginal )=>{
        console.log("Subimos archivo.. Estamos en appState.js ");
        let objetoAlerta = {
            msg:null, 
            classCss:null
        }


        dispatch({
            type: SPINER_LOADING, //Es la accion a ejecutar
        });  

        try {

            const resultado = await clienteAxios.post('/api/archivos', formData );
            objetoAlerta.msg = 'Se subio  Exitosamente el archivo, clic para compartir.'; 
            objetoAlerta.classCss  = 'bg-green-700'; 

            dispatch({
                type: SUBIR_ARCHIVO_EXITO, //Es la accion a ejecutar
                payload:{
                    objetoAlerta,  //Son los datos que modifica el state 
                    nombre:   resultado.data.archivo,
                    nombre_original:  nombreArchivoOriginal
                } 
    
            });                

            
        } catch (error) {

            let msjError = error.response.data.msg;

            console.log(`error->${msjError}`);

            objetoAlerta.msg = msjError; 
            objetoAlerta.classCss  = 'bg-red-700'; 

            dispatch({
                type: SUBIR_ARCHIVO_ERROR, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            });             
            
        }
     
    }

    //Metodo  crear enlace 
    const crearEnlace = async()=>{
        console.log("Creando  Enlace.. Estamos en appState.js");
        const data = { 
            nombre:state.nombre, 
            nombre_original:state.nombre_original, 
            numDescarga:state.numDescarga, 
            password:state.password,
            autor:state.autor,
        }

        let objetoAlerta = {
            msg:'', 
            classCss:'bg-red-800'
        }

        try {

            const resultado = await clienteAxios.post('/api/enlaces', data );
            console.log(resultado.data.msg);

            dispatch({
                type: CREAR_ENLACE_EXITO, //Es la accion a ejecutar
                payload: resultado.data.msg  //Son los datos que modifica el state 
    
            }); 
            
        } catch (error) {

            let msjError = error.response.data.msg;

            console.log(`error->${msjError}`);

            objetoAlerta.msg = msjError; 
            objetoAlerta.classCss  = 'bg-red-700'; 

            dispatch({
                type: SUBIR_ARCHIVO_ERROR, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            });   
            
        }
    }


    // Limpiar state 

    const limpiarState = () => {

        dispatch({
            type: LIMPIAR_STATE, //Es la accion a ejecutar
        }); 

    }
        
    // Agreagar contraseña al archivo 

    const agregarPass = async(password)=>{

            dispatch({
                type: AGREGAR_PASSWORD, //Es la accion a ejecutar
                payload: password  //Son los datos que modifica el state 
    
            }); 
        
    }

    // Agreagar el total  de descargas 

    const agregarNumeroDescargas = async(numeroDecargas)=>{

        dispatch({
            type: AGREGAR_DESCARGAS, //Es la accion a ejecutar
            payload: numeroDecargas  //Son los datos que modifica el state 

        }); 
    
    }    

    //Verificar Password 
    
    return(
        <appContext.Provider
            value={{
                mensaje_archivo:state.mensaje_archivo,
                nombre:state.nombre,
                nombre_original:state.nombre_original,
                cargando:state.cargando,
                numDescarga:state.numDescarga,
                password:state.password,
                autor:state.autor,
                url:state.url,
                mostrarAlerta , 
                subirArchivo, 
                crearEnlace, 
                limpiarState,
                agregarPass, 
                agregarNumeroDescargas
            }}
        >

            {children}

        </appContext.Provider>
    );
}
 
export default AppState;