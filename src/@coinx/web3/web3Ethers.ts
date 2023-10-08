
import Std, { log } from "./std"
import { EventEmitter } from "events";
import { WebSocketProvider, JsonRpcProvider, getAddress, ethers, Wallet as _Wallet, Provider, Contract as _Contract, Interface, defineProperties } from "ethers";
import Web3, { ICHAIN, Net, Contract, IFace, Wallet, } from "./web3";



export default class Web3Ethers extends Web3 {

    /**
     * all events of class
     * ("connected", provider)
     */
    events: EventEmitter
    provider: Provider;

    chainId!: string
    name: string = "Ethereum"
    decimals: BigInt = BigInt(1e18)
    symbol: string = "ETH"
    net?: Net

    constructor(params: ICHAIN | string) {
        super(params);
        let url;
        if (typeof (params) === "string")
            url = params
        else {
            url = params.rpcUrls[0];
            let { symbol, name, decimals } = params?.nativeCurrency
            this.symbol = symbol;
            this.name = name;
            this.decimals = BigInt(10 ** Number(decimals));
            this.net = params?.dev
        }

        if (Std.isUrl(url)) {
            if (url.startsWith("ws")) {
                this.provider = new WebSocketProvider(url);
            } else {
                this.provider = new JsonRpcProvider(url);
            }
            this.events = new EventEmitter()
            this.provider.getNetwork().then((network: any) => {
                this.chainId = network?.chainId.toString()
                this.events.emit("connected", { provider: this.provider, network })

            })
        } else {
            throw new Error("NOT_URL");
        }
    }



    isAddress(address: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * @param address address string
     */
    static isAddress(address: string): boolean {
        try {
            getAddress(address)
            return true;
        } catch (err) {
            return false
        }
    }

    /**
     * lấy số dư của 1 địa chỉ ví 
     * @param address 
     */
    getBalance(address = ethers.ZeroAddress): Promise<BigInt> {
        return this.provider.getBalance(address);
    }

    connectContract(address: string, abi: any): Contract {
        return new ContractEthers(address, abi, this);
    }

}

export class WalletEthers extends Wallet {
    wallet: _Wallet
    address: string;
    constructor(privateKey: string) {
        super();

        this.wallet = new _Wallet(privateKey);
        this.address = this.wallet.address
    }
    get privateKey(): string {
        return this.wallet.privateKey;
    }

    getAddress(): string {
        return this.address
    }
}



function checkType(value: any, type: string, name: string): void {
    const types = type.split("|").map(t => t.trim());
    for (let i = 0; i < types.length; i++) {
        switch (type) {
            case "any":
                return;
            case "bigint":
            case "boolean":
            case "number":
            case "string":
                if (typeof (value) === type) { return; }
        }
    }

    const error: any = new Error(`invalid value for type ${type}`);
    error.code = "INVALID_ARGUMENT";
    error.argument = `value.${name}`;
    error.value = value;

    throw error;
}

export function definePropertiess<T>(
    target: T,
    values: { [K in keyof T]?: T[K] },
    types?: { [K in keyof T]?: string }): void {

    for (let key in values) {
        let value = values[key];

        const type = (types ? types[key] : null);
        if (type) { checkType(value, type, key); }

        Object.defineProperty(target, key, { enumerable: true, value, writable: false });
    }
}

export const TypeSolidityToJs = {
    uint8: BigInt,
    uint16: BigInt,
    uint32: BigInt,
    uint64: BigInt,
    uint128: BigInt,
    uint256: BigInt,
    int8: Number,
    int16: Number,
    int32: Number,
    int64: Number,
    int128: Number,
    int256: Number,
    bool: Boolean,
    address: String, // Địa chỉ Ethereum có thể ánh xạ sang kiểu chuỗi
    string: String,
    bytes32: String,
    bytes: Uint8Array, // Mảng bytes trong JavaScript

    event: EventEmitter
}

export class ContractEthers extends Contract {
    instance: any;
    target!: string;
    interface: any;
    runner: any;
    filters!: Record<string, any[]>;

    call: any;

    constructor(address: string, abi: any, web3?: Web3) {
        super();

        if (!web3 || !(web3 instanceof Web3)) {
            throw new Error("web3 not connected yet");
        }
        let instance = new _Contract(address, abi, web3.provider)
        this.instance = instance;
        abi.forEach((v: any) => {
            if (v.type === 'function') {
                log(v.name);
                this.addProperty(<IFace>v)
            }
        })
    }

    addProperty(face: IFace): void {
        log(face)
    }

    generateFuntions(abi: IFace[]) {
        // let functions: any;
        // abi.forEach((item: any) => {
        //     if (item.type === 'function') {
        //         if (["view", "pure"].includes(item.stateMutability)) {
        //             let args = item.inputs.reduce((a: any, input: any) => {
        //                 <typeof TypeSolidityToJs[input.type]> a[input.name]  ;
        //                 return a;
        //             }, {});
        //             functions[item.name](item.inputs) {

        //             }
        //         }
        //         functions[item?.name] = async (...args: any) => {
        //             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //             const functionCall = contractInstance.methods[item.name](...args);

        //             const gas = await functionCall.estimateGas({ from: accounts[0] });
        //             const gasPrice = await web3.eth.getGasPrice();

        //             const result = await functionCall.send({
        //                 from: accounts[0],
        //                 gas: gas,
        //                 gasPrice: gasPrice,
        //             });

        //             console.log(`${item.name} executed successfully. Transaction hash: ${result.transactionHash}`);
        //             return result;
        //         };
        //     }
        // });

    }
}
