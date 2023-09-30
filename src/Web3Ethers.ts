/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như: 
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
import {ethers} from "ethers";

import Web3, { Wallet } from "./Web3.js";

class Web3Ethers implements Web3 {

    constructor(rpc: string) {

    }

    static isAddress(address = "") { }

    getBalance() { }

    send(walletFrom: Wallet, walletTo: Wallet, amount: BigInt) { }
}



export default Web3Ethers;