// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Ownable.sol";
import "./ReentrancyGuard.sol";


contract Pagamento is Ownable(msg.sender), ReentrancyGuard {
    // Mapeamento de códigos de corretoras para seus endereços.
    mapping(uint16 => address) listaCorretoras;

    // Mapeamento de códigos de corretoras para saldos acumulados.
    mapping(uint16 => uint16) saldoCorretoras;

    // Índice das corretoras no contrato.
    uint16[] indiceCorretoras;

    // Quantidade mínima de atualizações necessárias para um pagamento.
    uint16 public quantidadeMinimaAtualizacoes = 10;

    /**
     * @notice Realiza o pagamento das corretoras com base nas atualizações acumuladas.
     */
    function pagarCorretoras() public onlyOwner nonReentrant {
        // Calcula o valor total a ser pago às corretoras.
        uint256 valorTotal = calculaPremioCorretoras();
        require(valorTotal > 0, "Sem saldo para pagamentos.");

        // Lista as corretoras com saldo mínimo de atualizações.
        (uint16[] memory corretorasComSaldoMinimo, uint16 numeroCorretoras) = listarCorretorasComMinimoAtualizacoes();

        // Calcula o valor a ser pago a cada corretora.
        uint256 pagamento = uint256(valorTotal / numeroCorretoras);

        uint16 codigoCorretora;

        // Transfere o pagamento para cada corretora.
        for (uint16 i = 0; i < numeroCorretoras; i++) {
            codigoCorretora = corretorasComSaldoMinimo[i];
            address enderecoCorretora = listaCorretoras[codigoCorretora];

            // Certifique-se de que a corretora não é um endereço nulo antes de transferir Ether.
            require(
                enderecoCorretora != address(0),
                "Endereco de corretora invalido"
            );

            // Transferir parte do saldo acumulado para cada corretora.
            payable(enderecoCorretora).transfer(pagamento);
        }
    }

    /**
     * @notice Calcula o valor total a ser distribuído às corretoras.
     * @return _valorTotal O valor total a ser distribuído.
     */
    function calculaPremioCorretoras() public view onlyOwner returns (uint256) {
        // Obtém o saldo atual do contrato.
        uint256 saldoContrato = address(this).balance;
        
        // Calcula 90% do saldo do contrato como valor total a ser distribuído.
        uint256 totalSerDivido = (saldoContrato * 9) / 10; // 90% do saldo do contrato
        return totalSerDivido;
    }

    /**
     * @notice Lista as corretoras com saldo mínimo de atualizações.
     * @return corretorasComSaldoMinimo Os códigos das corretoras com saldo mínimo.
     * @return numeroCorretoras O número de corretoras com saldo mínimo.
     */
    function listarCorretorasComMinimoAtualizacoes()
        internal
        returns (uint16[] memory , uint16)
    {
        uint256 numeroRegistros = indiceCorretoras.length;
        uint16[] memory corretorasComSaldoMinimo = new uint16[](
            numeroRegistros
        );
        uint16 contador = 0;
        uint16 codigoCorretora;

        for (uint16 i = 0; i < numeroRegistros; i++) {
            codigoCorretora = indiceCorretoras[i];
            if (saldoCorretoras[codigoCorretora] >= quantidadeMinimaAtualizacoes) {
                corretorasComSaldoMinimo[contador] = codigoCorretora;
                contador++;
                
                // Zera o saldo para o próximo período.
                saldoCorretoras[codigoCorretora] = 0;
            }
        }

        // Redimensiona o array resultante para o tamanho real.
        assembly {
            mstore(corretorasComSaldoMinimo, contador)
        }

        return (corretorasComSaldoMinimo, contador);
    }

    /**
     * @notice Remove um código de corretora do índice interno.
     * @param _codigo O código da corretora a ser removido.
     */
    function removerIndiceCorretora(uint16 _codigo) internal {
        for (uint16 i = 0; i < indiceCorretoras.length; i++) {
            if (indiceCorretoras[i] == _codigo) {
                // Substitui o valor encontrado pelo último valor no array.
                indiceCorretoras[i] = indiceCorretoras[
                    indiceCorretoras.length - 1
                ];
                // Remove a última posição, que agora está duplicada no final.
                indiceCorretoras.pop();
                break;
            }
        }
    }
}
