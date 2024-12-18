import { ethers } from "hardhat";

async function main() {
  const KuverseNFT = await ethers.getContractFactory("KuverseNFT");
  const nft = await KuverseNFT.deploy();
  await nft.waitForDeployment();

  console.log("KuverseNFT deployed to:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
