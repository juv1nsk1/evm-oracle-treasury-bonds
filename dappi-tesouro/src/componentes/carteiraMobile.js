import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { injected } from './connectors';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function CarteiraMobile() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MyComponent />
    </Web3ReactProvider>
  );
}

function MyComponent() {
  const { activate, active, account, library } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Erro ao conectar à carteira:', error);
    }
  };

  useEffect(() => {
    // Se você deseja realizar ações quando o estado da conexão muda, você pode fazer isso aqui.
    if (active) {
      console.log('Conectado com sucesso! Conta:', account);
    }
  }, [active, account]);

  return (
    <div>
      <h1>Conectar ao MetaMask no Navegador Móvel</h1>
      {active ? (
        <div>
          <p>Conectado com sucesso! Conta: {account}</p>
          {/* Coloque aqui o resto do seu aplicativo */}
        </div>
      ) : (
        <button onClick={connectWallet}>Conectar ao MetaMask</button>
      )}
    </div>
  );
}

export default CarteiraMobile;