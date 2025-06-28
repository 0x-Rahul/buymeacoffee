"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var viem_1 = require("viem");
require("viem/window");
var constant_ts_1 = require("./constant-ts");
// HTML elements
var connectWallet = document.getElementById("connect-wallet");
var buyCoffeeButton = document.getElementById("buy-coffee");
var ethamount = document.getElementById("eth-amount");
var getbalance = document.getElementById("balance-button");
var withdrawButton = document.getElementById("withdraw");
// State
var isWalletConnected = false;
var walletAddress = "";
var walletClient;
var publiClient;
var currentChain;
// Get Chain
function getChainId(client) {
    return __awaiter(this, void 0, void 0, function () {
        var chainId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getChainId()];
                case 1:
                    chainId = _a.sent();
                    console.log("Chain ID: " + chainId);
                    return [2 /*return*/, {
                            id: chainId,
                            name: "Custom",
                            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                            rpcUrls: { default: { http: ["http://localhost:8545"] } }
                        }];
            }
        });
    });
}
// Connect Wallet
connectWallet.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
    var address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof window.ethereum === "undefined") {
                    alert("Please install MetaMask");
                    return [2 /*return*/];
                }
                walletClient = (0, viem_1.createWalletClient)({
                    transport: (0, viem_1.custom)(window.ethereum)
                });
                return [4 /*yield*/, walletClient.request({
                        method: 'eth_requestAccounts'
                    })];
            case 1:
                address = _a.sent();
                walletAddress = address[0];
                console.log("Wallet connected: " + walletAddress);
                connectWallet.innerText = "Connected";
                isWalletConnected = true;
                return [4 /*yield*/, getChainId(walletClient)];
            case 2:
                currentChain = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Buy Coffee
buyCoffeeButton.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
    var amount, request, hash, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isWalletConnected || !walletAddress || !currentChain) {
                    alert("Connect your wallet first");
                    return [2 /*return*/];
                }
                amount = ethamount.value;
                if (!amount || isNaN(Number(amount))) {
                    alert("Invalid ETH amount");
                    return [2 /*return*/];
                }
                if (typeof window.ethereum === "undefined") {
                    alert("Please install MetaMask");
                    return [2 /*return*/];
                }
                if (!window.ethereum) {
                    alert("Please install MetaMask");
                    return [2 /*return*/];
                }
                publiClient = (0, viem_1.createPublicClient)({
                    transport: (0, viem_1.custom)(window.ethereum)
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, publiClient.simulateContract({
                        address: constant_ts_1.contractAddress,
                        abi: constant_ts_1.contractAbi,
                        functionName: 'fund',
                        account: walletAddress,
                        chain: currentChain,
                        value: (0, viem_1.parseEther)(amount)
                    })];
            case 2:
                request = (_a.sent()).request;
                return [4 /*yield*/, walletClient.writeContract(request)];
            case 3:
                hash = _a.sent();
                console.log("TX hash: " + hash);
                alert("Coffee bought by ".concat(walletAddress));
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error("Transaction error:", err_1);
                alert("Error: " + err_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Get Balance
getbalance.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
    var balance, balanceEth, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isWalletConnected) {
                    alert("Connect wallet first");
                    return [2 /*return*/];
                }
                publiClient = (0, viem_1.createPublicClient)({
                    transport: (0, viem_1.custom)(window.ethereum)
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, publiClient.getBalance({ address: constant_ts_1.contractAddress })];
            case 2:
                balance = _a.sent();
                balanceEth = Number(balance) / 1e18;
                alert("Contract balance: ".concat(balanceEth, " ETH"));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error("Balance error:", err_2);
                alert("Error: " + err_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Withdraw// ...existing code...
// Fix typo in state
var publicClient; // was publiClient
// Withdraw
withdrawButton.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
    var request, hash, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!walletAddress || !currentChain) {
                    alert("Connect your wallet first");
                    return [2 /*return*/];
                }
                if (typeof window.ethereum === "undefined" || !window.ethereum) {
                    alert("Please install MetaMask");
                    return [2 /*return*/];
                }
                // Use the outer walletClient and publicClient variables
                walletClient = (0, viem_1.createWalletClient)({
                    account: walletAddress,
                    chain: currentChain,
                    transport: (0, viem_1.custom)(window.ethereum)
                });
                publicClient = (0, viem_1.createPublicClient)({
                    chain: currentChain,
                    transport: (0, viem_1.custom)(window.ethereum)
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, publicClient.simulateContract({
                        address: constant_ts_1.contractAddress,
                        abi: constant_ts_1.contractAbi,
                        functionName: 'withdraw',
                        account: walletAddress
                    })];
            case 2:
                request = (_a.sent()).request;
                return [4 /*yield*/, walletClient.writeContract(request)];
            case 3:
                hash = _a.sent();
                console.log("Withdraw TX:", hash);
                alert("Withdraw success! TX hash: " + hash);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.error("Withdraw error:", err_3);
                alert("Withdraw failed: " + err_3.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// ...existing code...
