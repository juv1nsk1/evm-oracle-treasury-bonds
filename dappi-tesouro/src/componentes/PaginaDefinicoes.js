import { useEffect, useState } from 'react';
import ModalAdicionarCorretoras from './ModalAdicionarCorretoras';
import { Topo } from "./Topo";
import { Menu } from "./Menu";
import { ModalAdministracaoContrato } from './ModalAdministracaoContrato';
import { ModalMultarCorretoras } from './ModalMultarCorretora';
import { ModalPagarCorretoras } from './ModalPagarCorretoras';
import { ModalNumeroAtualizacoes } from './ModalNumeroAtualizacoes';
import { ModalValorAssinatura } from './ModalValorAssinatura';

const PaginaDefinicoes = ( {contrato } ) => {
  
   
  
  const [modal, setModal] = useState('');
  
  
  useEffect(() => {

    
  }, []);


  

  // function handleBusca(event) {
  //   const busca=event.target.value;
  //   setTabelaFiltrada(tabelaTitulos.filter((item)=> item?.TrsrBd.nm.toLowerCase().includes(busca.toLowerCase())));
  //   console.log(tabelaFiltrada.length)
  // }


  // function exibir(index) {
  //  setTituloSelecionado(tabelaFiltrada[index]);
  // }

  // async function CarregaInformacaoBasica() {
    
  //     try {
        
  //       const data= await contrato.valorDaAssinatura();
  //       console.log(data)
  //       setPrecoMedio(data.toNumber());        
  //     } catch (err) {
  //       console.log(err);
  //     }
    
  // }

  function assinar() {

        // const valorDecimal = 0.01; // 0.1 Ether
        // const valorEmWei = ethers.utils.parseEther(valorDecimal.toString());
        //  console.log("assinatura:", valor, valorEmWei);        
        //const gasLimit = await contrato.estimateGas.assinarServico();
        //console.log('limite:' ,gasLimit);
        //const tx =  await contrato.assinarServico({value:valorEmWei, gasLimit:valorEmWei});
        //const tx =  await contrato.assinarServico({value:0, gasLimit:0});
        //console.log(tx);
  }

  if (modal === 'adicionar')  return (<ModalAdicionarCorretoras contrato={contrato} setModal={setModal}/>);
  else {
    
    return (
      <>
      <Topo />
      
      <div className="wrapper">
        <Menu />
        <div className="main">
          <main className="content px-3 py-2">
            <div className="container-fluid">
              <div className="py-4">
                <h2 className="text-light">Ferramentas de gestão do contrato Oráculo</h2>
              </div>
              
              {modal===''?
                <ModalAdministracaoContrato setModal={setModal}   />
              :modal==='cadastrarcorretora'?
                <ModalAdicionarCorretoras contrato={contrato} setModal={setModal}/>
              :modal==='alterarnumeroatualizacoes'?
                <ModalNumeroAtualizacoes contrato={contrato} setModal={setModal}/>
              :modal==='multarcorretora'?              
                <ModalMultarCorretoras contrato={contrato} setModal={setModal}/>
              :modal==='alterarvalorassinatura'?              
                <ModalValorAssinatura contrato={contrato} setModal={setModal}/>
              :modal==='pagarcorretoras'?
                <ModalPagarCorretoras contrato={contrato} setModal={setModal}/>
              :null
              }
            
          </div>
        </main>
      </div>
    </div>
    </>
    
  );
  }
}

export default PaginaDefinicoes;

