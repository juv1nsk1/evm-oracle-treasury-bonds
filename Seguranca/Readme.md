# Segurança do Contrato
A segurança é uma prioridade fundamental em nosso contrato, e implementamos diversas medidas para garantir uma operação robusta e protegida. Destacamos algumas das principais práticas e bibliotecas que utilizamos para fortalecer a segurança do nosso contrato:

## OpenZeppelin: Uma Base Segura
Para construir a base do nosso contrato, contamos com a confiável biblioteca OpenZeppelin, que é amplamente reconhecida e auditada pela comunidade de desenvolvimento blockchain. A OpenZeppelin fornece implementações padrão de contratos inteligentes e padrões de segurança, o que contribui significativamente para a integridade e segurança do nosso código.

### Controle de Propriedade com Ownable
Para garantir a integridade e a governança do contrato, implementamos a biblioteca Ownable da OpenZeppelin. Essa biblioteca permite um controle seguro da propriedade do contrato, restringindo o acesso a funções críticas apenas ao proprietário designado. Isso adiciona uma camada adicional de segurança, garantindo que apenas entidades autorizadas possam realizar modificações significativas.

### Proteção contra Ataques de Reentrada com ReentrancyGuard
Um dos riscos comuns em contratos inteligentes é o ataque de reentrada, onde um invasor tenta executar múltiplas chamadas à mesma função antes que a execução anterior seja concluída. Para mitigar esse risco, implementamos a biblioteca ReentrancyGuard da OpenZeppelin. Essa biblioteca adiciona proteções críticas às funções de pagamento, impedindo ataques de reentrada e assegurando a integridade das transações.

Auditoria com Mythril
Realizamos uma auditoria abrangente do nosso contrato utilizando a ferramenta Mythril, uma ferramenta de análise de segurança para bytecode da EVM. Essa ferramenta detecta vulnerabilidades de segurança em contratos inteligentes construídos para Ethereum, Hedera, Quorum, Vechain, Roostock, Tron e outras blockchains compatíveis com a EVM. Utiliza técnicas como execução simbólica, solução de SMT e análise de contaminação para detectar uma variedade de vulnerabilidades de segurança.

## Relatório da Auditoria com Mythril:

``` shell
==== Dependence on predictable environment variable ====
SWC ID: 116
Severity: Low
Contract: TesouroOracle
Function name: obterOfertas(string)
PC address: 1177
Estimated Gas Usage: 2348 - 2823
A control flow decision is made based on The block.timestamp environment variable.
The block.timestamp environment variable is used to determine a control flow decision. Note that the values of variables like coinbase, gaslimit, block number and timestamp are predictable and can be manipulated by a malicious miner. Also keep in mind that attackers know hashes of earlier blocks. Don't use any of those environment variables as sources of randomness and be aware that use of these variables introduces a certain level of trust into miners.
--------------------
In file: contracts/TesouroOracle.sol:43

require(verificarAssinante(), "Acesso negado. Assine esta funcao atraves de assinarServico().")
```

O relatório destaca um falso positivo relacionado à decisão de fluxo de controle baseada na variável de ambiente block.timestamp. Esse cenário é considerado de baixa gravidade, indicando uma possibilidade teórica de manipulação por um minerador mal-intencionado. No entanto, observamos que essa situação é improvável e não compromete a segurança geral do contrato.


Estamos comprometidos em manter os mais altos padrões de segurança e continuaremos a monitorar e implementar as melhores práticas à medida que a tecnologia evolui. A transparência e a segurança são valores centrais para nós, e incentivamos todos os usuários e desenvolvedores a contribuírem para o aprimoramento contínuo da segurança do nosso contrato.