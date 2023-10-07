
import Std, { log } from "./std"
import { EventEmitter } from "events";
import { WebSocketProvider, JsonRpcProvider, getAddress, ethers, Wallet, Provider, Contract as _Contract } from "ethers";
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

    call: any;

    constructor(address: string, abi: any, web3?: Web3) {
        super();
        if (!web3 || !(web3 instanceof Web3)) {
            throw new Error("web3 not connected yet");
        }
        let instance = new _Contract(address, abi, web3.provider)
        this.instance = instance;
        abi.forEach((element: any) => {
            if ((element.stateMutability === "view" || "pure") && (element.name === undefined)) log(element)

        });
    }
}

export type WalletEthers = Wallet;
