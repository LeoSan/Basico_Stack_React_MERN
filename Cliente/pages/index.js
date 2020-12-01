import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
//Importamos nuestros  useContext (Hooks)
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

import Link from 'next/link';

import Dropzone from '../components/Dropzone';

import Alerta from '../components/Alerta';

const Index = () => {

    //Acceder el state de AutState 
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } =  AuthContext;

    //Acceder el state de appState
    const AppContext = useContext(appContext);
    const { mensaje_archivo, url } =  AppContext;

    
    //Verificar si hay token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if ( token ){
            usuarioAutenticado();
        }
    }, []); // Asi solo hace que el useEffect  se ejecute una sola vez. 
     



  return ( 
      <Layout>
          <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
              { url ? (
                        <>
                            <p className="text-center   tex-2xl mt-10">
                                <span className="font-bold text-red-700 tex-3xl uppercase">  Tu url es: </span>   { `${process.env.frontEndURL}/enlaces/${url}` }  
                            </p>
                            <button type="button" 
                                     className="bg-indigo-500 hover:bg-blue-500 w-full p-2 text-white font-bold uppercase mt-10" 
                                     onClick={ ()=>navigator.clipboard.writeText(  `${process.env.frontEndURL}/enlaces/${url}`  ) }> 
                            Copiar  Enlace 
                            </button>
                        </>
                    )
              :
                    (
                        <>

                                {
                                    mensaje_archivo ? (
                                    <Alerta/>
                                    ) : null
                                }

                                <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                                    
                                    <Dropzone/>

                                    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                        <h2 className="text-3xl font-sans font-bold text-gray-800 my-4">Compartir Documentos</h2>    
                                        <p className="text-lg leading-loose">
                                            <span className="text-red-600 font-bold">ReadNodeSend</span> <br/>
                                                Busca  y  comparte documentos. 
                                        </p>
                                        <Link href="/crearcuenta">
                                            <a className="text-green-500 font-bold text-lg hover:text-blue-700">Generar Cuenta Plus</a>
                                        </Link>
                                    </div>
                                </div>

                        </>
                    ) 
                }


          </div>
      </Layout>
   );
}
 
export default Index ;

