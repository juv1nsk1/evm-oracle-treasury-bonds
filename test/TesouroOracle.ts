import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  
  
  describe("Oráculo Tesouro Nacional", function () {
    async function deployFixture() {
      const [owner, otherAccount] = await ethers.getSigners();    
  
      const factory = await ethers.getContractFactory("TesouroOracle");
      const oracleContract = await factory.deploy();        
      const ownerAddress=owner.address
              
      return { oracleContract, ownerAddress };

    }
  
    // definicao de valores para serem usados nos testes
    const _codigoCorretora=123;
    const _dia=231115;
    const _valor=1000;
    const _valor2=990;
    const _volume=5;
    const _melhorOfertaCompra=999;
    const _melhorOfertaVenda=1001;
    const _dataAtual = Math.floor(Date.now() / 1000);
    const _isin="BRSTNCLF0008";
    const _auditorLimiteMinimo=_valor;
    const _auditorLimiteMaximo=_valor;
    const _numeroAtualizacoesMinimas=0;   
    const _valorAssinatura= ethers.parseEther('0.01');

    const _PrecoTitulo = {
        isin: _isin,  
        valorMedio: _valor,
        valorUltimaTransacao: _valor,
        volume: _volume,
        melhorOfertaCompra: _melhorOfertaCompra,
        melhorOfertaVenda: _melhorOfertaVenda ,
        transacoesParaPF: _volume,   
        transacoesParaPJ:_volume  
      };
      const _PrecoTitulo2 = {
        isin: _isin,  
        valorMedio: _valor2,
        valorUltimaTransacao: _valor2,
        volume: 5,
        melhorOfertaCompra: _valor2,
        melhorOfertaVenda: _valor2,
        transacoesParaPF: _volume,   
        transacoesParaPJ:_volume       
      };
    
    const  PacoteTitulo = [_PrecoTitulo, _PrecoTitulo2];
    
    //console.log( await  oracleContract.obterOfertas(_isin) );
  
    it("Adiciona corretora,verifica endereço e a remove.", async function () {      
      const {oracleContract , ownerAddress} = await loadFixture(deployFixture);                  
      await oracleContract.adicionarCorretora(_codigoCorretora, ownerAddress);  
      expect(await oracleContract.consultaCorretora(_codigoCorretora)).to.equal(ownerAddress); 
      await oracleContract.removerCorretora(_codigoCorretora);  
    });

    it("Adiciona titulos e verifica novo preço médio.", async function () {        
        const {oracleContract , ownerAddress} = await loadFixture(deployFixture); 
        await oracleContract.adicionarCorretora(_codigoCorretora, ownerAddress);                                 
        await oracleContract.atualizaTitulos(_codigoCorretora, _dataAtual, PacoteTitulo);          
        const res = await oracleContract.obterPrecoAtual(_isin);
        expect(res[0]).to.lessThan(_valor);         
    });

    it("Adiciona titulos, contrata feed e verifica melhor oferta de compra e venda", async function () {        
        const {oracleContract , ownerAddress} = await loadFixture(deployFixture); 
        await oracleContract.adicionarCorretora(_codigoCorretora, ownerAddress);                                 
        await oracleContract.atualizaTitulos(_codigoCorretora, _dataAtual, PacoteTitulo);               
        await oracleContract.assinarServico(ownerAddress, {value:_valorAssinatura});    
        expect(await oracleContract.obterOfertas(_isin)).to.contain(990n); 
        
    });
  
    it("Adiciona auditor e verifica bloqueio.", async function () {        
        const {oracleContract , ownerAddress} = await loadFixture(deployFixture); 
        await oracleContract.adicionarCorretora(_codigoCorretora, ownerAddress);     
        await oracleContract.definirLimite(_isin, _auditorLimiteMinimo, _auditorLimiteMaximo);          
        await oracleContract.atualizaTitulos(_codigoCorretora, _dataAtual, PacoteTitulo);          
        const res = await oracleContract.obterPrecoAtual(_isin);
        expect(res[0]).to.equal(_valor);  // nao aceitou o segundo que esta fora do limite do auditor
        
    });
  
    it("Adiciona corretora, define número de atualizacoes minimas e efetua pagameto do prêmio.", async function () {        
        const {oracleContract , ownerAddress} = await loadFixture(deployFixture);         
        await oracleContract.adicionarCorretora(_codigoCorretora, ownerAddress);     
        await oracleContract.definirQuantidadeMinimaAtualizacoes(_numeroAtualizacoesMinimas);                  
        expect(await oracleContract.quantidadeMinimaAtualizacoes()).to.equal(_numeroAtualizacoesMinimas);
        await oracleContract.assinarServico(ownerAddress, {value:_valorAssinatura});     
        await oracleContract.pagarCorretoras();     
    });
    it("Teste funções adicionais de governança: Multa corretora e modifica valor da assinatura", async function () {        
        const {oracleContract , ownerAddress} = await loadFixture(deployFixture);         
        await oracleContract.multarCorretora(_codigoCorretora, 1); 
        await oracleContract.modificarValorAssinatura(_valorAssinatura);  
        expect(await oracleContract.valorDaAssinatura()).to.equal(_valorAssinatura);                         
    });
});