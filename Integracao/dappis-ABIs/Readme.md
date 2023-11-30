# ABI do Contrato de Oráculo do Tesouro Nacional

A ABI (Interface Binária de Aplicação) em contratos inteligentes é uma especificação que define como os dados devem ser codificados e decodificados ao interagir com contratos inteligentes na Ethereum Virtual Machine (EVM) ou em ambientes compatíveis com a EVM, como outras blockchains baseadas em Ethereum.

A ABI descreve a estrutura binária das funções, eventos e dados de um contrato inteligente. Isso inclui a codificação dos tipos de dados dos parâmetros das funções, a organização dos dados na transação, e a decodificação das respostas. A ABI é essencial para que as chamadas de função e a leitura de eventos sejam realizadas corretamente entre diferentes entidades que interagem com o contrato.

### Onde a ABI Pode ser Usada:

- Desenvolvimento de Contratos Inteligentes:

- Aplicações de interface gráfica e DApps usam a ABI para interagir com contratos inteligentes. 

- Desenvolvimento de aplicações Backend que interajam com contratos inteligentes.

## Funções

Funções em contratos inteligentes (smart contracts) representam os blocos de execução de código que podem ser chamados ou invocados por outros contratos ou por usuários externos. Elas são responsáveis por realizar operações específicas e podem ter parâmetros de entrada e saída

`obterPrecoAtual`

```javascript
/**
 * @notice Retorna o preço atual de um título público com base no seu código ISIN.
 * @param _isin O código ISIN do título.
 * @return valorMedio O preço médio e volume negociado no dia.
 */
function obterPrecoAtual(string calldata _isin) public view returns (uint256, uint256) {}
```

`obterOfertas`

```javascript

/**
 * @notice Retorna informações de oferta para um título público com base no seu código ISIN.
 * @param _isin O código ISIN do título.
 * @return _dia O dia das informações do título.
 * @return _valorUltimaTransacao O preço atual do título.
 * @return _valorMedio O preço medio do título no dia.
 * @return _volume O volume de negociação do título.
 * @return _melhorOfertaCompra A melhor oferta de compra para o título.
 * @return _melhorOfertaVenda A melhor oferta de venda para o título.
 */
function obterOfertas(string calldata _isin) public view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256) {}
```

`assinarServico`

```javascript

/**
 * @notice Permite que um usuário assine o serviço, pagando a taxa de assinatura.
 * @dev Reverte se o valor enviado for menor que a taxa de assinatura.
 */
function assinarServico(address _endereco) public payable {}
```

`atualizaTitulos`

```javascript

/**
 * @notice Atualiza os títulos com informações recebidas de uma corretora.
 * @dev Requer que o pacote de títulos tenha menos de 60 minutos de idade.
 * @param _codigoCorretora O código da corretora que envia as atualizações.
 * @param _dataDeGeracao A data de geração do pacote de títulos.
 * @param _pacoteDeTitulos Um array de estruturas PacoteTitulo contendo as informações do título.
 */
function atualizaTitulos(uint16 _codigoCorretora, uint256 _dataDeGeracao, PacoteTitulo[] calldata _pacoteDeTitulos) public somenteCorretor (_codigoCorretora) {}
```

## Eventos

Eventos em contratos inteligentes são mecanismos usados para emitir informações que podem ser capturadas fora da blockchain. Eles são especialmente úteis para notificar usuários ou outros contratos sobre ocorrências específicas dentro do contrato. 

`AtualizacaoDeTitulo`

```javascript

// Evento emitido quando um título é atualizado.
event AtualizacaoDeTitulo(uint16 corretora, PacoteTitulo titulo);
```

`NovoAssinante`

```javascript

// Evento emitido quando um novo assinante é adicionado.
event NovoAssinante(address endereco, uint256 valor);
```

`AudtiorReprovacao`

```javascript

// Evento emitido quando uma auditoria reprova um valor.
event AudtiorReprovacao(uint16 corretora, uint16 titulo, uint256 valor);
```

`AvisoCorretora`

```javascript

// Evento emitido para avisar sobre movimentos sobre as corretoras: aplicação de multa, removida, adicionada
event AvisoCorretora(string aviso, uint16 corretora);
```
