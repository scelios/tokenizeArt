# NFT Project Deployment and Minting Guide

This document provides a detailed walkthrough for deploying the `FortyTwoNFT` smart contract and minting your NFT using Remix IDE.

## Prerequisites

*   **MetaMask:** Ensure you have MetaMask installed in your browser and it's connected to a **test network** (e.g., Sepolia, Goerli, BSC Testnet). You will need some testnet ETH or BNB for gas fees.
*   **Remix IDE:** Access the Remix Ethereum IDE at [https://remix.ethereum.org/](https://remix.ethereum.org/).
*   **NFT Image CID:** You should have already uploaded your NFT image to IPFS and have its CID (e.g., `bafybeiaj6rkeyuczfnpdxlnoddqyepzbif52i4ky33u3qrluzqn2mkma7a`).
*   **NFT Metadata CID:** You should have already created your `nft-metadata.json` file, uploaded it to IPFS, and have its CID (e.g., `bafkreigf5yqnrzee4mwx2vum3sjsnn2rxcnejxlgmeheuhmngtevwztreq`).

## Deployment Steps

1.  **Open Remix and Load Contract:**
    *   Go to [Remix IDE](https://remix.ethereum.org/).
    *   In the File Explorer (left sidebar), create a new file named `FortyTwoNFT.sol`.
    *   Paste the corrected Solidity code for `FortyTwoNFT.sol` into this new file. The code is available in the `code/FortyTwoNFT.sol` file in your local project directory.


2.  **Compile the Contract:**
    *   Go to the "Solidity Compiler" tab (looks like a compiler icon) in the left sidebar.
    *   Select `0.8.20` as the compiler version.
    *   Click "Compile FortyTwoNFT.sol". Ensure there are no compilation errors.

3.  **Deploy the Contract:**
    *   Switch to the "Deploy & Run Transactions" tab (looks like an Ethereum logo).
    *   **Environment:** From the dropdown, select `Injected Provider - Metamask`. Confirm that MetaMask is connected to your desired test network.
    *   **Contract:** In the "Contract" dropdown, select `FortyTwoNFT`.
    *   Click the **"Deploy"** button.
    *   A MetaMask pop-up will appear asking you to confirm the transaction. Confirm it.
    *   Once the transaction is confirmed on the blockchain, your contract will appear under "Deployed Contracts" in Remix. Note down the contract address.

## Minting Your NFT

1.  **Access Deployed Contract:** Expand your deployed `FortyTwoNFT` contract in the "Deployed Contracts" section in Remix.
2.  **Call `safeMint` Function:**
    *   Locate the `safeMint` function.
    *   You will see input fields for `to` and `uri`.
    *   **`to`:** Enter the wallet address where you want the NFT to be sent (this will usually be your own MetaMask address).
    *   **`uri`:** Enter the IPFS URI for your NFT's metadata: `ipfs://bafkreigf5yqnrzee4mwx2vum3sjsnn2rxcnejxlgmeheuhmngtevwztreq`
    *   Click the **"transact"** button next to `safeMint`.
    *   Confirm the transaction in MetaMask.

## Verifying Ownership

1.  **Use `ownerOf` Function:** In your deployed contract interface in Remix, find the `ownerOf` function.
2.  **Enter Token ID:** For the first NFT you minted, the `tokenId` will be `0`. Enter `0` into the input field for `ownerOf`.
3.  **Call Function:** Click the **"call"** button. The output should be the wallet address you provided in the `safeMint` function.

## Minting Multiple NFTs

You can mint additional NFTs by simply calling the `safeMint` function again. Each call will mint a new token with an incremented ID (1, 2, 3, and so on).

*   If you want to mint another NFT with the same image and metadata, use the same metadata URI.
*   If you want to mint a unique NFT, you'll need to create a new image and metadata JSON file, upload them to IPFS to get a new unique URI, and then use that new URI when calling `safeMint`.
