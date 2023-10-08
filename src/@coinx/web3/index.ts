import Web3, { ICHAIN, VM, Wallet } from "./web3";
import Web3Ethers, { WalletEthers } from "./web3Ethers"
import Web3Near from "./web3Near";

export { Web3Ethers, Web3, Wallet };
/**
 * 
 * @param chainId 
 * @param rpcUrls 
 */
export function connectChain(vm: VM, params: ICHAIN | string) {
    switch (vm) {
        case "tron":

            break;

        case "near":
            return new Web3Near(params)
            break;

        case "solana":

            break;

        default:
            return new Web3Ethers(params)
            break;
    }
}

export function connectWallet(vm: VM, privateKey: string): Wallet {
    switch (vm) {
        case "ethers":
            return new WalletEthers(privateKey);

        default:
            return new WalletEthers(privateKey);
    }
}