// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Auditor.sol"; 
import "./Assinatura.sol";

contract Titulos is Auditor, Assinatura {
    struct PrecoTitulo {
        uint256 dia;
        uint256 valorMedio;
        uint256 valorUltimaTransacao;
        uint256 volume;
        uint256 melhorOfertaCompra;
        uint256 melhorOfertaVenda;
        uint256 transacoesParaPF;
        uint256 transacoesParaPJ;
    }

    // Mapeamento de códigos de títulos para informações de preço.
    mapping(uint16 => PrecoTitulo) listaTitulos;

    /**
     * @notice Atualiza os títulos com informações recebidas de uma corretora.
     * @dev Requer que o pacote de títulos tenha menos de 60 minutos de idade.
     * @param _codigoCorretora O código da corretora que envia as atualizações.
     * @param _dataDeGeracao A data de geração do pacote de títulos.
     * @param _pacoteDeTitulos Um array de estruturas PacoteTitulo contendo as informações do título.
     */
    function atualizaTitulos(uint16 _codigoCorretora, uint256 _dataDeGeracao, PacoteTitulo[] calldata _pacoteDeTitulos) public somenteCorretora(_codigoCorretora) {
        require(block.timestamp - _dataDeGeracao <= 3600, "Dados expirados."); // Verifica se o pacote tem menos de 60 minutos

        uint256 numeroRegistros = _pacoteDeTitulos.length;

        for (uint256 i = 0; i < numeroRegistros; i++) {
            atualizaTitulo(_codigoCorretora, _pacoteDeTitulos[i]);
        }
    }

    /**
     * @notice Atualiza as informações de um título com base nos dados recebidos da corretora.
     * @param _codigoCorretora O código da corretora que envia a atualização.
     * @param _titulo As informações do título a serem atualizadas.
     */
    function atualizaTitulo(uint16 _codigoCorretora, PacoteTitulo memory _titulo) private {

        // Obtém o código interno do título com base no ISIN.
        uint16 codigoTitulo = obterCodigoISIN(_titulo.isin);

        // Obtém a data atual.
        uint256 dataAtual = obterDiaAtual();

        // Obtém as informações de preço do título atual.
        PrecoTitulo memory tituloAtual = listaTitulos[codigoTitulo];

        // Realiza a auditoria do valor do título e retorna se for inválido.
        if (!auditarValor(codigoTitulo, _titulo.valorMedio, _codigoCorretora)) return;

        // Sobrescreve o valor antigo ou zerado com os dados do primeiro envio.
        if (dataAtual != tituloAtual.dia) {
            PrecoTitulo memory novoTitulo = PrecoTitulo(
                dataAtual,
                _titulo.valorMedio,
                _titulo.valorUltimaTransacao,
                _titulo.volume,
                _titulo.melhorOfertaCompra,
                _titulo.melhorOfertaVenda,
                _titulo.transacoesParaPF,
                _titulo.transacoesParaPJ
            );
            listaTitulos[codigoTitulo] = novoTitulo;

        // Já existe valor para a mesma data.
        } else {

            // Atualizar volumes
            uint256 novoVolume = tituloAtual.volume + _titulo.volume;
            uint256 transacoesParaPF = tituloAtual.transacoesParaPF + _titulo.transacoesParaPF;
            uint256 transacoesParaPJ = tituloAtual.transacoesParaPJ + _titulo.transacoesParaPJ;

            // Calcular preço médio.
            uint256 novoValorMedio = ((tituloAtual.volume * tituloAtual.valorMedio) + (_titulo.volume * _titulo.valorMedio)) / novoVolume;

            // Comparar melhor e pior oferta.
            uint256 melhorOfertaCompra = _titulo.melhorOfertaCompra;
            uint256 melhorOfertaVenda = _titulo.melhorOfertaVenda;

            if (_titulo.melhorOfertaCompra > tituloAtual.melhorOfertaCompra)
                melhorOfertaCompra = _titulo.melhorOfertaCompra;
            if (_titulo.melhorOfertaVenda < tituloAtual.melhorOfertaVenda)
                melhorOfertaVenda = _titulo.melhorOfertaVenda;

            uint256 valorUltimaTransacao = tituloAtual.valorUltimaTransacao;
            
            // Atualiza valor da ultima transacao se ele for maior que zero
            if (_titulo.valorUltimaTransacao > 0) valorUltimaTransacao=_titulo.valorUltimaTransacao;


            // Criar uma nova estrutura de informações do título.
            PrecoTitulo memory novoTitulo = PrecoTitulo(
                dataAtual,
                novoValorMedio,
                valorUltimaTransacao,
                novoVolume,
                melhorOfertaCompra,
                melhorOfertaVenda,
                transacoesParaPF,
                transacoesParaPJ
            );

            // Atualizar as informações do título.
            listaTitulos[codigoTitulo] = novoTitulo;
        }

        // Registrar a atualização na assinatura.
        registraAtualizacao(_codigoCorretora);

        // Emitir evento para sinalizar a atualização do título.
        emit AtualizacaoDeTitulo(_codigoCorretora, _titulo);
    }

    /**
     * @notice Modifica o valor da taxa de assinatura.
     * @param _valor O novo valor da taxa de assinatura.
     */
    function modificarValorAssinatura(uint256 _valor) public onlyOwner {
        valorDaAssinatura = _valor;
    }

    // Evento emitido quando um título é atualizado.
    event AtualizacaoDeTitulo(uint16 corretora, PacoteTitulo titulo);
}
