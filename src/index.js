"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectChain = exports.Web3 = exports.Web3Ethers = void 0;
var web3_1 = require("./web3");
exports.Web3 = web3_1.default;
var web3Ethers_1 = require("./web3Ethers");
exports.Web3Ethers = web3Ethers_1.default;
var web3Near_1 = require("./web3Near");
/**
 *
 * @param chainId
 * @param rpcUrls
 */
function connectChain(vm, params) {
    switch (vm) {
        case "tron":
            break;
        case "near":
            return new web3Near_1.default(params);
            break;
        case "solana":
            break;
        default:
            return new web3Ethers_1.default(params);
            break;
    }
}
exports.connectChain = connectChain;
