"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEthers = void 0;
var std_1 = require("./std");
var events_1 = require("events");
var ethers_1 = require("ethers");
var web3_1 = require("./web3");
var Web3Ethers = /** @class */ (function (_super) {
    __extends(Web3Ethers, _super);
    function Web3Ethers(params) {
        var _this = _super.call(this, params) || this;
        _this.name = "Ethereum";
        _this.decimals = BigInt(1e18);
        _this.symbol = "ETH";
        var url;
        if (typeof (params) === "string")
            url = params;
        else {
            url = params.rpcUrls[0];
            var _a = params === null || params === void 0 ? void 0 : params.nativeCurrency, symbol = _a.symbol, name_1 = _a.name, decimals = _a.decimals;
            _this.symbol = symbol;
            _this.name = name_1;
            _this.decimals = BigInt(Math.pow(10, Number(decimals)));
            _this.net = params === null || params === void 0 ? void 0 : params.dev;
        }
        if (std_1.default.isUrl(url)) {
            if (url.startsWith("ws")) {
                _this.provider = new ethers_1.WebSocketProvider(url);
            }
            else {
                _this.provider = new ethers_1.JsonRpcProvider(url);
            }
            _this.events = new events_1.EventEmitter();
            _this.provider.getNetwork().then(function (network) {
                _this.chainId = network === null || network === void 0 ? void 0 : network.chainId.toString();
                _this.events.emit("connected", { provider: _this.provider, network: network });
            });
        }
        else {
            throw new Error("NOT_URL");
        }
        return _this;
    }
    Web3Ethers.prototype.isAddress = function (address) {
        throw new Error("Method not implemented.");
    };
    /**
     * @param address address string
     */
    Web3Ethers.isAddress = function (address) {
        try {
            (0, ethers_1.getAddress)(address);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * lấy số dư của 1 địa chỉ ví
     * @param address
     */
    Web3Ethers.prototype.getBalance = function (address) {
        if (address === void 0) { address = ethers_1.ethers.ZeroAddress; }
        return this.provider.getBalance(address);
    };
    Web3Ethers.prototype.connectContract = function (address, abi) {
        return new ContractEthers(address, abi, this);
    };
    return Web3Ethers;
}(web3_1.default));
exports.default = Web3Ethers;
var ContractEthers = /** @class */ (function (_super) {
    __extends(ContractEthers, _super);
    function ContractEthers(address, abi, web3) {
        return _super.call(this) || this;
    }
    ContractEthers.prototype.connect = function (runner) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.attach = function (target) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.getAddress = function () {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.getDeployedCode = function () {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.waitForDeployment = function () {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.deploymentTransaction = function () {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.getFunction = function (key) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.getEvent = function (key) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.queryTransaction = function (hash) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.queryFilter = function (event, fromBlock, toBlock) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.on = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.once = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.listenerCount = function (event) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.listeners = function (event) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.off = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.removeAllListeners = function (event) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.addListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    ContractEthers.prototype.removeListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    return ContractEthers;
}(web3_1.Contract));
exports.ContractEthers = ContractEthers;
