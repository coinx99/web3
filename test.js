"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CHAINS_json_1 = require("./src/CHAINS.json");
var index_1 = require("./src/index");
var log = console.log, warn = console.warn, error = console.error;
setTimeout(function () {
    var _a;
    var chain = (0, index_1.connectChain)("ethers", CHAINS_json_1.CHAINS[5]);
    var myaddress = "0x122348D81f32D0e13ee023B07d400Fd6CF81a6bF";
    var tokenaddress = "0xA705237C2A2c228d4C275D4f686EB40f9D9bd515";
    (_a = chain === null || chain === void 0 ? void 0 : chain.events) === null || _a === void 0 ? void 0 : _a.on("connected", function (_a) {
        var provider = _a.provider, network = _a.network;
        chain === null || chain === void 0 ? void 0 : chain.getBalance(myaddress).then(function (balance) {
            log("balance", Number(balance) / Number(chain === null || chain === void 0 ? void 0 : chain.decimals), chain === null || chain === void 0 ? void 0 : chain.symbol);
            // log(chain, CHAINS[chain?.chainId])
        });
        // let token = new chain?.Contract(tokenaddress, ERC20);
        // log(token)
    });
}, 1000);
// var near = connectChain("near", chains["neartest"])
// near?.events.on("connected", async provider => {
//     let balance = await near?.getBalance("coinx.testnet")
//     let decimals = BigInt(1e24);
//     log({ balance: balance / decimals })
// })
