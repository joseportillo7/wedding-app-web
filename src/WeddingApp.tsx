export const WelcomeApp = () => {  
    return (
        <>
            <h1>Confirmación de asistencia Boda</h1>
            <h1>Elisa & José</h1>
            <form>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Nombre y apellido..."
                        autoComplete="off"
                    />
                    <button>Buscar</button>
                </div>
            </form>            
        </>
    );
}