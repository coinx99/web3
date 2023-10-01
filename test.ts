import _chains from "./src/CHAINS.json";
import { connectChain, CHAINS, CHAIN } from "./src/Web3";

const { log, warn, error } = console

let chains = _chains as unknown as CHAINS;

var chain = connectChain("ethers", chains["5"].rpcUrls)
log(chain)

chain?.getBalance("0x122348D81f32D0e13ee023B07d400Fd6CF81a6bF").then(balance => {

    log(balance / BigInt(1e18))

})