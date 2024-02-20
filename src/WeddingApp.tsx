import { useState, ChangeEvent } from "react";


export const WelcomeApp = ()=>{
    const [query, setQuery] = useState('');
  
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    };
  
    const handleSearch = () => {
      // Lógica para enviar la petición al back con la búsqueda
      console.log('Realizar búsqueda con:', query);
    };

    return(
        <>
        <h1>Confirmación de asistencia Boda Elisa y José</h1>
        <div className="search-container">
        <input
            type="text"
            placeholder="Buscar usuarios..."
            value={query}
            onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Buscar</button>
        </div>
        <h5>Esperamos tu confirmacion</h5>
        </>
    )
}