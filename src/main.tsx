import React from 'react'
import ReactDOM  from 'react-dom/client';
import WeddingApp from './components/WeddingApp';

const rootElement = document.getElementById('root')

if(rootElement){
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <WeddingApp/>            
        </React.StrictMode>
    )
}else{
    console.log('Element with id root not found!');
}