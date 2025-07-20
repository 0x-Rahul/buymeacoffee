# Buy Me a Coffee 

A decentralized application (dApp) that allows users to support creators by "buying a coffee" (sending ETH) using a simple smart contract. Built with TypeScript, JavaScript, and the [viem](https://viem.sh/) library for Ethereum interactions.

## Features

- **Connect Wallet:** Users can connect their MetaMask wallet.
- **Buy Coffee:** Send ETH to the contract as a tip ("buy a coffee").
- **Get Balance:** View the current ETH balance of the contract.
- **Withdraw:** Contract owner can withdraw accumulated funds.
- **TypeScript & JavaScript Support:** Both TS and JS versions of the main logic are provided.

## Smart Contract

- **Contract Name:** `FundMe`
- **Address:** `0x75CC7714C6CA74E0F04dbF0bDb42D1b9b5ad51EC`
- **ABI:** See [`constant-ts.ts`](./constant-ts.ts) or [`constant-js.js`](./constant-js.js) for full ABI.

## Project Structure

```
.
├── constant-js.js      # Contract ABI/address (JS)
├── constant-ts.ts      # Contract ABI/address (TS)
├── index.html          # Main HTML UI
├── index-js.js         # Main logic (JavaScript)
├── index-ts.ts         # Main logic (TypeScript)
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── fundme-anvil.json   # (Optional) Local chain state/config
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended) — only needed for TypeScript compilation or dependency management
- [MetaMask](https://metamask.io/) browser extension

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd buymeacoffee
   ```

2. **Install dependencies (optional, for TypeScript):**
   ```bash
   npm install
   ```

### Running the App

#### TypeScript Development

1. **Compile TypeScript (if you want to use the TS version):**
   ```bash
   npx tsc
   ```
   This will generate JavaScript files from the TypeScript source.

#### Running the App

- **Open `index.html` directly in your browser** 

### Usage

1. Open the app in your browser.
2. Click **Connect Wallet** to connect MetaMask.
3. Enter an ETH amount and click **Buy Coffee** to send ETH to the contract.
4. Click **Get Balance** to view the contract's ETH balance.
5. If you are the contract owner, click **Withdraw** to withdraw funds.

## Development

- Main logic is in `index-ts.ts` (TypeScript) and `index-js.js` (JavaScript).
- Contract details are in `constant-ts.ts` and `constant-js.js`.
- Uses [viem](https://viem.sh/) for Ethereum wallet and contract interactions.

### Scripts

- `npx tsc` — Compile TypeScript files.

## Customization

- To use a different contract, update the address and ABI in `constant-ts.ts` and `constant-js.js`.
- UI can be modified in `index.html`.

## License

MIT

---

**Note:** This dApp is for educational/demo purposes. Use on testnets or with caution on mainnet. 
