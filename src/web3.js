"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
var log = console.log, warn = console.warn, error = console.error;
var Contract = /** @class */ (function () {
    function Contract() {
    }
    Contract.prototype.connect = function (runner) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.attach = function (target) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.getAddress = function () {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.getDeployedCode = function () {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.waitForDeployment = function () {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.deploymentTransaction = function () {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.getFunction = function (key) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.getEvent = function (key) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.queryTransaction = function (hash) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.queryFilter = function (event, fromBlock, toBlock) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.on = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.once = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error("Method not implemented.");
    };
    Contract.prototype.listenerCount = function (event) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.listeners = function (event) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.off = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.removeAllListeners = function (event) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.addListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    Contract.prototype.removeListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    return Contract;
}());
exports.Contract = Contract;
var Web3 = /** @class */ (function () {
    function Web3(params) {
    }
    Web3.prototype["constructor"] = function (params) {
        throw new Error("Method not implemented.");
    };
    Web3.prototype.isAddress = function (address) {
        throw new Error("Method not implemented.");
    };
    Web3.prototype.getBalance = function (address) {
        throw new Error("Method not implemented.");
    };
    Web3.prototype.connectContract = function (address, abi) {
        throw new Error("Method not implemented.");
    };
    return Web3;
}());
exports.default = Web3;
