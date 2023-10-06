
import Std, { log } from "./std"
import { EventEmitter } from "events";
import { connect, Near, keyStores, ConnectConfig, } from "near-api-js";
import Web3, { Net, Wallet } from "./web3";

class Web3Near implements Web3 {

    /**
     * all events of class
     * ("connected", provider)
     */
    events: EventEmitter
    provider: Near;

    name: string
    decimals: BigInt
    symbol: string
    net?: Net

    constructor(config?: any | string) {
        let connectionConfig: any;
        if (!config) {
            connectionConfig = {
                networkId: "testnet",
                keyStore: new keyStores.BrowserLocalStorageKeyStore(), // first create a key store 
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            };
        } else if (typeof config === "string") {
            connectionConfig = {
                networkId: "testnet",
                keyStore: new keyStores.BrowserLocalStorageKeyStore(), // first create a key store 
                nodeUrl: config,
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            };
        }
        connectionConfig = config;
        this.events = new EventEmitter()
        connect(connectionConfig).then(provider => {
            this.provider = provider;
            this.events.emit("connected", provider);
        });
    }

    /**
     * @param address address string
     */
    static isAddress(address: string): boolean {
        try {
            // getAddress(address)
            return true;
        } catch (err) {
            return false
        }
    }

    /**
     * lấy số dư của 1 địa chỉ ví 
     * @param address 
     */
    async getBalance(address: string): Promise<BigInt> {
        const account = await this.provider.account(address);
        return BigInt((await account.getAccountBalance()).available);
    }

    send(walletFrom: Wallet, walletTo: Wallet, amount: BigInt) { }
}



export default Web3Near;