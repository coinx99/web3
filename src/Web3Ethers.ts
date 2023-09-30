/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */

import Std, { log } from "./Std.js"
import { Provider, WebSocketProvider, JsonRpcProvider, } from "ethers";
import Web3, { Wallet } from "./Web3.js";

class Web3Ethers implements Web3 {

    provider: Provider;


    constructor(rpcUrls: string | string[]) {
        let url;
        if (typeof (rpcUrls) === "string")
            url = rpcUrls
        else
            url = rpcUrls[0];
        log(typeof (rpcUrls))
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

    static isAddress(address = "") { }

    getBalance() { }

    send(walletFrom: Wallet, walletTo: Wallet, amount: BigInt) { }
}



export default Web3Ethers;