import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';

//Importamos nuestros  useContext (Hooks)
import authContext from '../context/auth/authContext'; 
import appContext from '../context/app/appContext'; 

import { useRouter } from 'next/router';


const Header = () => {

    //Acceder el state  de AuthContext 
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, cerrarSesion,  usuario } =  AuthContext;

    //Acceder el state  de appContext 
    const AppContext = useContext(appContext);
    const { limpiarState } =  AppContext;

    

    //Verificar si hay token
    useEffect(() => {
        
          usuarioAutenticado();
          
     }, []); 

     // Funciones  

     const router = useRouter();

     // Esta función permite limpiar el state 
     const redireccionar = ()=>{
          router.push('/');
          limpiarState();
     }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
               
               <img 
                    onClick={ ()=>redireccionar()  }
                    className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" /> 
               
               
               
               <div>
                    {
                         usuario ? (
                              <> 
                                   <div className="flex items-center">
                                        <p className="mr-2 uppercase text-red-300">Hi : {usuario.nombre}</p>
                                        <button 
                                             className="bg-blue-800 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
                                             onClick={ ()=>cerrarSesion() }
                                             type="button">Salir</button>
                                   </div>
                              </>
                         ):(
                              <> 
                                   <Link href="/login">
                                   <a className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Acceder Cuenta</a>
                                   </Link>
                                   <Link href="/crearcuenta">
                                   <a className="bg-indigo-600 px-5 py-3 rounded-lg text-white font-bold uppercase">Generar Cuenta</a>
                                   </Link>
                              </> 
                         )
                    }



               </div>

        </header>
     );
}
 
export default Header;