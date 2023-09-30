"use strict";
/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như:
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectChain = void 0;
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
}
exports.connectChain = connectChain;
exports.default = Web3;
