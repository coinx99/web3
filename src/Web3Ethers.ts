
import Std, { log } from "./Std"
import { Provider, WebSocketProvider, JsonRpcProvider, getAddress, ethers } from "ethers";
import Web3, { Wallet } from "./Web3.js";

class Web3Ethers implements Web3 {

    provider: Provider;

    constructor(rpcUrls: string | string[]) {
        let url;
        if (typeof (rpcUrls) === "string")
            url = rpcUrls
        else
            url = rpcUrls[0];
        log(url, typeof url)

        if (Std.isUrl(url)) {
            if (url.startsWith("ws")) {
                this.provider = new WebSocketProvider(url);
            } else {
                this.provider = new JsonRpcProvider(url);
            }
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