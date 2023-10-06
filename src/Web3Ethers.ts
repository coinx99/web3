
import Std, { log } from "./std"
import { EventEmitter } from "events";
import { Provider, WebSocketProvider, JsonRpcProvider, getAddress, ethers, Wallet, } from "ethers";
import Web3, { ICHAIN, Net, Contract, } from "./web3";

export default class Web3Ethers extends Web3 {

    /**
     * all events of class
     * ("connected", provider)
     */
    events: EventEmitter
    provider: Provider;

    chainId: string
    name: string = "Ethereum"
    decimals: BigInt = BigInt(1e18)
    symbol: string = "ETH"
    net?: Net


    constructor(params: ICHAIN | string) {
        super(params);
        let url;
        if (typeof (params) === "string")
            url = params
        else {
            url = params.rpcUrls[0];
            let { symbol, name, decimals } = params?.nativeCurrency
            this.symbol = symbol;
            this.name = name;
            this.decimals = BigInt(10 ** Number(decimals));
            this.net = params?.dev
        }

        if (Std.isUrl(url)) {
            if (url.startsWith("ws")) {
                this.provider = new WebSocketProvider(url);
            } else {
                this.provider = new JsonRpcProvider(url);
            }
            this.events = new EventEmitter()
            this.provider.getNetwork().then(network => {
                this.chainId = network?.chainId.toString()
                this.events.emit("connected", { provider: this.provider, network })

            })
        } else {
            throw new Error("NOT_URL");
        }
    }

    isAddress(address: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * @param address address string
     */
    static isAddress(address: string): boolean {
        try {
            getAddress(address)
            return true;
        } catch (err) {
            return false
        }
    }

    /**
     * lấy số dư của 1 địa chỉ ví 
     * @param address 
     */
    getBalance(address = ethers.ZeroAddress): Promise<BigInt> {
        return this.provider.getBalance(address);
    }

    connectContract(address: string, abi: any): Contract {
        return new ContractEthers(address, abi, this);
    }

}

export class ContractEthers extends Contract {
    instance: any;
    target: string;
    interface: any;
    runner: any;
    filters: Record<string, any[]>;
    fallback: any;

    constructor(address: string, abi: any, web3?: Web3) {
        super();
    }

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

export type WalletEthers = Wallet;
