/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
import { EventEmitter, } from "events";
import { WalletEthers } from "./web3Ethers";

const { log, warn, error } = console;

/**
 * Mạng này mainnet hay testnet
 */
export type Net = "TEST" | "MAIN"
export type VM = "ethers" | "tron" | "near" | "solana"

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
    readonly address: string;

    connect(provider: Web3): IWallet

    encrypt(password: string | Uint8Array, progressCallback?: void): Promise<string>

    encryptSync(password: string | Uint8Array): string

    get signingKey(): any

    get privateKey(): string

    getAddress(): string

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

    getBalance(): Promise<BigInt>;
}

export class Wallet extends EventEmitter implements IWallet {
    provider!: Web3;
    address!: string;
    [index: string]: any;

    connect(provider: Web3): Wallet {
        throw new Error("Method not implemented.");
    }
    encrypt(password: string | Uint8Array, progressCallback?: void | undefined): Promise<string> {
        throw new Error("Method not implemented.");
    }
    encryptSync(password: string | Uint8Array): string {
        throw new Error("Method not implemented.");
    }
    get signingKey(): any {
        throw new Error("Method not implemented.");
    }
    get privateKey(): string {
        throw new Error("Method not implemented.");
    }
    getAddress(): string {
        throw new Error("Method not implemented.");
    }
    signTransaction(tx: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    signMessage(message: string | Uint8Array): Promise<string> {
        throw new Error("Method not implemented.");
    }
    signMessageSync(message: string | Uint8Array): string {
        throw new Error("Method not implemented.");
    }
    signTypedData(domain: any, types: Record<string, any[]>, value: Record<string, any>): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getNonce(blockTag?: any): Promise<number> {
        throw new Error("Method not implemented.");
    }
    populateCall(tx: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    populateTransaction(tx: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    estimateGas(tx: any): Promise<bigint> {
        throw new Error("Method not implemented.");
    }
    call(tx: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    resolveName(name: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    sendTransaction(tx: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getBalance(): Promise<BigInt> {
        throw new Error("Method not implemented.");
    }
}

export interface IFace {
    inputs: any[],
    name: string,
    outputs: any[],
    stateMutability: string,
    type: string,
}

export interface IContract {
    instance: any
    target: string;
    interface: any;
    runner: any;
    filters: Record<string, any[]>;

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


    addProperty(face: IFace): any;
}

export class Contract extends EventEmitter implements IContract {
    instance: any;
    target!: string;
    interface: any;
    runner: any;
    filters!: Record<string, any[]>;

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
    addProperty(face: IFace) {
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
    provider: any

    chainId: string
    name: string
    decimals: BigInt
    symbol: string
    net?: Net

    constructor(params: ICHAIN | string): this;

    isAddress(address: string): any;

    getBalance(address: string): Promise<BigInt>;

    connectContract(address: string, abi: any): Contract;
}

export default class Web3 extends EventEmitter implements IWeb3 {
    provider!: any;
    chainId!: string;
    name!: string;
    decimals!: BigInt;
    symbol!: string;
    net?: Net;

    constructor(params: ICHAIN | string) {
        super();
    }

    ["constructor"](params: string | ICHAIN): this {
        throw new Error("Method not implemented.");
    }
    isAddress(address: string) {
        throw new Error("Method not implemented.");
    }
    getBalance(address: string): Promise<BigInt> {
        throw new Error("Method not implemented.");
    }
    connectContract(address: string, abi: any): Contract {
        throw new Error("Method not implemented.");
    }
}

