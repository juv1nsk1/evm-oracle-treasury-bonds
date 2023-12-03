export const ModalAdministracaoContrato = ( {setModal}) => {

    return (
        <div className="row d-flex row-gap-1 pb-4">
              <div className="col-lg-12 col-sm-12">
                <div className="card bg-dark p-4 d-flex">
                    <div className="card-title">
                      <h4 className="title">Ações do contrato</h4>
                    </div>
                    <div className="card-body">
                      <div className="row d-flex gap-2 flex-column">                      
                      <div className="py-4 d-flex flex-row align-items-center justify-content-between border-bottom">
                          <div className="acao">
                              <h5>Definir valor da assinatura</h5>
                              <span>Valor em wei que um smart contrato ou dappi precisa pagar para ter acesso por 30 dias às informações de completas de precificações dos títulos.</span>
                          </div>
                          <div className="botao">
                              <button onClick={()=>setModal('alterarvalorassinatura')} className="btn btn-small btn-primary w-100" type="button">Atualizar</button>
                          </div>
                      </div>
                      <div className="py-4 d-flex flex-row align-items-center justify-content-between border-bottom">
                          <div className="acao">
                              <h5>Alterar número de atualizações</h5>
                              <span>Número mínimo de atualizações que uma corretora precisa fazer para receber o pagamento.</span>
                          </div>
                          <div className="botao">
                              <button onClick={()=>setModal('alterarnumeroatualizacoes')} className="btn btn-small btn-primary w-100" type="button">Atualizar</button>
                          </div>
                      </div>

                      <div className="py-4 d-flex flex-row align-items-center justify-content-between border-bottom">
                          <div className="acao">
                              <h5>Cadastrar Corretora</h5>
                              <span>Cadastre corretoras, agentes financeiros e Smartcontract</span>
                          </div>
                          <div className="botao">
                              <button onClick={()=>setModal('cadastrarcorretora')} className="btn btn-small btn-primary w-100" type="button" data-bs-toggle="collapse" href="#collapseAlterar" role="button" aria-expanded="false" aria-controls="collapseAlterar">Cadastrar</button>
                          </div>
                      </div>
                      <div className="py-4 d-flex flex-row align-items-center justify-content-between border-bottom">
                          <div className="acao">
                              <h5>Multar Corretora</h5>
                              <span>Número mínimo de atualizações que uma corretora precisa fazer para receber o pagamento.</span>
                          </div>
                          <div className="botao">
                              <button onClick={()=>setModal('multarcorretora')} className="btn btn-small btn-warning" type="button">Multar</button>
                          </div>
                      </div>

                      <div className="py-4 d-flex flex-row align-items-center justify-content-between border-bottom">
                          <div className="acao">
                              <h5>Pagar corretoras</h5>
                              <span>Ao clicar em pagar, 90% do saldo do contrato será distribuído para as corretoras que atingiram o número mínimo de atualizações desde o último pagamento.</span>
                          </div>
                          <div className="botao">
                              <button onClick={()=>setModal('pagarcorretoras')} className="btn btn-small btn-block btn-success" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive">Pagar</button>
                          </div>
                      </div>
                  </div>
                    </div>
                    
                  </div>
              </div>
  
            </div>
    
    )
}