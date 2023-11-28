// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TesouroOracle
 * @notice Interface para interagir com o contrato de oráculo TesouroOracle.
 */
interface TesouroOracleInterface  {
    
    /**
     * @notice Obtém o preço atual de um título com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @return _valorMedio O preço médio do título e o volume negociado no dia.
     */
    function obterPrecoAtual(string calldata _isin) external view returns (uint256, uint256);

    /**
     * @notice Obtém as informações de ofertas de um título com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @return _dia O dia da última atualização do título.
     * @return _valorUltimaTransacao O preço atual do título.
     * @return _volume O volume de títulos disponíveis.
     * @return _melhorOfertaCompra O melhor preço de oferta de compra.
     * @return _melhorOfertaVenda O melhor preço de oferta de venda.
     * @return _transacoesParaPF Quantidade de transações realizadas para PF.
     * @return _transacoesParaPF Quantidade de transações realizadas para PJ.
     */
    function obterOfertas(string calldata _isin) external view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256);

    /**
     * @notice Permite que o consumidor assine o serviço, fornecendo o pagamento necessário.
     * @param _endereco Endereco do contrato ou carteira que fara acesso ao Oraculo
     */
    function assinarServico(address _endereco) external payable;
}
