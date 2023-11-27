// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Corretoras.sol";
import "./Biblioteca.sol";

contract Auditor is Biblioteca, Corretoras {

    // Estrutura para armazenar limites de preço para cada código de título.
    struct PrecoLimite {
        uint16 minimo;
        uint16 maximo;
    }

    // Mapeamento de códigos de títulos para limites de preço.
    mapping(uint16 => PrecoLimite) public limites;

    /**
     * @notice Define limites de preço para um título com base no seu código ISIN.
     * @param _isin O código ISIN do título.
     * @param _precoMinimo O valor mínimo permitido para o título.
     * @param _precoMaximo O valor máximo permitido para o título.
     */
    function definirLimite(string calldata _isin, uint16 _precoMinimo, uint16 _precoMaximo) public onlyOwner {
        // Obtém o código interno do título com base no ISIN.
        uint16 codigoTitulo = obterCodigoISIN(_isin);
        
        // Atualiza os limites de preço para o título.
        limites[codigoTitulo] = PrecoLimite(_precoMinimo, _precoMaximo);
    }

    /**
     * @notice Realiza uma auditoria no valor de um título com base nos limites estabelecidos.
     * @param _codigo O código interno do título.
     * @param _valor O valor a ser auditado.
     * @param _corretora O código da corretora que envia a atualização.
     * @return _aprovado Um booleano indicando se o valor está dentro dos limites permitidos.
     */
    function auditarValor(uint16 _codigo, uint16 _valor, uint16 _corretora) internal returns (bool) {
        // Obtém os limites de preço para o título.
        PrecoLimite memory limite = limites[_codigo];
        
        // Se o limite máximo for zero, não há limites, então retorna verdadeiro.
        if (limite.maximo == 0) return true;

        // Verifica se o valor está dentro dos limites permitidos.
        if (_valor >= limite.minimo && _valor <= limite.maximo) {
            return true;
        } else {
            // Emite um evento indicando a reprovação da auditoria.
            emit AudtiorReprovacao(_corretora, _codigo, _valor);
            return false;
        }
    }

    // Evento emitido quando uma auditoria reprova um valor.
    event AudtiorReprovacao(uint16 corretora, uint16 titulo, uint16 valor);
}
