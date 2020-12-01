import React, {useState, useContext} from 'react';
import Layout from '../../components/Layout';
 
import clienteAxios from '../../config/axios';

//Importamos nuestros  useContext (Hooks)
import authContext from '../../context/auth/authContext'

//Importar Alerta 
import Alerta from '../../components/Alerta'; 

 
// Explicación: Este permite traer las respuesta que vamos obtener, es decir  variables  estaticas
export async function getServerSideProps( {params} ){// Aqui consumismos el props que pasamos en la linea 47 pero  se crea en la lnea 36
 
   const { enlace  } = params; // aplicando distrotions
   const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);  // Aqui se hace dinamico
  
   console.log("Aqui arvhivo->", resultado.data);
  
 
    // En caso  que no encuentre nada que retorne a index. 

    if (!resultado.data) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }


   return{ // Crea un props, llamado enlace -> lo  podemos agregar a este componente
       props:{
           enlace:resultado.data
       }
   }
 
 
}
 
 
// Explicación: Este permite traer las respuesta que vamos obtener,
//es decir  variables  dinamicas  se sirve en el servidor,
// Este nos funciona para poder acceder al getStaticProps
// se debe crear un listado de urls.
//Nos genera una URL
export async function getServerSidePaths (){
 
   const enlaces = await clienteAxios.get('/api/enlaces');
   console.log( enlaces );
 
   // ESto  es boligatorio puede devolver un string o un arreglo de urls.
   return {
       paths: enlaces.data.enlaces.map( enlace  => ({
           params: { enlace:enlace.url }
       })),  //Urls o una sola  url
       fallback: true  // Permite validar en caso que no envie como  parametro alguna url o que  no exista  y marque el error 404 pagina  no encontrada
 
   }
 
 
}
 
 
 
export default ( {enlace} ) => { // Este props se genera en la funcion getStaticPaths -> linea 36
 
    //Acceder el state 
    const AuthContext = useContext(authContext);
    const { verificarPassAlerta, classMensaje} =  AuthContext;

    //Declaramos nuestros State
    const [ tienePassword, setTienePassword ] = useState( enlace.password );
    const [ password, setPassword ] = useState('');
    const [ archivo, setArchivo ] = useState(enlace.archivo);

    console.log("Objeto Enlace", enlace);

    
    //Funcion para verificar datos 
    const verificarPass = async (e)=>{
        e.preventDefault();

        const data = {
            password
        }

        let objetoAlerta = {
            mensajeAlerta:null, 
            estiloAlerta:null
        }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);  // Aqui se hace dinamico    

            console.log( resultado.data );
            //Aqui hace el ajuste 
            setTienePassword(resultado.data.password);

            setArchivo(resultado.data.archivo);

        } catch (error) {
            console.log(error.response.data.msg);
            objetoAlerta.mensajeAlerta = error.response.data.msg;
            objetoAlerta.estiloAlerta = 'bg-red-700'; ;
            
            verificarPassAlerta( objetoAlerta );
            
        }

    }

   return(
       <Layout>
           {
               tienePassword ? (
                    <>
                   
                    <div className="flex justify-center mt-5">

                    <div className="w-full  max-w-lg">
                        <p className="text-center my-4">Este Enlace esta protegido por un password</p>
                        {
                            classMensaje ? <Alerta/> : null
                        }
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" 
                        onSubmit={ e => verificarPass(e) }
                            
                        >

                            <div className="mb-4 ">
                                <label className="block text-black text-sm font-bold mb-2"
                                    htmlFor="password">
                                    Contraseña  
                                </label>
                                <input
                                    type="password"
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    placeholder="Ingresa Contraseña Usuario"
                                    value={password}
                                    onChange={ e => setPassword( e.target.value )  }
                                ></input>
                            </div>                            
                            <input type="submit" value="Validar  Password" className="bg-indigo-500 hover:bg-blue-500 w-full p-2 text-white font-bold uppercase" />


                        </form>

                    </div>
                    </div>
                    </>

               ) : 
               
               (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga  tu archivo: </h1>
                        <div className="flex items-center justify-center mt-10">
                            <a   href={`${process.env.backendURL}/api/archivos/${archivo}`} 
                                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                    download
                                    > Clic </a>
                        </div>


                    </>
               )
           }
 
       </Layout>
 
   )
}
