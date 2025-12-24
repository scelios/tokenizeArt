document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const mintButton = document.getElementById('mintButton');
    const statusMessage = document.getElementById('statusMessage');

    const contractAddress = '0xd56cD3C28F5964BF8dDE817B2b01AbEC9ac65c01';
    // Minimal ABI for the safeMint function
    const contractABI = [
        "function safeMint(address to, string memory uri)"
    ];
    const metadataURI = 'ipfs://bafkreigf5yqnrzee4mwx2vum3sjsnn2rxcnejxlgmeheuhmngtevwztreq';

    let provider;
    let signer;
    let userAddress;

    connectButton.addEventListener('click', connectWallet);
    mintButton.addEventListener('click', mintNft);

    async function connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            statusMessage.textContent = 'MetaMask is not installed. Please install it to use this app.';
            return;
        }

        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();

            connectButton.style.display = 'none';
            mintButton.style.display = 'block';
            statusMessage.textContent = `Connected: ${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`;
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            statusMessage.textContent = 'Failed to connect wallet. Please try again.';
        }
    }

    async function mintNft() {
        if (!signer) {
            statusMessage.textContent = 'Please connect your wallet first.';
            return;
        }

        mintButton.disabled = true;
        statusMessage.textContent = 'Preparing to mint... Please confirm in MetaMask.';

        try {
            const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

            statusMessage.textContent = 'Minting in progress... Please wait for the transaction to complete.';
            
            const tx = await nftContract.safeMint(userAddress, metadataURI);
            await tx.wait();

            statusMessage.textContent = `Success! NFT minted. Transaction hash: ${tx.hash.substring(0, 10)}...`;
            mintButton.disabled = false; // Allow minting another one
        } catch (error) {
            console.error('Minting failed:', error);
            statusMessage.textContent = 'Minting failed. Please check the console and try again.';
            mintButton.disabled = false;
        }
    }
});
