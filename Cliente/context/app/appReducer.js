//Que es un Reducer -> son las funciones que modifican el state 

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

} from '../../types';



export default (state, action) =>{

    
    switch (action.type) {
        
        case MOSTRAR_ALERTA: 
            
            return{
                ...state,
                mensaje_archivo:action.payload
            }

        case OCULTAR_ALERTA: 
        return{
            ...state,
            mensaje_archivo:action.payload
        }

        case SPINER_LOADING: 
        return{
            ...state,
            cargando:true
        }          

        case SUBIR_ARCHIVO_ERROR: 
        return{
            ...state,
            mensaje_archivo:action.payload, 
            cargando:null
        }    
        
        case SUBIR_ARCHIVO_EXITO: 
        return{
            ...state,
            mensaje_archivo:action.payload.objetoAlerta, 
            nombre:action.payload.nombre, 
            nombre_original:action.payload.nombre_original,
            cargando:null 
        }   

        case CREAR_ENLACE_EXITO: 
        return{
            ...state,
            url:action.payload, 
        
        }        

        case LIMPIAR_STATE: 
        return{
            ...state,
            mensaje_archivo:{
                msg:null, 
                classCss:null
            },
            nombre:'', 
            nombre_original:'', 
            cargando:null, 
            descargas:1, 
            password:'', 
            autor:null, 
            url:'', 
        
        }        

        
        
        

        default:
            return state;
    }

}
