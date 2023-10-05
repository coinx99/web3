import { Provider } from "ethers";
import CHAINS from "./src/CHAINS.json";
import { connectChain, CHAIN } from "./src/Web3";

const { log, warn, error } = console;

var chain = connectChain("ethers", CHAINS[5])

chain?.events.on("connected", ({ provider, network }) => {
    chain?.getBalance("0x122348D81f32D0e13ee023B07d400Fd6CF81a6bF").then(balance => {
        log("balance", Number(balance) / Number(chain?.decimals), chain?.symbol)
        // log(chain, CHAINS[chain?.chainId])
    })
})


// var near = connectChain("near", chains["neartest"])
// near?.events.on("connected", async provider => {
//     let balance = await near?.getBalance("coinx.testnet")
//     let decimals = BigInt(1e24);
//     log({ balance: balance / decimals })
// })