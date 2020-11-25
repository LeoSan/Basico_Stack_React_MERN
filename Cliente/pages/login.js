import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import {useFormik, yupToFormErrors} from 'formik'; 
import * as Yup from 'yup';
import { useRouter } from 'next/router'

//Importamos nuestros  useContext (Hooks)
import authContext from '../context/auth/authContext'

//Importar Alerta 
import Alerta from '../components/Alerta'; 

const Login = () => {

        //Acceder el state 
        const AuthContext = useContext(authContext);
        const { iniciarSesion,  classMensaje, autenticado } =  AuthContext;

        //Next Router 

        const router = useRouter();
    
    //Validr autenticado 
    useEffect(() => {
        if(autenticado){
            router.push('/'); 
        }
    }, [autenticado])


    //Formulario  y Validación con formik  
    const formik = useFormik({
        initialValues:{
            email:'', 
            password:''
        }, 
        validationSchema: Yup.object({
              email     : Yup.string().email('El campo email no cumple con el formato.').required('El campo Email es obligatorio. '),   
              password  : Yup.string().required('El campo Nombre es obligatorio. ').min(6, 'La  contraseña debe contener al menos 6 caracteres.'),   
        }),
        onSubmit: (valores)=>{
            iniciarSesion(valores);
        }
    });    
  return ( 
      <Layout>
          <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-blue-800 text-center">Acceder a tu cuenta</h2>  
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg ">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" 
                            onSubmit={formik.handleSubmit}
                        >

                            <div className="mb-4 ">
                                <label className="block text-black text-sm font-bold mb-2"
                                    htmlFor="email">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    placeholder="Ingresa correo Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                ></input>
                                    { formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null } 
                            </div>  

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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                ></input>

                                    { formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null } 
                            </div>

                                <input type="submit" value="Login" className="bg-indigo-500 hover:bg-blue-500 w-full p-2 text-white font-bold uppercase" />

                                { classMensaje.mensajeAlerta && <Alerta/> }
                        </form>
                    </div>
                </div>
          </div>         
      </Layout>
   );
}
 
export default Login ;

