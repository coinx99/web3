/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
const { log, warn, error } = console

import CHAINS from "./CHAINS.json";
import Web3Ethers from "./Web3Ethers";

/**
 * Mạng này mainnet hay testnet
 */
export type Net = "TEST" | "MAIN"

export interface Wallet {
    address: string,
    privateKey: string,
}

interface CHAIN {
    chainId: string, // hex of id
    chainName: string,
    nativeCurrency: {
        name: string, decimals: Number, symbol: string
    },
    rpcUrls: [string],
    blockExplorerUrls: [string],
    iconUrls: [string], // url to icon
    dev: Net
}

/**
 * Mẫu giao diện Web3 với các hàm mà các kế thừa khác phải có
 */
abstract class Web3 {

    constructor(rpc: string) { }

    static isAddress(address = "") { }

    getBalance() { }

    send(walletFrom: Wallet, walletTo: Wallet, amount: BigInt) { }
}

/**
 * 
 * @param chainId 
 * @param rpcUrls 
 */
export function connectChain(chainId = "0x1", rpcUrls?: string | string[]) {
    if (!rpcUrls) {
        let chain = CHAINS.find((v, i) => v.chainId === chainId)
        if (chain) {
            rpcUrls = chain.blockExplorerUrls[0];
        }
    }

    switch (chainId) {
        case "tron":

            break;

        default:
            return new Web3Ethers(rpcUrls)
    }
}

export default Web3;
