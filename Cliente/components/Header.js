import React, {useEffect, useContext, Fragment} from 'react';
import Link from 'next/link';

//Importamos nuestros  useContext (Hooks)
import authContext from '../context/auth/authContext'

const Header = () => {

    //Acceder el state 
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, cerrarSesion,  usuario } =  AuthContext;

        
    //Verificar si hay token
    useEffect(() => {
        
          usuarioAutenticado();
          
     }, [])

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
               <Link href="/">
                    <img className="w-64 mb-8 md:mb-0" src="logo.svg" /> 
               </Link>
               
               
               <div>
                    {
                         usuario ? (
                              <> 
                                   <div className="flex items-center">
                                        <p className="mr-2">Que Tal : {usuario.nombre}</p>
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