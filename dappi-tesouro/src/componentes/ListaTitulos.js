import { formataData } from "../lib/utils";

export const ListaTitulos = ( {tabelaFiltrada, handleExibir}) => {
    
    return (
        
        <div className="row d-flex row-gap-1 pb-4" style={{overflowY: 'auto', height:'600px'}} >            
        <div className="col-12">
          <div className="card bg-dark p-4 d-flex">
            <div className="card-title">
              <h4 className="title">Títulos do Tesouro</h4>
            </div>
            <div className="card-body tabela-titulos p-0 table-responsive-md">
              <table
                className="table table-dark bg-opacity-50 table-hover align-middle"
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>                    
                    <th scope="col">Rendimento</th>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Info</th>
                  </tr>
                </thead>
                <tbody>
                {tabelaFiltrada.map((item, index) => (
                    <tr key={Math.random()} onClick={() => handleExibir(index)}>
                    <th scope="row">{index+1}</th>
                    <td>
                    {item.TrsrBd.nm}<br />
                    <span className="text-isin">{item.TrsrBd.isinCd}</span>
                    </td>
                    <td>{item.TrsrBd.anulRedRate}%</td>
                    <td>{formataData(item.TrsrBd.mtrtyDt)}</td>
                    <td>
                    <button
                        type="button"
                        className="btn btn-outline-success btn-titulos"
                    >
                        <i className="fa-solid fa-chart-simple"></i> Preço
                    </button>
                    </td>
                    </tr>
            
            ))}
                 
                </tbody>
              </table>
            </div>

      
          </div>
        </div>
      </div>
    );
}