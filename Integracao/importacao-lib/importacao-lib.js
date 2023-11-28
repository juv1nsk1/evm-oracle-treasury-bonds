import { ethers } from 'ethers';
import ABI from './abi.json';

/**
 * @notice Conecta ao contrato Ethereum usando a biblioteca ethers.
 * @dev Certifique-se de fornecer um provedor válido ao chamar esta função.
 * @param {string} ENDERECO_CONTRATO - O endereço Ethereum do contrato.
 * @returns {Promise<ethers.Contract>} Uma instância do contrato conectado.
 */
async function ConectaContrato(ENDERECO_CONTRATO) {
    const provider = new ethers.providers.JsonRpcProvider("..."); // Substitua "..." pelo seu provedor
    const signer = provider.getSigner();    
    const contrato = new ethers.Contract(ENDERECO_CONTRATO, ABI, signer);
        
    return contrato;
}

/**
 * @notice Envia títulos para o contrato Ethereum.
 * @dev Certifique-se de que PACOTE_TITULOS seja uma matriz válida.
 * @param {string} ENDERECO_CONTRATO - O endereço Ethereum do contrato.
 * @param {string} CODIGO_CORRETORA - O código da corretora associada aos títulos.
 * @param {Array} PACOTE_TITULOS - Uma matriz contendo os dados dos títulos a serem enviados.
 */
export async function EnviarTitulos(ENDERECO_CONTRATO, CODIGO_CORRETORA, PACOTE_TITULOS) {
    if (PACOTE_TITULOS) {
        // Ignora o cabeçalho da matriz PACOTE_TITULOS
        const dadosFormatados = PACOTE_TITULOS.slice(1).map((linha) => {
            // Transforma os valores em números inteiros
            linha.valorMedio = Math.round(linha.valorMedio * 100);
            linha.valorUltimaTransacao = Math.round(linha.valorUltimaTransacao * 100);
            linha.melhorOfertaCompra = Math.round(linha.melhorOfertaCompra * 100);
            linha.melhorOfertaVenda = Math.round(linha.melhorOfertaVenda * 100);
            return linha;
        });

        if (dadosFormatados.length) {
            await EnviarDados(ENDERECO_CONTRATO, CODIGO_CORRETORA, dadosFormatados);
        }
    }
}

/**
 * @notice Envia dados formatados para o contrato Ethereum.
 * @dev Certifique-se de que ConectaContrato retorna uma instância válida do contrato.
 * @param {string} ENDERECO_CONTRATO - O endereço Ethereum do contrato.
 * @param {string} CODIGO_CORRETORA - O código da corretora associada aos dados.
 * @param {Array} dadosFormatados - Uma matriz contendo os dados formatados a serem enviados.
 */
async function EnviarDados(ENDERECO_CONTRATO, CODIGO_CORRETORA, dadosFormatados) {
    const contrato = await ConectaContrato(ENDERECO_CONTRATO);
    const dataAtual = Math.floor(Date.now() / 1000);

    try {       
        // Atualiza os títulos no contrato Ethereum
        const data = await contrato.atualizaTitulos(CODIGO_CORRETORA, dataAtual, dadosFormatados, { gasLimit: 30000000 });
        // Faça algo com 'data' se necessário
    } catch (err) {
        console.log('ERRO:', err);
    }
}
