// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Biblioteca {
    // Estrutura de dados para empacotar as informações geradas pelas corretoras
    struct PacoteTitulo {
        string isin;
        uint16 valorMedio;
        uint16 valorUltimaTransacao;
        uint16 volume;
        uint16 melhorOfertaCompra;
        uint16 melhorOfertaVenda;
        uint16 transacoesParaPF;
        uint16 transacoesParaPJ;
    }
    
    // Mapeamento de códigos ISIN para códigos internos de títulos.
    mapping(bytes13 => uint16) public ListaISIN;

    // Variável para manter o próximo código interno disponível para um novo título.
    uint16 proximoCodigo;

    /**
     * @notice Consulta o código interno de um título com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @return _codigoTitulo O código interno associado ao título.
     */
    function consultaISIN(string memory _isin) view internal returns (uint16) {
        // Converte o código ISIN para um formato de 13 bytes.
        bytes13 bitIsin = bytes13(bytes(_isin));
        
        // Obtém o código interno associado ao código ISIN a partir do mapeamento.
        uint16 codigoTitulo = ListaISIN[bitIsin];
        // nome legal
        // nome comercial
        
        return codigoTitulo;
    }

    /**
     * @notice Obtém o código interno de um título com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @return _codigoTitulo O código interno associado ao título.
     */
    function obterCodigoISIN(string memory _isin) internal returns (uint16) {
        // Converte o código ISIN para um formato de 13 bytes.
        bytes13 bitIsin = bytes13(bytes(_isin));

        // Obtém o código interno associado ao código ISIN a partir do mapeamento.
        uint16 codigoTitulo = ListaISIN[bitIsin];

        // Se o ISIN não existe, adiciona à lista e atribui um novo código interno.
        if (codigoTitulo == 0) {
            proximoCodigo++;
            codigoTitulo = proximoCodigo;
            ListaISIN[bitIsin] = codigoTitulo;
        }
        return codigoTitulo;
    }

    /**
     * @notice Obtém o dia atual em formato AAMMDD.
     * @return _aammdd O dia atual em formato AAMMDD (Ano, Mês, Dia).
     */
    function obterDiaAtual() internal view returns (uint16) {
        // Obtém o timestamp atual do bloco.
        uint256 timestamp = block.timestamp;

        // Calcula o ano, mês e dia com base no timestamp.
        uint256 ano = (timestamp / 31536000) + 1970; // 31536000 segundos em um ano médio
        uint256 mes = (timestamp % 31536000) / 2629743; // Aproximadamente o número médio de segundos em um mês
        uint256 dia = (timestamp % 2629743) / 86400; // Aproximadamente o número médio de segundos em um dia

        // Converte para AAMMDD em uint16.
        uint16 aammdd = uint16((ano % 100) * 10000 + mes * 100 + dia);

        return aammdd;
    }
}
