import { ethers } from 'ethers';
import type { NFTMetadata } from '../types';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../constants/contract';

export class NFTService {
  private contract: ethers.Contract;

  constructor(signer: ethers.Signer) {
    this.contract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
    );
  }

  async mintNFT(metadata: NFTMetadata) {
    try {
      const tx = await this.contract.mint(metadata.tokenURI);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Minting error:', error);
      throw error;
    }
  }

  async getUserNFTs(address: string) {
    try {
      const balance = await this.contract.balanceOf(address);
      const nfts = [];
      
      for (let i = 0; i < balance; i++) {
        const tokenId = await this.contract.tokenOfOwnerByIndex(address, i);
        const tokenURI = await this.contract.tokenURI(tokenId);
        nfts.push({ tokenId, tokenURI });
      }
      
      return nfts;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      throw error;
    }
  }
}
