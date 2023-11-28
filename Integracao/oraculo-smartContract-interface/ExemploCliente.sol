// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importa a interface do contrato de oráculo TesouroOracle.
import "./InterfaceTesouroOracle.sol";

// Importa biblioteca Ownable
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ExemploCliente
 * @notice Contrato de exemplo que interage com o contrato de oráculo TesouroOracle.
 */
contract ExemploCliente is Ownable(msg.sender) {
    // Endereço do contrato de oráculo.
    address enderecoOraculo;

    // Instância do contrato de oráculo usando a interface TesouroOracle.
    TesouroOracleInterface internal contratoOraculo;

    // Variável para armazenar um valor inteiro.
    uint256 valor;

    /**
     * @notice Construtor do contrato.
     * @param _oracle O endereço inicial do contrato de oráculo.
     */
    constructor(address _oracle) {
        AtualizaOracle(_oracle);
    }

    /**
     * @notice Atualiza o endereço do contrato de oráculo.
     * @param _endereco O novo endereço do contrato de oráculo.
     */
    function AtualizaOracle(address _endereco) public onlyOwner {
        enderecoOraculo = _endereco;
        contratoOraculo = TesouroOracleInterface(enderecoOraculo);
    }

    /**
     * @notice Consulta o preço atual de um título com base no seu código ISIN.
     * @param _isin O código ISIN do título a ser consultado.
     */
    function ConsultarTitulo(string calldata _isin) public {
        (valor,) = contratoOraculo.obterPrecoAtual(_isin);
    }

    /**
     * @notice Assina o serviço do contrato de oráculo, fornecendo o pagamento necessário.     
     */
    function AssinarServico() public payable {
        contratoOraculo.assinarServico{value: msg.value}(msg.sender);
    }
    
    /**
     * @notice Consulta as ofertas de um título com base no seu código ISIN.
     * @param _isin O código ISIN do título a ser consultado.
     */
    function ConsultarOfertas(string calldata _isin) public payable {
        contratoOraculo.obterOfertas(_isin);
    }
}
