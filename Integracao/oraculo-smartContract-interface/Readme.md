# Oráculo do Tesouro Nacional - Interface

## Descrição

Esta é a interface do contrato TesouroOracle, um oráculo projetado para fornecer informações sobre títulos do Tesouro Nacional na blockchain Ethereum. A interface define métodos que podem ser utilizados para interagir com o contrato principal, permitindo a obtenção de informações de preços e ofertas, bem como a assinatura do serviço.

## Contrato TesouroOracle

O contrato TesouroOracle é responsável por fornecer informações sobre títulos do Tesouro Nacional, incluindo preços atuais, detalhes de ofertas e a capacidade de assinar o serviço para consumidores.

## Métodos da Interface

### `obterPrecoAtual`

```solidity
function obterPrecoAtual(string calldata _isin) external view returns (uint256, uint256);
```

Este método permite obter o preço atual de um título com base no seu código ISIN. Retorna o preço médio do título e o volume negociado no dia.


### `obterOfertas`

```solidity
function obterOfertas(string calldata _isin) external view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256);
```

Este método permite obter as informações de ofertas de um título com base no seu código ISIN. Retorna o dia da última atualização do título, o preço atual do título, o volume de títulos disponíveis, o melhor preço de oferta de compra, o melhor preço de oferta de venda, a quantidade de transações realizadas para PF (pessoa física) e a quantidade de transações realizadas para PJ (pessoa jurídica).


### `assinarServico`

```solidity
function assinarServico(address _endereco) external payable;
```

Este método permite que o consumidor assine o serviço, fornecendo o pagamento necessário. É necessário enviar Ether junto com a chamada da função para pagamento do serviço.

## Uso
Para interagir com o contrato TesouroOracle, implemente a interface TesouroOracleInterface em seus contratos e utilize os métodos conforme necessário. Certifique-se de fornecer os parâmetros corretos, como o código ISIN do título ao chamar os métodos de obtenção de informações. Além disso, ao assinar o serviço, inclua o endereço da carteira ou contrato que fará acesso ao Oráculo e forneça o pagamento necessário.

### Lembre-se de respeitar as condições e requisitos específicos do contrato principal ao utilizar esta interface.

## Licença
Este contrato segue a licença MIT. Consulte o arquivo LICENSE para obter detalhes sobre os termos dessa licença.
