import { connectChain, } from "./src/index";

const CHAINS = require("./src/CHAINS.json");
const ERC20 = require("./src/ERC20.json");

const { log, warn, error } = console;

var chain = connectChain("ethers", CHAINS[5])

var myaddress = "0x122348D81f32D0e13ee023B07d400Fd6CF81a6bF"
var tokenaddress = "0xA705237C2A2c228d4C275D4f686EB40f9D9bd510"

chain?.events?.on("connected", ({ provider, network }) => {

    chain?.getBalance(myaddress).then(balance => {
        log("balance", Number(balance) / Number(chain?.decimals), chain?.symbol)
        // log(chain, CHAINS[chain?.chainId])
    })

    let token = chain?.connectContract(tokenaddress, ERC20);
    // log(token.symbol())
})


// var near = connectChain("near", chains["neartest"])
// near?.events.on("connected", async provider => {
//     let balance = await near?.getBalance("coinx.testnet")
//     let decimals = BigInt(1e24);
//     log({ balance: balance / decimals })
// })