//Que es un Reducer -> son las funciones que modifican el state 

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


export default (state, action) =>{

    
    switch (action.type) {
        
        case CERRAR_SESION: 
            
            localStorage.removeItem('token');
            return{
                ...state, 
                token:null,
                usuario:null, 
                autenticado:null,
            }
        

        case LOGIN_EXITOSO: 
            localStorage.setItem('token', action.payload);
        
            return{
                ...state, 
                token:action.payload,
                autenticado:true,
            }
        
        case LOGIN_ERROR: 
            return{
                ...state, 
                classMensaje:action.payload
            }        
        
        case LIMPIAR_REGISTRO: 
            return{
                ...state, 
                classMensaje:action.payload
            }


        case REGISTRO_ERROR: 
            return{
                ...state, 
                classMensaje:action.payload
            }

        case REGISTRO_EXITOSO: 
            return{
                ...state, 
                classMensaje:action.payload
            }        
        
        case USUARIO_AUTENTICADO:
            return{
                ...state, 
                usuario:action.payload, 
            }

        default:
            return state;
    }

}