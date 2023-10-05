
import Std, { log } from "./Std"
import { EventEmitter } from "events";
import { Provider, WebSocketProvider, JsonRpcProvider, getAddress, ethers } from "ethers";
import Web3, { CHAIN, Net, Wallet } from "./Web3";

class Web3Ethers implements Web3 {

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

    constructor(params: CHAIN | string) {
        let url;
        if (typeof (params) === "string")
            url = params
        else {
            url = params.rpcUrls[0];
            let { symbol, name, decimals } = params?.nativeCurrency
            this.symbol = symbol;
            this.name = name;
            this.decimals = BigInt(10 ** decimals);
            this.net
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

    send(walletFrom: Wallet, walletTo: Wallet, amount: BigInt) { }
}



export default Web3Ethers;