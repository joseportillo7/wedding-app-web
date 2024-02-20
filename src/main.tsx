import React from 'react'
import ReactDOM  from 'react-dom/client';
import { WelcomeApp } from './WeddingApp';
import './styles.css'


const rootElement = document.getElementById('root')

if(rootElement){
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <WelcomeApp/>
        </React.StrictMode>
    )
}else{
    console.log('Element with id root not found!');
}