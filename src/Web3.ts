/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
import Web3Ethers from "./Web3Ethers";
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

export type CHAINS = Record<symbol | string, CHAIN>;

/**
 * Mẫu giao diện Web3 với các hàm mà các kế thừa khác phải có
 */
class Web3 {

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
export function connectChain(chainId: string | symbol = "1", rpcUrls?: string | string[]) {
    if (!rpcUrls) {
        let chain = CHAINS[chainId] //.find((v, i) => v.chainId === chainId)
        if (chain) {
            rpcUrls = chain.blockExplorerUrls[0];
        }
    }

    switch (chainId) {
        case "tron":

            break;

        default:
            // return new Web3Ethers(rpcUrls)
            break;
    }
}

export default Web3;
