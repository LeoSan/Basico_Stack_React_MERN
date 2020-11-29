//Que es el State-> tienen las acciones que disparan lo que tenemos en el reducer 
import React,  {useReducer} from 'react';
import authContext from './authContext';
import authReducer  from './authReducer'; 

//Comunicación servidor Back-End
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';



//Importamos el tipo de accion 
import { 
    USUARIO_AUTENTICADO, 
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    LIMPIAR_REGISTRO, 
    LOGIN_ERROR, 
    LOGIN_EXITOSO,
    CERRAR_SESION 
} from '../../types';



const AuthState = ( {children} )=>{

    //Definir un state  inicial 
    const inicialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, 
        autenticado:null, 
        usuario:null, 
        mensaje:null, 
        classMensaje:{
            mensajeAlerta:null, 
            estiloAlerta:null
        }
    }


    // Definir el Reducer 
    const [state, dispatch] = useReducer(authReducer, inicialState); 

    //funciones 

    //Registrar Usuarios 

    const registrarUsuario = async (datos)=>{
        console.log("Desde Registrar Usuario ");
        let objetoAlerta = {
            mensajeAlerta:null, 
            estiloAlerta:null
        }

        try {
            
            //console.log(clienteAxios);
            const respuesta = await clienteAxios.post('/api/usuarios', datos); 
            
            //console.log(respuesta.data.msj);
            objetoAlerta.mensajeAlerta = respuesta.data.msj; 
            objetoAlerta.estiloAlerta  = 'bg-green-500'; 

            dispatch({
                type: REGISTRO_EXITOSO, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            }); 
            
        } catch (error) {
            let msjError = error.response.data.msg;
            
            console.log(`error->${msjError}`);

            objetoAlerta.mensajeAlerta = msjError; 
            objetoAlerta.estiloAlerta  = 'bg-red-700'; 


            dispatch({
                type: REGISTRO_ERROR, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            }); 
            
        }

        setTimeout(() => {

            objetoAlerta.mensajeAlerta = null; 
            objetoAlerta.estiloAlerta  = null; 

            dispatch({
                type: LIMPIAR_REGISTRO, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            }); 
            
        }, 5000);

    }


    //Funciones para autenticar 
    const iniciarSesion = async (datos)=>{
        
        let objetoAlerta = {
            mensajeAlerta:null, 
            estiloAlerta:null
        }
        
        //console.log(datos);

        try {
            const respuesta = await clienteAxios.post('/api/auth', datos); 
            console.log(respuesta.data.token); 

            dispatch({
                type: LOGIN_EXITOSO, //Es la accion a ejecutar
                payload: respuesta.data.token  //Son los datos que modifica el state 
    
            }); 

            
        } catch (error) {

            let msjError = error.response.data.msg;
            
            console.log(`error->${msjError}`);

            objetoAlerta.mensajeAlerta = msjError; 
            objetoAlerta.estiloAlerta  = 'bg-red-700'; 

            dispatch({
                type: LOGIN_ERROR, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            }); 
            
        }

        setTimeout(() => {

            objetoAlerta.mensajeAlerta = null; 
            objetoAlerta.estiloAlerta  = null; 

            dispatch({
                type: LIMPIAR_REGISTRO, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            }); 
            
        }, 5000);        

    }


    //Función Retorne los valores del token 

    

    //Usuario Autenticado 
    const usuarioAutenticado = async () =>{
        console.log("Revisando");
        try {

            const token = localStorage.getItem('token'); 
            if (token){
                tokenAuth(token);
           

                const respuesta = await clienteAxios.get('/api/auth'); 
                console.log(respuesta.data.usuario); 

                dispatch({
                    type: USUARIO_AUTENTICADO, //Es la accion a ejecutar
                    payload: respuesta.data.usuario  //Son los datos que modifica el state 
        
                }); 

            }
            
        } catch (error) {

            let msjError = error.response.data.msg;
            
            console.log(`error->${msjError}`);

            objetoAlerta.mensajeAlerta = msjError; 
            objetoAlerta.estiloAlerta  = 'bg-red-700'; 

            dispatch({
                type: LOGIN_ERROR, //Es la accion a ejecutar
                payload: objetoAlerta  //Son los datos que modifica el state 
    
            });             
            
        }

    
    }

    //Función para cerrar session 

    const cerrarSesion = ()=>{

        dispatch({
            type: CERRAR_SESION, //Es la accion a ejecutar
        }); 

    }

    //Nota:  React  avanzado no es type sript es usar hooks para mantener tus state centralizados hooks (useContext, useReducer) 

    return(
        <authContext.Provider
            value={{
                token:state.token, 
                autenticado:state.autenticado,
                usuario:state.usuario, 
                mensaje:state.mensaje, 
                classMensaje:state.classMensaje, 
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion

            }}
        >

            {children}

        </authContext.Provider>
    );

}

export default AuthState;