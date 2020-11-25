import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout'
//Importamos nuestros  useContext (Hooks)
import authContext from '../context/auth/authContext'


const Index = () => {

    //Acceder el state 
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado } =  AuthContext;

    
    //Verificar si hay token
    useEffect(() => {
        
        usuarioAutenticado();
        
    }, [])
     



  return ( 
      <Layout>
          <h1>Index </h1>
      </Layout>
   );
}
 
export default Index ;

