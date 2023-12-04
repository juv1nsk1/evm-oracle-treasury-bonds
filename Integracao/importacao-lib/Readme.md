# TSR Oráculo do Tesouro Nacional

## Biblioteca de Integração para Conectar Corretoras ao Oracle de Dados

Bem-vindo ao repositório do Oráculo do Tesouro Nacional, uma biblioteca de integração desenvolvida para simplificar e agilizar a conexão entre sistemas de corretoras e o Oracle de Dados. Esta biblioteca é escrita em TypeScript e foi projetada para oferecer uma interface fácil de usar, permitindo uma comunicação direta e eficiente entre corretoras e o Oracle.

## Visão Geral

Este projeto fornece uma biblioteca que abstrai a complexidade do processo de comunicação, permitindo que corretoras estabeleçam uma conexão direta com o Oracle de Dados. Além disso, oferece uma interface simplificada para facilitar a implementação e reduzir o tempo de desenvolvimento.

## Recursos Principais

- **Conexão Direta:** Possibilita que as corretoras estabeleçam uma conexão direta com o Oracle de Dados.
  
- **Facilidade de Uso:** Interface simplificada para uma implementação mais fácil e rápida.

- **Documentação Detalhada:** Incluímos uma documentação abrangente explicando como utilizar a biblioteca, exemplos de código e casos de uso comuns.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Ethers](https://docs.ethers.io/v5/getting-started/)

## Como Usar

1. Clone este repositório: `git clone https://github.com/juv1nsk1/araucaria.git`
2. Siga as instruções detalhadas na documentação para integrar a biblioteca ao seu projeto.
3. Implemente as chamadas necessárias para conectar sua corretora ao Oracle de Dados.

## Exemplos

```typescript
// Exemplo de código mostrando como usar a biblioteca para estabelecer uma conexão
// e realizar operações básicas com o Oracle de Dados.

import { EnviarTitulos } from 'importacao-lib';

// Configuração
const CHAVE_CORRETORA = "..";
const ENDERECO_CONTRATO = "...";

// Array com os títulos a serem enviados para o Oráculo
const PACOTE_TITULOS = [
  // ... Adicione os títulos conforme necessário
];

// Exemplo de uso
const resultado = EnviarTitulos(ENDERECO_CONTRATO, CHAVE_CORRETORA, PACOTE_TITULOS);

console.log(resultado);
