//Archivo  principal donde se colocaran todos los componentes 
// En Next los guiones bajo significan que tienen la jerarquia mas alta _app.js 

import React from 'react';
import AuthState from '../context/auth/authState';

const MyApp = ( {Component, pageProps } )=>{

    return(
        <AuthState>
            <Component { ...pageProps }  />
        </AuthState>
    )
}

export default MyApp;