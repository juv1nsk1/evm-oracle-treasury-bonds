import { useEffect, useState } from 'react';
import { Topo } from "./Topo";
import { Menu } from "./Menu";

const PaginaAssinarServico = ( {contrato } ) => {
  
   
  
  const [endereco, setEndereco]= useState("");
  const [valor, setValor]= useState(0);
  
  function handleAssinar() {
    assinar();
  }

  useEffect(() => {

    getValorAssinatura();

  }, []);


    

  async function getValorAssinatura() {

    try {
        const data =  await contrato.valorDaAssinatura();        
       setValor(data.toNumber());

    } catch (err) {
        console.log(err);
    }
}

  async function assinar() {

        try {            
            const data =  await contrato.valorDaAssinatura();
            const tx =  await contrato.assinarServico(endereco, {value:data, gasLimit:3000000});
            console.log("Assinar serviço ", endereco);

        } catch (err) {
            console.log(err);
        }
  }

  return (
    <>
    <Topo />
    
    <div className="wrapper">
      <Menu />
      <div className="main">
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="py-4">
              <h2 className="text-light">Assinatura do serviço de Oráculo | Valor {valor} ETH </h2>
            </div>

                    
            <div className="col-lg-12 col-sm-12" id="collapseAlterar">
              <div className="card bg-dark p-4 d-flex h-100">
                <div className="card-title">
                  <h4 className="title">Ao assinar o serviço do Oŕáculo do Tesouro você terá 30 dias de acesso ao preços atualizados dos títulos públicos </h4>
                </div>
                  <font className="acao">Endereço do contrato ou carteira que terá acesso ao Oráculo:</font>
                <div className="card-body">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Código da Corretora" onChange={(e) => setEndereco(e.target.value)} />
                    <label htmlFor="floatingInput">Endereço 0x1234...</label>
                  </div>
                  
                  <div className="py-4 d-flex flex-row gap-4 border-top">

                    <button onClick={handleAssinar} className="btn btn-small btn-block btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive">
                      Assinar
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default PaginaAssinarServico;
