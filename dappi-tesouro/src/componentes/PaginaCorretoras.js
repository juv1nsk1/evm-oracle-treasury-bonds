import { useEffect, useState, FC } from "react";
import CSVReader from "react-csv-reader";
import { Topo } from "./Topo";
import { Menu } from "./Menu";

const PaginaCorretoras = ({ contrato }) => {
  const [pacote, setPacote] = useState([]);
  const [codigo, setCodigo] = useState(0);
  const [legenda, setLegenda] = useState("Enviar dados para o Oráculo");

  const dataAtual = Math.floor(Date.now() / 1000);

  const handleCSV = (data, fileInfo) => {
    const csvContent = data.slice(1); // Ignorar o cabeçalho

    const dadosFormatados = csvContent.map((linha) => {
      linha.valorMedio = Math.round(linha.valorMedio * 100);
      linha.valorUltimaTransacao = Math.round(linha.valorUltimaTransacao * 100);
      linha.melhorOfertaCompra = Math.round(linha.melhorOfertaCompra * 100);
      linha.melhorOfertaVenda = Math.round(linha.melhorOfertaVenda * 100);

      return linha;
    });

    if (dadosFormatados.length) setPacote(dadosFormatados);
  };

  const handleCSVError = (err) => {
    console.log(err);
  };

  async function handleEnviar() {
    if (codigo && pacote) {
      await EnviarDados();
      setLegenda("Dados enviados");
    }
  }

  async function EnviarDados() {
    try {
      if (pacote) {
        const data = await contrato.atualizaTitulos(codigo, dataAtual, pacote, { gasLimit: 30000000 });
      }
    } catch (err) {
      console.log("ERRO:", err);
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
                <h2 className="text-light">Painel para Corretoras</h2>
              </div>
              <div className="col-lg-12 col-sm-12" id="collapseAlterar">
                <div className="card bg-dark p-4 d-flex h-100">
                  <div className="card-title">
                    <h4 className="title">Selecione o arquivo que contém o pacote de títulos para atualizar o Oráculo</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingInput" placeholder="Código da Corretora" onChange={(e) => setCodigo(e.target.value)} />
                      <label htmlFor="floatingInput">Código da Corretora</label>
                    </div>
                    <div className="input-group mb-3">
                      <CSVReader className="form-control" id="inputGroupFile02" onFileLoaded={handleCSV} onError={handleCSVError} parserOptions={{ header: true, skipEmptyLines: true }} />
                    </div>
                    <div className="py-4 d-flex flex-row gap-4 border-top">
                      <button className="btn btn-small btn-block btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#ModalLive" onClick={handleEnviar}>
                        {legenda}
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
};

export default PaginaCorretoras;
