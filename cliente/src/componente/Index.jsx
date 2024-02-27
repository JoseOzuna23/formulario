import React, { useState } from 'react'
import axios from 'axios'
import '../estilo/estilo.css';

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
    <div className=' '>
      <div className='d-flex justify-content-center'>
        <div className=' col-3 mt-5'>
          <form onSubmit={ingresar} className=''>
            <div className=''>
              <div className='d-flex flex-column'>
                <label className=''> Ingrese su numero de cedula </label>
                <input class="form-control" value={inputData1} onChange={handleChangeInput1}  placeholder="Ej.496963"></input>
              </div>
              <div className='d-flex flex-column'>
                <label> Ingresa su fecha de nacimiento Ej.:  <b>2024-02-08 </b></label>
                <input type="text" value={inputData2} onChange={handleChangeInput2} className='m-2' />
              </div>
            </div>
            <button type="submit" className='mb-3 btn-warning p-2 text-light'> <b>Consultar</b></button>
          </form>
        </div>
      </div>
      <div>

        {responseData !== null ? (
          responseData.map((item, index) => (
            <div key={index} className=' d-flex justify-content-center'>
              <div className='col-6 justify-content-end'>
                <h4 className='pt-3 '>Detalles de Exedentes</h4>
                <div className='d-flex justify-content-between'>
                  <p className='text-start' ><b>Cedula:</b> {item.nro_cedula}</p>
                  <p className='text-start' ><b>Socio N°:</b> {item.nro_socio}</p>
                  <p className='text-start' ><b>Nombre:</b> {item.nombres}</p></div>

                <p className='text-start'><b>Año:</b> {item.anio}</p>

                <div className='pt-5'>
                  <table className='table  '>
                    <thead>
                      <tr>
                        <th className='th1'> <b>CONCEPTOS</b></th>
                        <th className='th1'> <b>CRÉDITO</b></th>
                        <th className='th1'> <b>DÉBITO</b></th>
                        <th className='th1'> <b>A COBRAR</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Retorno Interes s/ Aporte Capital' </p></th>
                        <th> <p> {parseFloat(item.por_aporte).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p>0 </p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Retorno por Operaciones Créditos </p></th>
                        <th> <p> {parseFloat(item.por_intereses).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p> 0 </p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Retorno por Operaciones Tarjeta </p></th>
                        <th> <p> {parseFloat(item.por_tarjeta).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p> 0 </p></th>
                        <th> <p><b></b></p></th>
                      </tr>

                      <tr>
                        <th> <p className='font-weight-normal text-start'> Descuento por Créditos </p></th>
                        <th> <p> 0 </p></th>
                        <th> <p> {parseFloat(item.descuento_credito).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Descuento por Tarjeta de Crédito </p></th>
                        <th> <p> 0 </p></th>
                        <th> <p> {parseFloat(item.desc3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Descuento por Solidaridad </p></th>
                        <th> <p> 0 </p></th>
                        <th> <p> {parseFloat(item.desc4).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Descuento por Aporte </p></th>
                        <th> <p> 0 </p></th>
                        <th> <p> {parseFloat(item.desc5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal text-start'> Retencion s/ Aporte Capital </p></th>
                        <th> <p> 0 </p></th>
                        <th> <p> {parseFloat(item.retencion_irp).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </p></th>
                        <th> <p><b></b></p></th>
                      </tr>
                      <tr>
                        <th> <p className='font-weight-normal'><b>TOTALES</b> </p></th>
                        <th> <b><p> {parseFloat(item.total_excedente).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                        <th> <b><p> {parseFloat(item.total_deuda).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                        <th> <b><p className='bg-success'> {parseFloat(item.total_a_cobrar).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs. </p></b></th>
                      </tr>
                    </tbody>

                  </table>
                </div>

              </div>
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