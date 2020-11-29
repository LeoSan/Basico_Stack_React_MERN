import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
 
import clienteAxios from '../../config/axios';

 
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
 
    const router = useRouter(); 

    if (router.isFallback) {
        return <div>Loading...</div>
    }

   return(
       <Layout>
 
           <h1 className="text-4xl text-center text-gray-700">Descarga  tu archivo: </h1>
           <div className="flex items-center justify-center mt-10">
               <a   href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                    download
                    > Clic </a>
           </div>
       </Layout>
 
   )
}
