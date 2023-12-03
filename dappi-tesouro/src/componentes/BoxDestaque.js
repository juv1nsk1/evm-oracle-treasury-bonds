import { formataPreco, formataNumero } from "../lib/utils";

export const BoxDestaque = ({ titulo, valor, visivel }) => {
  // icone de lock para box exlusivo assinante
  let icone = "";
  if (!visivel) {
    icone = (
      <span className="badge bg-primary p-2">
        <i className="fa-solid fa-lock"></i>
      </span>
    );
  }

  if (!visivel && valor > "") visivel = true;
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card-tsr">
        <div className="card-title">
          <h6>{titulo}</h6>
          {icone}
        </div>
        <card-body>
          <h3 className={visivel ? "text-light" : "hidden text-light"}>{formataPreco(valor)}</h3>
        </card-body>
      </div>
    </div>
  );
};

export const BoxOfertas = ({ valorCompra, valorVenda }) => {
  // true ou false  para colocar blur
  const visivel = valorCompra > 0;

  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card-tsr bg-card-03 border-0 p-3 d-flex">
        <div className="card-title">
          <h6>Melhor Oferta</h6>
          <span className="badge bg-primary p-2">
            <i className="fa-solid fa-lock"></i>
          </span>
        </div>
        <card-body>
          <div className="row">
            <div className="col-6">
              <span>Compra</span>
              <h6 className={visivel ? "text-light" : "hidden text-light"}>{formataPreco(valorCompra)}</h6>
            </div>
            <div className="col-6">
              <span>Venda</span>
              <h6 className={visivel ? "text-light" : "hidden text-light"}>{formataPreco(valorVenda)}</h6>
            </div>
          </div>
        </card-body>
      </div>
    </div>
  );
};

export const BoxVolume = ({ titulo, valor, pf, pj }) => {
  const visivel = pf > 0;

  if (pf>0) {
    if (!isNaN(pf)) {
      pf=parseInt(pf);
      pj=parseInt(pj);
      const t= pf+pj;
      pf=((pf/t)*100).toFixed(1);
      pj=((pj/t)*100).toFixed(1);
    }    

  } else {
    pf='-';
    pj='-';
  }


  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card-tsr">
        <div className="card-title">
          <h6>{titulo}</h6>
        </div>
        <card-body>
          <h3 className="text-light">{formataNumero(valor)}</h3>
          <div className="row">
            <div className="col-6">
              <span>Pessoas</span>
              <h6 className={visivel ? "text-light" : "hidden text-light"}>{pf}%</h6>
            </div>
            <div className="col-6">
              <span>Instituições</span>
              <h6 className={visivel ? "text-light" : "hidden text-light"}>{pj}%</h6>
            </div>
          </div>
        </card-body>
      </div>
    </div>
  );
};
