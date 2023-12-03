export const Menu = ({ handleBusca, ocultarMenu }) => {
  return (
    <aside className={ocultarMenu ? "offcanvas text-bg-dark offcanvas-start " : " text-bg-dark offcanvas-start"} id="sidebar">
      <div className="d-flex flex-column p-2">
        <ul className="sidebar-nav pt-2">
          <li className="sidebar-title p-2">Opções de menu</li>
          <li className="sidebar-item">
            <a href="/definicoes" className="sidebar-link">
              <i className="fa-solid fa-user-gear"></i>
              <span className="ps-2">Gestão do Contrato</span>
            </a>
          </li>


          <li className="sidebar-item">
            <a href="/corretoras" className="sidebar-link">
              <i className="fa-solid fa-user-gear"></i>
              <span className="ps-2">Corretoras</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/" className="sidebar-link" aria-current="page">
              <i className="fa-solid fa-chart-line"></i>
              <span className="ps-2">Titulos Públicos</span>
            </a>
          </li>
          
          <li className="sidebar-item">
            <a href="/assinar" className="sidebar-link">
              <i className="fa-solid fa-unlock"></i>
              <span className="ps-2">Assine o Óraculo</span>
            </a>
          </li>
          <div className="p-3">
            <span className="legenda text-muted">*O Serviço de assinatura diz respeito ao smart contract.</span>
          </div>
        </ul>

        <div className="bottom d-flex flex-column gap-1 p-2">
          {handleBusca ? <input className="form-control bg-dark form-control-dark w-1000" type="text" placeholder="Buscar" aria-label="Search" onChange={handleBusca} /> : null}

          <h6 className="text-center pt-4">Saiba mais</h6>
          <ul className="px-1">
            <li>
              <i className="fa-regular fa-circle-question"></i> Ouvidorial
            </li>
            <li>
              <i className="fa-regular fa-phone"></i> 145 
            </li>
            <li>
              <i className="fa-solid fa-circle-info"></i> Sobre <br/>
              <span className=" text-muted">Esse contrato encontra-se em desenvolvimento. </span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
