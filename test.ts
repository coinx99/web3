import _chains from "./src/CHAINS.json";
import { connectChain, CHAINS, CHAIN } from "./src/Web3";

const { log, warn, error } = console

let chains = _chains as unknown as CHAINS;

log(chains["1337"])

// for (const key in CHAINS) {
//     log(typeof CHAINS[key].chainId)
// }

// log(CHAINS["1"])
// type chains = Record<string | number | symbol, CHAIN> = {
//     [key in keyof typeof CHAINS]: CHAIN & {
//         chainId?: key extends `${number}` ? Number : undefined;
//         name: key extends `chain${infer name}` ? (typeof name)[][Number] : never;
//     }
// }


// var w = connectChain("1")
// log(w)
