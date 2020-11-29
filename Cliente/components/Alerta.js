import React, {useContext} from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';


const Alerta = () => {
        //Acceder el state de AutState 
        const AuthContext = useContext(authContext);
        const { classMensaje } =  AuthContext;

        //Acceder el state de appState
        const AppContext = useContext(appContext);
        const { mensaje_archivo } =  AppContext;

    
    return ( 
        
        <div className= {`py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto ${classMensaje.estiloAlerta} ${mensaje_archivo.classCss}`}>
            { classMensaje.mensajeAlerta  || mensaje_archivo.msg }
        </div>

     );
}
 
export default Alerta;