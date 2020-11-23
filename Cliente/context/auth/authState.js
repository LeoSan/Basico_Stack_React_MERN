//Que es el State-> tienen las acciones que disparan lo que tenemos en el reducer 
import React,  {useReducer} from 'react';
import authContext from './authContext';
import authReducer  from './authReducer'; 




//Importamos el tipo de accion 
import {USUARIO_AUTENTICADO, REGISTRAR_USUARIO} from '../../types';

//Comunicación servidor Back-End
import clienteAxios from '../../config/axios';


const AuthState = ( {children} )=>{

    //Definir un state  inicial 
    const inicialState = {
        token:'', 
        autenticado:null, 
        usuario:null, 
        mensaje:null
    }


    // Definir el Reducer 
    const [state, dispatch] = useReducer(authReducer, inicialState); 

    //funciones 

    //Registrar Usuarios 

    const registrarUsuario = async (datos)=>{
        console.log("Desde Registrar Usuario ");

        try {
            
            //console.log(clienteAxios);
            const respuesta = await clienteAxios.post('/api/usuarios', datos); 
            console.log(respuesta);
            
        } catch (error) {
            console.log(`error->${error}`);
            
        }

    }

    //Usuario Autenticado 
    const usuarioAutenticado =(nombre)=>{

        dispatch({
            type: USUARIO_AUTENTICADO, //Es la accion a ejecutar
            payload: nombre  //Son los datos que modifica el state 

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
                registrarUsuario,
                usuarioAutenticado,

            }}
        >

            {children}

        </authContext.Provider>
    );

}

export default AuthState;