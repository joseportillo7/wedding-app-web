import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/styles.css"
import Alert from "./alert.tsx"
import AlertConfirmation from "./alert-confirmation.tsx";


interface GuestResponse {
  guest: string;
  data: Guest[];
}

interface Guest {
  id: number;
  Name: string;
  Relation: number;
  Confirmation: number;
  IsGroomsman: number;
  IsBridesmaid: number;
}

const WelcomeApp: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showAlert, setShowAlert] = useState<string>("")


  const handleConfirmation = () =>{
    setLoading(true)
    setShowAlert("Gracias por tu confirmación!")
    setSearchValue("")
    setLoading(false)
    setGuests([])
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      let response : GuestResponse | undefined  
      if(searchValue !== ""){
        const responsefetch = await fetch(
          `http://localhost:3001/api/guest?name=${searchValue}`
        );
        if (!responsefetch.ok) {
          throw new Error("Failed to fetch invitados");
        }
        response = await responsefetch.json(); // Parsear la respuesta como GuestResponse
        if(response?.data.length === 0){
          setGuests([]);
          setErrorMessage("No estas invitado!");
        }else{
          setGuests(response.data); // Establecer los datos de los invitados en el estado
          setErrorMessage(""); // Limpiar el mensaje de error si la búsqueda fue exitosa
          setShowAlert("")
        }
       
      }
    } catch (error) {
      console.error("Error fetching invitados:", error);
      setErrorMessage("No se encontraron invitados"); // Establecer un mensaje de error si la búsqueda falla
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (id: number, checked: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/guest/confirmation/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Confirmation: checked }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update guest Confirmation status");
      }
      // Actualizar el estado local si la solicitud se realizó con éxito
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === id ? { ...guest, Confirmation: checked } : guest
        )
      );
      setErrorMessage(""); // Limpiar el mensaje de error si la actualización fue exitosa
    } catch (error) {
      console.error("Error updating guest Confirmation status:", error);
      setErrorMessage(
        "No se pudo actualizar el estado de confirmación del invitado"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: '24px'
        }}
      >
        <h1>Confirmación de asistencia Boda</h1>
        <h1>Elisa & José</h1>
      </div>
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Nombre y apellido..."
            autoComplete="off"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={loading}>
            Buscar
          </button>
        </div>
      </form>
      {showAlert && <AlertConfirmation message={showAlert} />}
      {errorMessage && <Alert message={errorMessage} />}
      <div className="guest-list">
        <div>
          <h2 className="text-center mb-4">Lista de Invitados</h2>
          {guests.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Confirmar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest: Guest) => (
                  <tr key={guest.id}>
                    <td className="tdname-column">{guest.Name}</td>
                    <td className="tdconfirmation-column">
                      <input
                        type="checkbox"
                        checked={guest.Confirmation === 1}
                        onChange={(e) =>
                          handleCheckboxChange(guest.id, Number(e.target.checked))
                        }
                      />
                    </td>
                    <td className="tdstatus-column">
                      {guest.Confirmation ? "Confirmado" : "Pendiente"}
                    </td>
                  </tr>
                ))}
              </tbody>                
            </table>
          )}

          {guests.length > 0 && (
              <div className="search-container">
                <button className="button-confirmation" type="button" disabled={loading} onClick={handleConfirmation}>
                    Confirmar
                </button>                 
              </div>
          )}
          {guests.length === 0 && <p></p>}
        </div>
      </div>

    </>
  );
};

export default WelcomeApp;