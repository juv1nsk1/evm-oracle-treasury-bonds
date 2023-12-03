import { useEffect, useState } from "react";
//import { ethers } from 'ethers';

import tabelaTitulos from "../lib/titulos.json";
import { formataPreco } from "../lib/utils";
import { Topo } from "./Topo";
import { Menu } from "./Menu";
import { BoxDestaque, BoxOfertas, BoxVolume } from "./BoxDestaque";
import { ListaTitulos } from "./ListaTitulos";
import { DetalheTitulo } from "./DetalheTitulo";

const PaginaTitulos = ({ contrato }) => {
  const [tabelaFiltrada, setTabelaFiltrada] = useState(tabelaTitulos);
  const [tituloSelecionado, setTituloSelecionado] = useState(0);
  const [precoMedio, setPrecoMedio] = useState(0);
  const [precoUltimaTransacao, setPrecoUltimaTransacao] = useState(0);
  const [precoOfertaCompra, setPrecoOfertaCompra] = useState(0);
  const [precoOfertaVenda, setPrecoOfertaVenda] = useState(0);
  const [volumeTransacoes, setVolumeTransacoes] = useState(0);
  const [transacoesPF, setTransacoesPF] = useState(0);
  const [transacoesPJ, setTransacoesPJ] = useState(0);
  

  const [ocultarMenu, setOcultarMenu] = useState(false);



  useEffect(() => {
    
  }, []);

  function handleBusca(event) {
    const busca = event.target.value;    
    setTabelaFiltrada(tabelaTitulos.filter((item) => filtro(busca,item)));   
  }

  function filtro(busca,item) {
    if (item?.TrsrBd.nm.toLowerCase().includes(busca.toLowerCase()) || item?.TrsrBd.isinCd.toLowerCase().includes(busca.toLowerCase())) return true;
    else return false;
  }

  function handleExibir(index) {
    setTituloSelecionado(tabelaFiltrada[index]);
    CarregaInformacaoBasica(tabelaFiltrada[index]);
  }

  function handleOcultarMenu() {
    setOcultarMenu(!ocultarMenu);
  }

  async function CarregaInformacaoBasica(titulo) {
    

    try {
      const data = await contrato.obterOfertas(titulo.TrsrBd.isinCd);      
      if (data[0])  {
        console.log('Requisição ao contrato: ObterOfertas("' + titulo.TrsrBd.isinCd + '")')
        
        // return (titulo.dia, titulo.valorUltimaTransacao, titulo.volume, titulo.melhorOfertaCompra, titulo.melhorOfertaVenda, titulo.transacoesParaPF, titulo.transacoesParaPJ);
        setPrecoUltimaTransacao(data[1]/100);
        setPrecoMedio(data[2]/100);        

        setVolumeTransacoes(data[3]);        
        setPrecoOfertaCompra(data[4]/100);
        setPrecoOfertaVenda(data[5]/100);
        setTransacoesPF(data[6]);
        setTransacoesPJ(data[7]);

        console.log('Resposta: '+ data)
      // } else {
      //   console.log('Requisição ao contrato: ObterPreco("' + titulo.TrsrBd.isinCd + '")')
      //   data = await contrato.obterPrecoAtual(titulo.TrsrBd.isinCd);      
      //   console.log('Resposta: '+ data)
      //   setPrecoMedio(data[0]/100);
      }


    } catch (err) {
      console.log('Requisição ao contrato: ObterPreco("' + titulo.TrsrBd.isinCd + '")')
      const data = await contrato.obterPrecoAtual(titulo.TrsrBd.isinCd);      
      console.log('Resposta: '+ data)
      setPrecoMedio(data[0]/100);
    }
  }

  async function CarregaInformacaoCompleta() {
    try {
      const data = await contrato.obterOfertas(tituloSelecionado.TrsrBd.isinCd);     
      
      setPrecoUltimaTransacao(formataPreco(data[1]/100));

      //  return (titulo.dia, titulo.valorUltimaTransacao, titulo.volume, titulo.melhorOfertaCompra, titulo.melhorOfertaVenda, titulo.transacoesParaPF, titulo.transacoesParaPJ);

    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>
    <Topo handleOcultarMenu={handleOcultarMenu} ocultarMenu={ocultarMenu}/>
    
    <div className="wrapper" data-bs-theme="dark">
      <Menu  handleBusca={handleBusca} ocultarMenu={ocultarMenu}/>
      <div className="main">
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="py-4">
            {tituloSelecionado?<DetalheTitulo tituloSelecionado={tituloSelecionado} />
            :
              <h2 className="text-light">Painel Títulos do Tesouro</h2>
            }
            </div>           
            
              <div className="row d-flex row-gap-3 pb-4">
                <BoxDestaque titulo="Última transação" valor={precoUltimaTransacao}/>
                <BoxDestaque titulo="Preço Médio" valor={precoMedio} visivel={true}/>
                <BoxOfertas valorCompra={precoOfertaCompra} valorVenda={precoOfertaVenda}/>
                <BoxVolume titulo="Volume transasções" valor={volumeTransacoes} pf={transacoesPF} pj={transacoesPJ}/>
              </div>

              <ListaTitulos tabelaFiltrada={tabelaFiltrada} handleExibir={handleExibir}/>

          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default PaginaTitulos;

//<u onClick={CarregaInformacaoCompleta}>Carregar dados</u>