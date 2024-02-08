import React from 'react'
import ReactDOM  from 'react-dom/client';

function App(){
    return(
        <h1>Bienvenido a la boda de Elisa y Jose</h1>
    )
}

const rootElement = document.getElementById('root')

if(rootElement){
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}else{
    console.log('Element with id root not found!');
}