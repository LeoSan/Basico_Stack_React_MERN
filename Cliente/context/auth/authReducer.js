//Que es un Reducer -> son las funciones que modifican el state 

//Importamos el tipo de accion 
import {USUARIO_AUTENTICADO, REGISTRAR_USUARIO} from '../../types';


export default (state, action) =>{

    switch (action.type) {
        case USUARIO_AUTENTICADO:
            return{
                ...state, 
                usuario:action.payload, 
            }

        default:
            return state;
    }

}