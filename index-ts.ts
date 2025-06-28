import {
  createWalletClient,
  createPublicClient,
  custom,
  parseEther,
  type WalletClient,
  type PublicClient,
  type Chain
} from 'viem';
import 'viem/window';
import { contractAddress, contractAbi } from './constant-ts';

// HTML elements
const connectWallet = document.getElementById("connect-wallet") as HTMLButtonElement;
const buyCoffeeButton = document.getElementById("buy-coffee") as HTMLButtonElement;
const ethamount = document.getElementById("eth-amount") as HTMLInputElement;
const getbalance = document.getElementById("balance-button") as HTMLButtonElement;
const withdrawButton = document.getElementById("withdraw") as HTMLButtonElement;

// State
let isWalletConnected = false;
let walletAddress: `0x${string}` | "" = "";
let walletClient: WalletClient | undefined;
let publiClient: PublicClient | undefined;
let currentChain: Chain | undefined;

// Get Chain
async function getChainId(client: WalletClient): Promise<Chain> {
  const chainId = await client.getChainId();
  console.log("Chain ID: " + chainId);
  return {
    id: chainId,
    name: "Custom",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: ["http://localhost:8545"] } }
  };
}

// Connect Wallet
connectWallet.onclick = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }

  walletClient = createWalletClient({
    transport: custom(window.ethereum!)
  });

  const address = await walletClient.request({
    method: 'eth_requestAccounts'
  });

  walletAddress = address[0] as `0x${string}`;
  console.log("Wallet connected: " + walletAddress);
  connectWallet.innerText = "Connected";
  isWalletConnected = true;
  currentChain = await getChainId(walletClient);
};

// Buy Coffee
buyCoffeeButton.onclick = async () => {
  if (!isWalletConnected || !walletAddress || !currentChain) {
    alert("Connect your wallet first");
    return;
  }

  const amount = ethamount.value;
  if (!amount || isNaN(Number(amount))) {
    alert("Invalid ETH amount");
    return;
  }

  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }
  publiClient = createPublicClient({
    transport: custom(window.ethereum!)
  });

  try {
    const { request } = await publiClient.simulateContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'fund',
      account: walletAddress,
      chain: currentChain,
      value: parseEther(amount)
    });

    const hash = await walletClient!.writeContract(request);
    console.log("TX hash: " + hash);
    alert(`Coffee bought by ${walletAddress}`);
  } catch (err: any) {
    console.error("Transaction error:", err);
    alert("Error: " + err.message);
  }
};

// Get Balance
getbalance.onclick = async () => {
  if (!isWalletConnected) {
    alert("Connect wallet first");
    return;
  }

  publiClient = createPublicClient({
    transport: custom(window.ethereum!)
  });

  try {
    const balance = await publiClient.getBalance({ address: contractAddress });
    const balanceEth = Number(balance) / 1e18;
    alert(`Contract balance: ${balanceEth} ETH`);
  } catch (err: any) {
    console.error("Balance error:", err);
    alert("Error: " + err.message);
  }
};

// Withdraw// ...existing code...

// Fix typo in state
let publicClient: PublicClient | undefined; // was publiClient

// Withdraw
withdrawButton.onclick = async () => {
  if (!walletAddress || !currentChain) {
    alert("Connect your wallet first");
    return;
  }

  if (typeof window.ethereum === "undefined" || !window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  // Use the outer walletClient and publicClient variables
  walletClient = createWalletClient({
    account: walletAddress,
    chain: currentChain,
    transport: custom(window.ethereum)
  });

  publicClient = createPublicClient({
    chain: currentChain,
    transport: custom(window.ethereum)
  });

  try {
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'withdraw',
      account: walletAddress
    });

    const hash = await walletClient.writeContract(request);
    console.log("Withdraw TX:", hash);
    alert("Withdraw success! TX hash: " + hash);
  } catch (err: any) {
    console.error("Withdraw error:", err);
    alert("Withdraw failed: " + err.message);
  }
};
// ...existing code...