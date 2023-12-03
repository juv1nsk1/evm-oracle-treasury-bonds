import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const ModalValorAssinatura = ({ contrato, setModal }) => {
  const [numero, setNumero] = useState(0);
  

  function handleSalvar() {
    EnviarDados();
    setModal('');
  }

  async function EnviarDados() {
    try {
      if (numero ) {

        const valorEmWei = ethers.utils.parseEther(numero.toString());
                        
        console.log("Novo valor da assinatura:" , valorEmWei, );
        await contrato.modificarValorAssinatura(valorEmWei,  { gasLimit: 30000000 });
      } 
    } catch (err) {
      console.log("Erro:", err);
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="col-lg-12 col-sm-12" id="collapseAlterar">
      <div className="card bg-dark p-4 d-flex h-100">
        <div className="card-title">
          <h4 className="title">Valor da assinatura</h4>
        </div>
          <font className="acao">Informe o valor que deverá ser enviado ao Oráculo para as novas assinaturas. </font>
        <div className="card-body">
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="Código da Corretora" onChange={(e) => setNumero(e.target.value)} />
            <label htmlFor="floatingInput">Valor em ETH que será convertido em Wei. Exemplo 0.1</label>
          </div>

          <div className="py-4 d-flex flex-row gap-4 border-top">
            <button onClick={() => setModal("")} className="btn btn-small btn-block btn-danger" type="button">
              Cancelar
            </button>
            <button onClick={handleSalvar} className="btn btn-small btn-block btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

