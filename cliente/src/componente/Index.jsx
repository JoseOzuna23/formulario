import React, { useState } from 'react'
import axios from 'axios'
import '../estilo/estilo.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
  },
}));

const Index = () => {

  const classes = useStyles();
  const [inputData1, setInputData1] = useState(''); // Estado para almacenar datos del primer input  
  const [inputData2, setInputData2] = useState(''); // Estado para almacenar datos del segundo input  
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

    // Enviar los datos al servidor usando Axios
    axios.post(`http://192.168.42.110:8000/api/excedente/${inputData1}/${inputData2}`)
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
      <div className="container caja_principal ">
        <div className='d-flex justify-content-center cajaSeparacionCajas '>
          <div className="caja_izquierda">
            <div className="texto_caja_izquierda p-2">
              <h1 className="titulo2 mb-3 font-weight-normal text-white">Excedentes 2023</h1>
              <p className="text-white">Descubre tus excedentes del año 2023 aquí. Te invitamos a consultar y gestionar tus excedentes de
                manera sencilla y eficiente. ¡Explora tus beneficios ahora!</p>
            </div>
            <div className='d-flex justify-content-center '>
              <form className="form-signin datos " onSubmit={ingresar}>
                <label className='labelCedula text-start mt-2' for="cedula"> Ingrese su cédula *</label>
                <input type="text" className="form-control mb-2" id="cedula" value={inputData1} onChange={handleChangeInput1} name="cedula" pattern="\d{1-7}"
                  title="Ingrese un número de cédula válido (7 dígitos)" placeholder=""
                  required />
                <div className="invalid-feedback">Ingrese un número de cédula válido (7 dígitos).</div>

                <TextField
                  id="date"
                  type="date"
                  value={inputData2}
                  onChange={handleChangeInput2}
                  // defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: '18px', color: 'white' }
                  }}
                  InputProps={{
                    style: { backgroundColor: 'white', borderRadius: '2px', margin: '15px 0px 0px' }, // Establecer el color del texto a blanco
                  }}
                  label="Fecha de Nacimiento"
                  required
                />

                <button className="btn btn-lg boton_color btn-block" type="submit">Consultar</button>
              </form>
            </div>
            {/* Mostrar el mensaje de error si existe */}
            {error && <div className="text-danger">{error}</div>}
          </div>
        </div>

        <div class="caja_derecha text-white">
          {responseData !== null ? (
            responseData.map((item, index) => (
              <div key={index} className=' d-flex justify-content-center '>
                <div className='justify-content-end p-0 m-0 contenedorCajaDerecha'>
                  <h4 className=' tituloTabla'>Detalles de Excedentes</h4>
                  <p className='text-left' ><b>Nombre:</b> {item.nombres}</p>
                  <div className='d-flex '>
                    <p className='text-left pr-5' ><b>Cedula:</b> {item.nro_cedula}</p>
                    <p className='text-left pr-5' ><b>Socio N°:</b> {item.nro_socio}</p>
                    <p className='text-left pr-5'><b>Año:</b> {item.anio}</p>
                  </div>

                  <div className='pt-3'>
                    <table className='table m-0 p-0 '>
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
                          <th> <p className='font-weight-normal p-1'><b>TOTALES</b> </p></th>
                          <th> <b><p className='p-1'> {parseFloat(item.total_excedente).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                          <th> <b><p className='p-1'> {parseFloat(item.total_deuda).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                          <th> <b><p className='totales p-1'> {parseFloat(item.total_a_cobrar).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs. </p></b></th>
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
    </div>
  )
}

export default Index