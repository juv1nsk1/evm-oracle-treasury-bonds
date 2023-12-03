import { useEffect, useState } from "react";
import { verificarSaldoContrato } from "../lib/ConectaContrato";

export const ModalPagarCorretoras = ({ contrato, setModal }) => {  
  const [saldo, setSaldo] = useState(0);

  function handleSalvar() {
    EnviarDados();
    setModal('');
  }

  async function EnviarDados(pacote) {
    try {
      if (saldo>0) {
      console.log("Pagamento de corretoras")
        await contrato.pagarCorretoras({ gasLimit: 30000000 });
      } else 
        console.log("Saldo insuficiente.")
      
    } catch (err) {
      console.log("Erro:", err);
    }
  }

  async function atualizaSaldo() {
    const data= await verificarSaldoContrato();
    const valor = data.toNumber();
    if (valor) {
      console.log(valor);
      setSaldo(valor);
    }

  }

  useEffect(() => {

atualizaSaldo();

  }, []);

  return (
    <div className="col-lg-12 col-sm-12" id="collapseAlterar">
      <div className="card bg-dark p-4 d-flex h-100">
        <div className="card-title">
          <h4 className="title">Pagar corretoras | Saldo {saldo} ETH</h4>
        </div>
          <font className="acao">Ao clicar em pagar, 90% do saldo do contrato será distribuído para as corretoras que atingiram o número mínimo de atualizações desde o último pagamento.</font>
        <div className="card-body">
          
          <div className="py-4 d-flex flex-row gap-4 border-top">
            <button onClick={() => setModal("")} className="btn btn-small btn-block btn-danger" type="button">
              Cancelar
            </button>
            <button onClick={handleSalvar} className="btn btn-small btn-block btn-success" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive">
              Pagar 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

