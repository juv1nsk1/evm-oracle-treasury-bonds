// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Assinatura {
    // Valor da assinatura padrão inicializado como 1.
    uint256 public valorDaAssinatura = 0;

    // Mapeamento de endereços para datas de expiração da assinatura.
    mapping(address => uint256) listaAssinantes;

    /**
     * @notice Adiciona o endereço do contrato à lista de assinantes e registra o pagamento da assinatura.
     * @dev Requer que o valor enviado seja maior que zero.
     * @param _endereco Endereço do contrato que realizará chamadas ao oráculo.
     */
    function adicionarAssinante(address _endereco) internal {

        // Registra o endereço do remetente na lista de assinantes por 30 dias.
        listaAssinantes[_endereco] = block.timestamp + 30 days;

        // Emite um evento indicando um novo assinante.
        emit NovoAssinante(_endereco, msg.value);
    }

    /**
     * @notice Verifica se o endereço do remetente é um assinante válido.
     * @return _assinante Um booleano indicando se o remetente é um assinante válido.
     */
    function verificarAssinante() internal view returns (bool) {
        // Verifica se o endereço está na lista de assinantes e se a assinatura ainda é válida.
        return (listaAssinantes[msg.sender] > 0 && listaAssinantes[msg.sender] > block.timestamp);
    }

    // Evento emitido quando um novo assinante é adicionado.
    event NovoAssinante(address endereco, uint256 valor);
}
