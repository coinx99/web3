"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectChain = void 0;
/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như:
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
var log = console.log, warn = console.warn, error = console.error;
var CHAINS_json_1 = require("./CHAINS.json");
var Web3Ethers_1 = require("./Web3Ethers");
/**
 * Mẫu giao diện Web3 với các hàm mà các kế thừa khác phải có
 */
var Web3 = /** @class */ (function () {
    function Web3(rpc) {
    }
    Web3.isAddress = function (address) {
        if (address === void 0) { address = ""; }
    };
    Web3.prototype.getBalance = function () { };
    Web3.prototype.send = function (walletFrom, walletTo, amount) { };
    return Web3;
}());
/**
 *
 * @param chainId
 * @param rpcUrls
 */
function connectChain(chainId, rpcUrls) {
    if (chainId === void 0) { chainId = "0x1"; }
    if (!rpcUrls) {
        var chain = CHAINS_json_1.default.find(function (v, i) { return v.chainId === chainId; });
        if (chain) {
            rpcUrls = chain.blockExplorerUrls[0];
        }
    }
    switch (chainId) {
        case "tron":
            break;
        default:
            return new Web3Ethers_1.default(rpcUrls);
    }
}
exports.connectChain = connectChain;
exports.default = Web3;
