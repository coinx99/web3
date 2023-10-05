/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
import { EventEmitter } from "events";
import Web3Ethers from "./Web3Ethers";
import Web3Near from "./Web3Near";
const { log, warn, error } = console

/**
 * Mạng này mainnet hay testnet
 */
export type Net = "TEST" | "MAIN"

export interface Wallet {
    address: string,
    privateKey: string,
}

export interface CHAIN {
    chainId: string, // hex of id
    chainName: string,
    nativeCurrency: {
        name: string, decimals: Number, symbol: string
    },
    icon: string | string[], // url to icon
    rpcUrls: string[],
    blockExplorerUrls: string[],
    dev?: Net
}

export type CHAINS = Record<string, CHAIN>;

/**
 * Mẫu giao diện Web3 với các hàm mà các kế thừa khác phải có
 */
class Web3 {
    /**
     * all events of class
     * ("connected", provider)
     */
    events: EventEmitter
    provider: any

    chainId:string
    name: string
    decimals: BigInt
    symbol: string
    net?: Net

    constructor(rpc: string) { }

    static isAddress: (address: string) => {}

    getBalance(address: string) { }

    send(walletFrom: Wallet, walletTo: Wallet, amount: BigInt) { }
}

/**
 * 
 * @param chainId 
 * @param rpcUrls 
 */
export function connectChain(vm: "ethers" | "tron" | "near" | "solana", params?: CHAIN | string) {
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

export default Web3;
