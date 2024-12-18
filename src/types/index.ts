export interface NFTMetadata {
  title: string;
  tokenURI: string;
}

export interface WalletState {
  address: string;
  isConnected: boolean;
  chainId: number | null;
}
