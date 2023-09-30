import CHAINS from "./src/CHAINS.json";
import { connectChain } from "./src/Web3";

const { log, warn, error } = console

log(typeof CHAINS)


var w = connectChain("0x1")
log(w)