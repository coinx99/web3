"use strict";
/**
 * web3 là 1 class đại diện cho các chức năng cơ bản như:
 * - kiểm tra 1 chuỗi có phải là đúng định dạng ví hay không
 * - lấy số dư 1 ví
 * - chuyển tiền từ ví này sang ví kia
 * - Khởi tạo thực thể Contract
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Std_js_1 = require("./Std.js");
var ethers_1 = require("ethers");
var Web3Ethers = /** @class */ (function () {
    function Web3Ethers(rpcUrls) {
        var url;
        if (typeof (rpcUrls) === "string")
            url = rpcUrls;
        else
            url = rpcUrls[0];
        (0, Std_js_1.log)(typeof (rpcUrls));
        if (Std_js_1.default.isUrl(url)) {
            if (url.startsWith("ws")) {
                this.provider = new ethers_1.WebSocketProvider(url);
            }
            else {
                this.provider = new ethers_1.JsonRpcProvider(url);
            }
        }
        else {
            throw new Error("NOT_URL");
        }
    }
    Web3Ethers.isAddress = function (address) {
        if (address === void 0) { address = ""; }
    };
    Web3Ethers.prototype.getBalance = function () { };
    Web3Ethers.prototype.send = function (walletFrom, walletTo, amount) { };
    return Web3Ethers;
}());
exports.default = Web3Ethers;
