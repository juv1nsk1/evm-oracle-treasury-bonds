import { useEffect, useState } from 'react';

import './App.css';
import { ConectaContrato } from './lib/ConectaContrato';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PaginaTitulos from './componentes/PaginaTitulos';
import PaginaDefinicoes from './componentes/PaginaDefinicoes';
import PaginaCorretoras from './componentes/PaginaCorretoras';
import PaginaAssinarServico from './componentes/PaginaAssinarServico';
import { PaginaConectarCarteira } from './componentes/PaginaConectarCarteira';


function App() {
  
  const [contrato,setContrato] = useState();

  async function  iniciaApp() {
    try {
     const con=await ConectaContrato();     
     setContrato(con);
    } catch (e) { }
  }

  useEffect(() => {

    if (window.ethereum)   iniciaApp()
    
        
  }, []);
  
  if (contrato !== undefined) {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route index element={<PaginaTitulos contrato={contrato} />} />
          <Route path="/definicoes" element={<PaginaDefinicoes contrato={contrato} />} />
          <Route path="/corretoras" element={<PaginaCorretoras contrato={contrato} />} />
          <Route path="/assinar" element={<PaginaAssinarServico contrato={contrato} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  } else {
    return (
  <PaginaConectarCarteira />
    )
  }
}

export default App;
