import clienteAxios from './axios';//Este es el archivo 

const tokenAuth = token =>{
    if(token){
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
    }else{
        delete clienteAxios.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth; 