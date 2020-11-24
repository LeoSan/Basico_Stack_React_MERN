import React, {useContext} from 'react';
import authContext from '../context/auth/authContext';




const Alerta = () => {
        //Acceder el state 
        const AuthContext = useContext(authContext);
        const { classMensaje } =  AuthContext;
    
    return ( 
        
        <div className= {`py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto ${classMensaje.estiloAlerta}`}>
            { classMensaje.mensajeAlerta }
        </div>

     );
}
 
export default Alerta;