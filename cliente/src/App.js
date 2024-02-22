
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './componente/Index';
import Encabezado from './componente/Encabezado';
import Principal from './componente/Principal';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Principal/>} /> 
          <Route path='/encabezado' element={<Encabezado/>} /> 
          <Route path='/index' element={<Index/>} /> 
          
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
