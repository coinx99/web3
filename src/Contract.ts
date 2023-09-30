/**
 * Đại diện cho 1 contract
 * Có các tính năng: 
 * - Khởi tạo contract tùy vào chain
 * - Cung cấp các phương thức để tương tác với contract
 */

import Web3 from "./Web3.js"

abstract class Contract {
    constructor(web3: Web3) { }
}