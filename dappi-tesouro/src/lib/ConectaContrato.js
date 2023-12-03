import { ethers } from 'ethers';
import ABI from './abi.json';

// Beta Mumbai
// https://mumbai.polygonscan.com/address/0xe07809C2B427e67FFc823E9FC2c139ABCCC3Cb71
//const CONTRACT_ADDRESS="0xe07809C2B427e67FFc823E9FC2c139ABCCC3Cb71";


// dev local
const CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function ConectaContrato() {
  if (!window.ethereum) {
    console.log("Carteira não disponível.");
    return null;
  } else {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();    
    const contrato= new ethers.Contract(CONTRACT_ADDRESS,ABI, signer, provider);
    const contas = await provider.send("eth_requestAccounts",[]);
    console.log('Conectado ao contrato:' + CONTRACT_ADDRESS)
    return contrato;
  }
}

export async function verificarSaldoContrato(){
  const contrato= await ConectaContrato();
  const balance= await contrato.balanceOf(CONTRACT_ADDRESS);
  return balance;
}