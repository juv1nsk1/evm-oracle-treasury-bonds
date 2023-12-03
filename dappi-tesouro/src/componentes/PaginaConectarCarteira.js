export const PaginaConectarCarteira = ()=> {

    return (

        <div className="row d-flex row-gap-1 pb-4">
        <div className="col-lg-6 col-sm-12">
          <div className="card bg-dark p-4 d-flex">
              <div className="card-title">
                <h4 className="title ">Oráculo do Tesouro Nacional!</h4>
              </div>
              <div className="card-body">
                <div className="row d-flex gap-2 flex-column">                      
                <div className="py-4 d-flex flex-column align-items-center gap-4 justify-content-between border-bottom">
                    <div className="acao card bg-black bg-opacity-25 border-0 p-4">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center gap-3">
                        <h3>Conecte sua carteira</h3>
                        <div className="card col-18 p-3 d-flex flex-column justify-content-center align-items-center gap-1">
                        <img src="./img/fingerprint.png" alt="Acesso Restrito" className="img-fluid" />
                        <p className="text-center">Para continuar conecte sua carteira.</p></div>
                       </div>
                    </div>
                    <div className="botao">
                        <button className="btn btn-small btn-block btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive">Conectar</button>
                    </div>
                </div>
            </div>
              </div>
              
            </div>
        </div>
        </div>
    );
}