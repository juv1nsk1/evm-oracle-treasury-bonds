// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Corretoras {

    /**
     * @notice Adiciona uma nova corretora ao contrato.
     * @param _codigo O código identificador único da corretora.
     * @param _endereco O endereço Ethereum associado à corretora.
     */
    function adicionarCorretora(uint16 _codigo, address _endereco) public onlyOwner {
        listaCorretoras[_codigo] = _endereco;
        indiceCorretoras.push(_codigo);
    }

    /**
     * @notice Consulta o endereço Ethereum associado a uma corretora pelo código identificador.
     * @param _codigo O código identificador único da corretora.
     * @return _endereco O endereço Ethereum associado à corretora.
     */
    function consultaCorretora(uint16 _codigo) public view onlyOwner returns (address){
        return listaCorretoras[_codigo];        
    }

    /**
     * @notice Remove uma corretora do sistema pelo código identificador.
     * @param _codigo O código identificador único da corretora a ser removida.
     */
    function removerCorretora(uint16 _codigo) public onlyOwner {
        delete listaCorretoras[_codigo];
        removerIndiceCorretora(_codigo);
    }

    /**
     * @notice Aplica uma multa a uma corretora específica.
     * @param _codigo O código identificador único da corretora a ser multada.
     * @param _multa O valor da multa a ser aplicada.
     */
    function multarCorretora(uint16 _codigo, uint16 _multa) public onlyOwner {
        // Reduz o saldo da corretora se o saldo for positivo.
        if (saldoCorretoras[_codigo] > 0) {
            saldoCorretoras[_codigo] -= _multa;
        }        
        // Emite um aviso de multa aplicada.
        emit AvisoCorretora("Multa", _codigo);
    }

    /**
     * @notice Registra uma atualização feita corretora a seu saldo.
     * @param _codigo O código identificador único da corretora a ser atualizada.
     */
    function registraAtualizacao(uint16 _codigo) internal {
        saldoCorretoras[_codigo] += 1;        
    }

    /**
     * @notice Define a quantidade mínima de atualizações necessárias para receber a premiação.
     * @param _numero A quantidade mínima de atualizações.
     */
    function definirQuantidadeMinimaAtualizacoes(uint16 _numero) public onlyOwner {
        quantidadeMinimaAtualizacoes = _numero;
    }

    /**
     * @dev Modificador que permite que apenas corretoras autorizadas executem determinadas funções.
     * @param _codigo O código identificador único da corretora.
     */
    modifier somenteCorretora (uint16 _codigo) {
        require(msg.sender == listaCorretoras[_codigo], "Corretora nao autorizada.");
        _;
    }

    // Evento emitido para avisar sobre a aplicação de multa ou outras ações relacionadas a corretoras.
    event AvisoCorretora(string aviso, uint16 corretora);

}
