"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3Ethers = /** @class */ (function () {
    function Web3Ethers(rpc) {
    }
    Web3Ethers.isAddress = function (address) {
        if (address === void 0) { address = ""; }
    };
    Web3Ethers.prototype.getBalance = function () { };
    Web3Ethers.prototype.send = function (walletFrom, walletTo, amount) { };
    return Web3Ethers;
}());
exports.default = Web3Ethers;
