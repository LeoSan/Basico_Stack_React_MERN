import React, {useState, useContext} from 'react';

//Importamos nuestro app context 
import appContext from '../context/app/appContext';

const Formulario = () => {

    //Se crear State para el checkbox 
    const [tienePass, setTienePass] = useState(false);

    //Acceder el state de AppState 
    const AppContext = useContext(appContext);
    const { agregarPass, agregarNumeroDescargas } =  AppContext;
    
    


    return ( 
        <>
                <div className="w-full mt-20">
                   
                    <div>
                        <label className="text-lg text-gray-800">Eliminar tras:</label>
                        <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500 "
                            onChange={e => agregarNumeroDescargas( parseInt( e.target.value ) )}
                        >
                                <option value=""  disabled > -- Selecciones-- </option>    
                                <option value="1"> 1 Descarga </option>
                                <option value="5"> 5 Descargas </option>
                                <option value="10"> 10 Descargas </option>
                                <option value="20"> 20 Descargas </option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-cnter">
                            <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña:</label>
                            <input type="checkbox"
                                    onChange={ ()=> setTienePass(!tienePass) }/>

                        </div>
                        {  tienePass ? (
                                <input 
                                type="password" 
                                className="appearance-none w-full mt-2 bg-white  border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500 "
                                onChange={e => agregarPass(e.target.value)} />
                

                        ):null }


                    </div>



                </div>
        </>

     );
}
 
export default Formulario;