import { connectChain } from "./src/Web3.js";

const { log, warn, error } = console


var w = connectChain("1", CHAINS["1"])
log(w)