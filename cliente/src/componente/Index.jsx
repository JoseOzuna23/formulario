import React, { useState } from 'react'
import axios from 'axios'

const Index = () => {

  const [inputData1, setInputData1] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [responseData, setResponseData] = useState(null); // Estado para almacenar la respuesta del servidor

  const handleChangeInput1 = (event) => {
    setInputData1(event.target.value);
  };

  const handleChangeInput2 = (event) => {
    setInputData2(event.target.value);
  };

  const ingresar = (event) => {
    event.preventDefault();

    // Enviar los datos al servidor usando Axios (o fetch)
    axios.post(`http://localhost:8000/api/excedente/${inputData1}/${inputData2}`)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        setResponseData(response.data); // Almacena la respuesta del servidor en el estado    // Limpiar los inputs después de enviar la solicitud al servidor
        setInputData1('');
        setInputData2(''); 
      })
      .catch((error) => {
        console.error('Error al enviar datos:', error);
        // Manejar errores en caso de que ocurran
        setInputData1('');
        setInputData2('');
      });
  };

  return (
    <div>
      <form onSubmit={ingresar} className=''>
        <div className='p-3'>
          <div>
            <label className='p-3'>
              Ingrese su numero de cedula
              <input type="text" value={inputData1} onChange={handleChangeInput1} className='m-3'/>
            </label>
          </div>
          <div>
            <label>
              Ingresa su fecha de nacimiento Ej.:  <b>2024-02-08 </b>
              <input type="text" value={inputData2} onChange={handleChangeInput2} className='m-3' />
            </label>
          </div>
        </div>
        <button type="submit" className='mb-3 btn-warning p-2 text-light'> <b>Consultar</b></button>
      </form>
      <div>

        {responseData !== null ? (
          responseData.map((item, index) => (
            <div key={index}>
              <h2 className='pt-3 tex'>Detalles de Exedentes</h2>
              <p ><b>Nombre:</b> {item.nombres}{item.apellidos}</p>
              <p><b>Monto:</b> {item.total_a_cobrar}</p>
              <p><b>Año:</b> {item.anio}</p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  )
}

export default Index