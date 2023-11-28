// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "./Titulos.sol";

// Este contrato recebe atualizações dos valores dos Titulos Publicos diretamente das corretoras autorizadas pelo Tesouro Nacional
// Ao receber as transações ele calcula preço médio, melhores ofertas de compra e venda e volume negociado.
// Os preço atual fica disponível gratuitamente e os dados completos em uma função que exige contratação da assinatura.
// A governaça do contrato é feita diretamente pela carteira do tesouro nacional.


contract TesouroOracle is Titulos {

    /**
     * @notice Retorna o preço atual de um título público com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @return valorMedio O preço médio e volume negociado no dia.
     */
    function obterPrecoAtual(string calldata _isin) public view returns (uint256, uint256) {
        
        // Consulta o código interno do título com base no ISIN fornecido.
        uint16 codigoTitulo = consultaISIN(_isin);
        
        // Obtém as informações de preço do título a partir do código interno.
        PrecoTitulo memory titulo = listaTitulos[codigoTitulo];
        
        // Retorna o valor atual do título.
        return (titulo.valorMedio, titulo.volume);
    }

    /**
     * @notice Retorna informações de oferta para um título público com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @return _dia O dia das informações do título.
     * @return _valorUltimaTransacao O preço atual do título.
     * @return _volume O volume de negociação do título.
     * @return _melhorOfertaCompra A melhor oferta de compra para o título.
     * @return _melhorOfertaVenda A melhor oferta de venda para o título.
     */
    function obterOfertas(string calldata _isin) public view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
        
        // Verifica se o chamador é um assinante autorizado.
        require(verificarAssinante(), "Acesso negado. Assine esta funcao atraves de assinarServico().");
        
        // Consulta o código interno do título com base no ISIN fornecido.
        uint16 codigoTitulo = consultaISIN(_isin);
        
        // Obtém as informações do título a partir do código interno.
        PrecoTitulo memory titulo = listaTitulos[codigoTitulo];

        // Retorna informações sobre o dia, valor atual, volume, melhor oferta de compra e melhor oferta de venda.
        return (titulo.dia, titulo.valorUltimaTransacao, titulo.volume, titulo.melhorOfertaCompra, titulo.melhorOfertaVenda, titulo.transacoesParaPF, titulo.transacoesParaPJ);
    }

    /**
     * @notice Permite que um usuário assine o serviço, pagando a taxa de assinatura.
     * @dev Reverte se o valor enviado for menor que a taxa de assinatura.
     */
    function assinarServico(address _endereco) public payable {
        
        // Verifica se o valor enviado é suficiente para cobrir a taxa de assinatura (em centézimo).
        require(msg.value >= valorDaAssinatura, "Valor insuficiente. Consulte o preco em valorDaAssinatura().");
        
        // Adiciona o endereço enviado à lista de assinantes.
        adicionarAssinante(_endereco);
    }

}
