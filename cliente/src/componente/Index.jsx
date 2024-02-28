import React, { useState } from 'react'
import axios from 'axios'
import '../estilo/estilo.css';




const Index = () => {

  const [inputData1, setInputData1] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [responseData, setResponseData] = useState(null); // Estado para almacenar la respuesta del servidor 
  const [error, setError] = useState(null); // Estado para alamacenar el error
  


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
        setError(null);
      })
      .catch((error) => {
        console.error('Error al enviar datos:', error);
        // Manejar errores en caso de que ocurran
        if (error.response) {
          // Error de respuesta del servidor
          setError('Datos incorrectos ¡Intente nuevamente!');
        } else {
          // Error de petición
          setError('Error de petición, por favor inténtalo de nuevo.');
        }
        setInputData1('');
        setInputData2('');
      });
  };

  return (
    <div className='d-flex mover'>

      <div className="caja_principal">
        <div className="caja_izquierda">
          <div className="texto_caja_izquierda p-2">
            <h1 className="titulo2 mb-3 font-weight-normal text-white">Excedentes 2023</h1>
            <p className="text-white">Descubre tus excedentes del año 2023 aquí. Te invitamos a consultar y gestionar tus excedentes de
              manera sencilla y eficiente. ¡Explora tus beneficios ahora!</p>
          </div>
          <div className='d-flex justify-content-center '>
          <form className="form-signin datos" onSubmit={ingresar}>
            <label for="cedula"></label>
            <input type="text" className="form-control" id="cedula" value={inputData1} onChange={handleChangeInput1} name="cedula" pattern="\d{1-7}"
              title="Ingrese un número de cédula válido (7 dígitos)" placeholder="Ingrese su número de cédula"
              required />
            <div className="invalid-feedback">Ingrese un número de cédula válido (7 dígitos).</div>
            <input type="text" name="fecha" id="fecha" value={inputData2} onChange={handleChangeInput2} className="form-control"
              placeholder="Ingrese f. de Nac. Ej: 2024-02-23 " onfocus="(this.type='date')"
              onblur="(this.type='text')" required />
            <button className="btn btn-lg boton_color btn-block" type="submit">Consultar</button>
          </form>
          </div>
          {/* Mostrar el mensaje de error si existe */}
          {error && <div className="text-danger">{error}</div>}
        </div>

        <div class="caja_derecha text-white">
          {responseData !== null ? (
            responseData.map((item, index) => (
              <div key={index} className=' d-flex justify-content-center '>
                <div className='justify-content-end '>
                  <h4 className=' '>Detalles de Exedentes</h4>
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
                          <th> <p className='font-weight-normal text-left'> Retorno Interes s/ Aporte Capital' </p></th>
                          <th> <p> {parseFloat(item.por_aporte).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p>0 </p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal text-left'> Retorno por Operaciones Créditos </p></th>
                          <th> <p> {parseFloat(item.por_intereses).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p> 0 </p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal text-left'> Retorno por Operaciones Tarjeta </p></th>
                          <th> <p> {parseFloat(item.por_tarjeta).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p> 0 </p></th>
                          <th> <p><b></b></p></th>
                        </tr>

                        <tr>
                          <th> <p className='font-weight-normal text-left'> Descuento por Créditos </p></th>
                          <th> <p> 0 </p></th>
                          <th> <p> {parseFloat(item.descuento_credito).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal text-left'> Descuento por Tarjeta de Crédito </p></th>
                          <th> <p> 0 </p></th>
                          <th> <p> {parseFloat(item.desc3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal text-left'> Descuento por Solidaridad </p></th>
                          <th> <p> 0 </p></th>
                          <th> <p> {parseFloat(item.desc4).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal text-left'> Descuento por Aporte </p></th>
                          <th> <p> 0 </p></th>
                          <th> <p> {parseFloat(item.desc5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal text-left'> Retencion s/ Aporte Capital </p></th>
                          <th> <p> 0 </p></th>
                          <th> <p> {parseFloat(item.retencion_irp).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </p></th>
                          <th> <p><b></b></p></th>
                        </tr>
                        <tr>
                          <th> <p className='font-weight-normal'><b>TOTALES</b> </p></th>
                          <th> <b><p> {parseFloat(item.total_excedente).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                          <th> <b><p> {parseFloat(item.total_deuda).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                          <th> <b><p className='totales'> {parseFloat(item.total_a_cobrar).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs. </p></b></th>
                        </tr>
                      </tbody>

                    </table>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className=''> Datos vacios</p>
          )}

        </div>
      </div>

      <div>


      </div>
    </div>
  )
}

export default Index