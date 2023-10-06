/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
import { EventEmitter, } from "events";

const { log, warn, error } = console;

/**
 * Mạng này mainnet hay testnet
 */
export type Net = "TEST" | "MAIN"
export type VM = "ethers" | "tron" | "near" | "solana"

export interface IWallets {
    address: string,
    privateKey: string,
}

export interface ICHAIN {
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

export type CHAINS = Record<string, ICHAIN>;


export interface IWallet {
    provider: Web3;
    address: string;

    connect(provider: Web3): Wallet

    encrypt(password: string | Uint8Array, progressCallback?: void): Promise<string>

    encryptSync(password: string | Uint8Array): string

    get signingKey(): any

    get privateKey(): string

    getAddress(): Promise<string>

    signTransaction(tx: any): Promise<string>

    signMessage(message: string | Uint8Array): Promise<string>

    signMessageSync(message: string | Uint8Array): string

    signTypedData(domain: any, types: Record<string, any[]>, value: Record<string, any>): Promise<string>

    getNonce(blockTag?: any): Promise<number>

    populateCall(tx: any): Promise<string>

    populateTransaction(tx: any): Promise<string>;

    estimateGas(tx: any): Promise<bigint>

    call(tx: any): Promise<string>

    resolveName(name: string): Promise<string>

    sendTransaction(tx: any): Promise<any>
}

export interface IContract {
    instance: any
    target: string;
    interface: any;
    runner: any;
    filters: Record<string, any[]>;
    fallback: any;

    connect(runner: any): Promise<this>;

    attach(target: string): Promise<this>

    getAddress(): Promise<string>

    getDeployedCode(): Promise<string>

    waitForDeployment(): Promise<this>

    deploymentTransaction(): any

    getFunction<T>(key: string): T

    getEvent(key: string): any[]

    queryTransaction(hash: string): Promise<any[]>

    queryFilter(event: any, fromBlock?: string | any, toBlock?: string | any): Promise<any[]>

    on(event: any, listener: EventListener): Promise<this>

    once(event: any, listener: EventListener): Promise<this>

    emit(event: any, ...args: any[]): Promise<boolean>

    listenerCount(event?: any): Promise<number>

    listeners(event?: any): Promise<EventListener[]>

    off(event: any, listener?: EventListener): Promise<this>

    removeAllListeners(event?: any): Promise<this>

    addListener(event: any, listener: EventListener): Promise<this>

    removeListener(event: any, listener: EventListener): Promise<this>
}

export class Contract implements IContract {
    instance: any;
    target: string;
    interface: any;
    runner: any;
    filters: Record<string, any[]>;
    fallback: any;
    connect(runner: any): Promise<this> {
        throw new Error("Method not implemented.");
    }
    attach(target: string): Promise<this> {
        throw new Error("Method not implemented.");
    }
    getAddress(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getDeployedCode(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    waitForDeployment(): Promise<this> {
        throw new Error("Method not implemented.");
    }
    deploymentTransaction() {
        throw new Error("Method not implemented.");
    }
    getFunction<T>(key: string): T {
        throw new Error("Method not implemented.");
    }
    getEvent(key: string): any[] {
        throw new Error("Method not implemented.");
    }
    queryTransaction(hash: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    queryFilter(event: any, fromBlock?: any, toBlock?: any): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    on(event: any, listener: EventListener): Promise<this> {
        throw new Error("Method not implemented.");
    }
    once(event: any, listener: EventListener): Promise<this> {
        throw new Error("Method not implemented.");
    }
    emit(event: any, ...args: any[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    listenerCount(event?: any): Promise<number> {
        throw new Error("Method not implemented.");
    }
    listeners(event?: any): Promise<EventListener[]> {
        throw new Error("Method not implemented.");
    }
    off(event: any, listener?: EventListener): Promise<this> {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: any): Promise<this> {
        throw new Error("Method not implemented.");
    }
    addListener(event: any, listener: EventListener): Promise<this> {
        throw new Error("Method not implemented.");
    }
    removeListener(event: any, listener: EventListener): Promise<this> {
        throw new Error("Method not implemented.");
    }
}

/**
 * Mẫu giao diện Web3 với các hàm mà các kế thừa khác phải có
 */
export interface IWeb3 {
    /**
     * all events of class
     * ("connected", provider)
     */
    events: EventEmitter
    provider: any

    chainId: string
    name: string
    decimals: BigInt
    symbol: string
    net?: Net

    constructor(params: ICHAIN | string): this;

    isAddress(address: string): any;

    getBalance(address: string): Promise<BigInt>;

    connectContract(address: string, abi: any): IContract;
}

export default class Web3 implements IWeb3 {
    constructor(params: ICHAIN | string) {

    }
    events: EventEmitter;
    provider: any;
    chainId: string;
    name: string;
    decimals: BigInt;
    symbol: string;
    net?: Net;
    ["constructor"](params: string | ICHAIN): this {
        throw new Error("Method not implemented.");
    }
    isAddress(address: string) {
        throw new Error("Method not implemented.");
    }
    getBalance(address: string): Promise<BigInt> {
        throw new Error("Method not implemented.");
    }
    connectContract(address: string, abi: any): IContract {
        throw new Error("Method not implemented.");
    }
}
