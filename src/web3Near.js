"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var near_api_js_1 = require("near-api-js");
var Web3Near = /** @class */ (function () {
    function Web3Near(config) {
        var _this = this;
        var connectionConfig;
        if (!config) {
            connectionConfig = {
                networkId: "testnet",
                keyStore: new near_api_js_1.keyStores.BrowserLocalStorageKeyStore(),
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            };
        }
        else if (typeof config === "string") {
            connectionConfig = {
                networkId: "testnet",
                keyStore: new near_api_js_1.keyStores.BrowserLocalStorageKeyStore(),
                nodeUrl: config,
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            };
        }
        connectionConfig = config;
        this.events = new events_1.EventEmitter();
        (0, near_api_js_1.connect)(connectionConfig).then(function (provider) {
            _this.provider = provider;
            _this.events.emit("connected", provider);
        });
    }
    /**
     * @param address address string
     */
    Web3Near.isAddress = function (address) {
        try {
            // getAddress(address)
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
    Web3Near.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var account, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.provider.account(address)];
                    case 1:
                        account = _b.sent();
                        _a = BigInt;
                        return [4 /*yield*/, account.getAccountBalance()];
                    case 2: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).available])];
                }
            });
        });
    };
    Web3Near.prototype.send = function (walletFrom, walletTo, amount) { };
    return Web3Near;
}());
exports.default = Web3Near;
