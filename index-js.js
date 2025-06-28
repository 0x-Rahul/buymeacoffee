import { createWalletClient, custom, createPublicClient, parseEther } from 'https://esm.sh/viem';
import { contractAddress, contractAbi } from './constant-js.js';

const connectWallet = document.getElementById("connect-wallet");
const buyCoffeeButton = document.getElementById("buy-coffee");
const ethamount = document.getElementById("eth-amount");
const getbalance = document.getElementById("balance-button");
const withdrawButton = document.getElementById("withdraw");
// Track connection state
let isWalletConnected = false;
let walletAddress = "";
let walletClient;
let publiClient;
let currentChain;

// Connect Wallet Function
connectWallet.onclick = async () => {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });

        const address = await walletClient.request({
            method: 'eth_requestAccounts'
        });

        console.log("Wallet connected successfully. Address: " + address[0]);
        connectWallet.innerText = "Connected";
        isWalletConnected = true;
        walletAddress = address[0];

        currentChain = await getChainId(walletClient);
    } else {
        alert("Please install MetaMask");
    }
};

// Buy Coffee Function
buyCoffeeButton.onclick = async () => {
    if (!isWalletConnected) {
        alert("Please connect your wallet first");
        return;
    }

    const amount = ethamount.value;
    if (!amount || isNaN(amount)) {
        alert("Please enter a valid ETH amount");
        return;
    }

    publiClient = createPublicClient({
        transport: custom(window.ethereum)
    });


    try {
        const { request } = await publiClient.simulateContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'fund',
            account: walletAddress,
            chain: currentChain,
            value: parseEther(amount), // Convert entered ETH string to wei
        });

        const hash = await walletClient.writeContract(request);
        console.log("Transaction hash: " + hash);

        alert("Coffee bought by: " + walletAddress);
        console.log(`${walletAddress} has bought coffee for ${amount} ETH`);
    } catch (err) {
        console.error("Transaction failed:", err);
        alert("Transaction failed: " + err.message);
    }
};

// Get chain info
async function getChainId(client) {
    const chainId = await client.getChainId();
    console.log("Chain ID: " + chainId);

    // Optional: return a chain object 
    return {
        id: chainId,
        name: "Custom",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: {
            default: {
                http: ["https://localhost:8545"], // customize if needed
            }
        }
    };
}

// Get balance function
getbalance.onclick = async () => {
    if (!isWalletConnected) {
        alert("Please connect your wallet first");
        return;
    }
    else {

        try {
            publiClient = createPublicClient({
                transport: custom(window.ethereum)
            });

            // Fetch balance using the wallet client
            const balance = await publiClient.getBalance({
                address: contractAddress // Use contract address to get balance
            });
            const balanceInEth = parseFloat(balance) / 1e18; // Convert wei to ETH
            console.log(`Balance of ${walletAddress}: ${balanceInEth} wei`);
            alert(`Balance of ${walletAddress}: ${balanceInEth} ETH`);
        } catch (err) {
            console.error("Failed to fetch balance:", err);
            alert("Failed to fetch balance: " + err.message);
        }
    }
};
// Withdraw function
withdrawButton.onclick = async () => {
    if (!walletAddress) {
        alert("Please connect your wallet.");
        return;
    }

    const walletClient = createWalletClient({
        account: walletAddress,
        chain: currentChain,
        transport: custom(window.ethereum)
    });

    const publicClient = createPublicClient({
        chain: currentChain,
        transport: custom(window.ethereum)
    });

    try {
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'withdraw',
            account: walletAddress,
            // value: parseEther("0.01") // only if needed
        });

        const hash = await walletClient.writeContract(request);

        console.log("Withdrawal transaction hash: " + hash);
        alert("Withdrawal successful. Transaction hash: " + hash);
    } catch (err) {
        console.error("Withdrawal failed:", err);
        alert("Withdrawal failed: " + (err.message || "Unknown error"));
    }
};
