import { useState, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import type { WalletState } from '../types';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: '',
    isConnected: false,
    chainId: null
  });

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      setWalletState({
        address,
        isConnected: true,
        chainId: Number(network.chainId)
      });

      return { provider, signer };
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }, []);

  return { walletState, connectWallet };
};