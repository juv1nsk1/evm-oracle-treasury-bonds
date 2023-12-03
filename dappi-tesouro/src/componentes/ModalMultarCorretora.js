import { useEffect, useState } from "react";

export const ModalMultarCorretoras = ({ contrato, setModal }) => {
  const [codigo, setCodigo] = useState(0);
  const [multa, setMulta] = useState(0);

  function handleSalvar() {
    EnviarDados();
    setModal('');
  }

  async function EnviarDados(pacote) {
    try {
      if (codigo && multa) {
        console.log("Corretora multada:" , codigo, multa);
        await contrato.adicionarCorretora(codigo, multa, { gasLimit: 30000000 });
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
          <h4 className="title">Multar corretora</h4>
        </div>
        <div className="card-body">
          <font className="acao">Código numérico fornecido pela Tesouro Nacional:</font>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="Código da Corretora" onChange={(e) => setCodigo(e.target.value)} />
            <label htmlFor="floatingInput">Código da Corretora</label>
          </div>
          <font className="acao">Valor da multa em número de atualizações a serem descontadas:</font>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput2" placeholder="Endereço da Corretora" onChange={(e) => setMulta(e.target.value)} />
            <label htmlFor="floatingInput2">Multa</label>
          </div>
          <div className="py-4 d-flex flex-row gap-4 border-top">
            <button onClick={() => setModal("")} className="btn btn-small btn-block btn-danger" type="button">
              Cancelar
            </button>
            <button onClick={handleSalvar} className="btn btn-small btn-block btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive">
              Multar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

