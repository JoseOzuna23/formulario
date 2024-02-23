import React, { useState } from 'react'
import axios from 'axios'

const Index = () => {

  const [inputData, setInputData] = useState('');
  
  const handleChange = (event) => {
    setInputData(event.target.value);
  }; 
 

  const ingresar = (event) => {
    event.preventDefault();
    
    // Enviar los datos al servidor usando Axios (o fetch)
    axios.post(`http://localhost:8000/api/excedente/${inputData}`)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        // Realizar acciones adicionales después de recibir la respuesta del servidor
      })
      .catch((error) => {
        console.error('Error al enviar datos:', error);
        // Manejar errores en caso de que ocurran
      });
   
  };


return (

  <div>
      <form onSubmit={ingresar}>
        <label>
          Ingresa tu dato:
          <input type="text" value={inputData} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
)  
}

export default Index