
import Std, { log } from "./Std"
import { connect, Near, keyStores, } from "near-api-js";
import Web3, { Wallet } from "./Web3.js";

class Web3Near implements Web3 {

    provider: Near;

    constructor(rpcUrls: string | string[]) {
        let url;
        if (typeof (rpcUrls) === "string")
            url = rpcUrls
        else
            url = rpcUrls[0];
        log(url, typeof url)

        if (Std.isUrl(url)) {
            const connectionConfig = {
                networkId: "testnet",
                keyStore: new keyStores.BrowserLocalStorageKeyStore(), // first create a key store 
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            };
            connect(connectionConfig).then(near => this.provider = near);
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



export default Web3Near;