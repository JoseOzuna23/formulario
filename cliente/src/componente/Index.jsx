import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

const index = () => {

  const MostrarExcente = () => {
    const [listarExcedente, setListarExcedente] = useState([])


    useEffect(() => {

      axios.get('http://localhost:8000/api/excedentes')
        .then((res) => {
          console.log(res)
          setListarExcedente(res.data)
        }).catch((error) => {
          console.log(error)
        })

    }, [])
  }
    return (

      <div className='bg-info'>
        <section className='seccionIndex p-5'>
          <h3 className=''>  Ingresar numero de cedula</h3>
          <input type="text" />
          <button className='btn bg-success ms-3'>  Consultar</button>          
            <table class="table">
              <thead>
                <tr>
                  <th className='th1'>Fecha</th>
                  <th className='th1'>Post</th>

                </tr>
              </thead>
              <tbody>
                {
                  listarExcedente.map((exe) => (
                    <tr>
                      <th className='th'>
                        <p> 12/05/2022</p>
                      </th>
                      <th className='th'>
                        <p> </p>
                      </th>
                      <th>
                        <p> <i class='fas fa-user-circle icon ico'></i></p>
                      </th>
                    </tr>
                  ))
                }
              </tbody>
            </table>          

        </section>

      </div>
    )
  }

  export default index