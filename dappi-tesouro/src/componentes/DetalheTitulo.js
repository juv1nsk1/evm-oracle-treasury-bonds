export const DetalheTitulo = ( {tituloSelecionado} ) => {

    return (
        
              <div className="col-12 ">
                <div className="card ">
                  <div className="row d-flex flex-row justify-content-between">
                    <div className="col-lg-8 col-md-10 col-sm-12">
                      <div className="card-body d-flex flex-column justify-content-between">
                      <h2>{tituloSelecionado.TrsrBd.nm}</h2>
                      <span className="text-muted pb-4">Tipo: {tituloSelecionado.TrsrBdType.nm} - Código isin: {tituloSelecionado.TrsrBd.isinCd}  - Selic: {tituloSelecionado.SelicCode}</span>
                      <p> {tituloSelecionado.TrsrBd.featrs}</p>
                      </div>
                    </div>
                    <div className="col-lg-2 p-4 col-md-02 col-sm-12 d-flex flex-column align-items-start justify-content-center">
                      <span>Rentabilidade anual</span>
                        <h2 className="text-success">{tituloSelecionado.TrsrBd.anulInvstmtRate ? tituloSelecionado.TrsrBd.anulInvstmtRate : tituloSelecionado.TrsrBd.anulRedRate}%</h2>
                    </div>
                  </div>
                </div>
              </div>
            

    );

}

/*
        <>

        <h2 className="text-light">{tituloSelecionado.TrsrBd.nm}</h2>
        Tipo: {tituloSelecionado.TrsrBdType.nm} - Código isin: {tituloSelecionado.TrsrBd.isinCd}  - Selic: {tituloSelecionado.SelicCode}

        <p style={{float:'right'}} className="text-light">
            {tituloSelecionado.TrsrBd.anulInvstmtRate ? tituloSelecionado.TrsrBd.anulInvstmtRate : tituloSelecionado.TrsrBd.anulRedRate}% <br/>
            Rendimento anual: 
        </p>
        
        <div style={{width:'70%'}}>
        <p className="text-light">
        {tituloSelecionado.TrsrBd.featrs}
        <br />
        
        <br />
        
        </p>
        </div>



        </>*/