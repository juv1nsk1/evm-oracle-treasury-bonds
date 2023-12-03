import { dataPorExtenso, mercadoAberto } from "../lib/utils";
export const Topo = ( {handleOcultarMenu}) => {

    
// Exemplo de uso
const data = dataPorExtenso();
const mercado= mercadoAberto();
  
    return (

        <header
        className="nav navbar bg-dark sticky-top flex-md-nowrap align-items-center p-3 gap-3 shadow"
      >
        <img src="img/logo.svg" alt="TSR Oráculo" />
        <button className="btn" id="sidebar-toggle" type="button" onClick={handleOcultarMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex w-100 pe-3 align-items-end justify-content-end">
          <div className="d-flex flex-row align-middle gap-2">
            <li>
              <span>{data}</span>
            </li>
             <li>
             {mercado?<span className="badge bg-success text-bg-light">Mercado aberto</span>
             :
              <span className="badge bg-warning text-bg-light">Mercado fechado</span>
              }
            </li> 
          </div>
        </div>
      </header>

    )
}