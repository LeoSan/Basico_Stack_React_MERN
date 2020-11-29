//Archivo  principal donde se colocaran todos los componentes 
// En Next los guiones bajo significan que tienen la jerarquia mas alta _app.js 
// Nota: si usamos hook en next debemos colocar aqui el state.js 

import React from 'react';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

const MyApp = ( {Component, pageProps } )=>{

    return(
        <AuthState>
            <AppState>
                <Component { ...pageProps }  />
            </AppState>
        </AuthState>
    )
}

export default MyApp;