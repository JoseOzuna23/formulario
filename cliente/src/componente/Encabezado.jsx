import React from 'react'
import '../estilo/Encabezado.css';

const Encabezado = () => {
  return (
    <>
    <header className="cabezera">
        <div className="cabezera_img">
            <img className="mb-4 imgLogo" src="/logoCoo.png" alt=""/>
        </div>
        <div className="cabezera_info">
            <h1 className="text-center Titulo">Cooperativa 8 de Marzo Ltda.</h1>
            <h4>Somos una entidad de reconocida solvencia que brinda servicios Financieros y Sociales.</h4>
            <h5>Mauricio José Troche Nº 484 e/Defensores del Chaco y Cacique Lambaré</h5>
            <h5>(021) 918 8000</h5>
        </div>
    </header>
    
    </>
  )
}

export default Encabezado