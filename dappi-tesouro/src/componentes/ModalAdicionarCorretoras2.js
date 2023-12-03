import { useEffect, useState } from 'react';


const ModalAdicionarCorretoras = ( {contrato, setModal } ) => {
  
   
  
  const [precoMedio, setPrecoMedio]= useState(0);
  
  
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

  return (
    <div >
    ModalAdicionarCorretoras

    <p onClick={()=>setModal('')}>Fechar</p>

    </div>
  );
}

export default ModalAdicionarCorretoras;
