
import Std, { log } from "./std"
import { EventEmitter } from "events";
import { WebSocketProvider, JsonRpcProvider, getAddress, ethers, Wallet as _Wallet, Provider, Contract as _Contract, Interface, defineProperties } from "ethers";
import Web3, { ICHAIN, Net, Contract, IFace, Wallet, } from "./web3";



export default class Web3Ethers extends Web3 {

    /**
     * all events of class
     * ("connected", provider)
     */
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
            this.provider.getNetwork().then((network: any) => {
                this.chainId = network?.chainId.toString()
                this.emit("connected", { provider: this.provider, network })

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

    constructor(privateKey: string) {
        super();

        this.wallet = new _Wallet(privateKey);
        this.address = this.wallet.address
    }

    connect(web3: Web3): Wallet {
        this.provider = web3;
        return this;
    }

    get privateKey(): string {
        return this.wallet.privateKey;
    }

    getAddress(): string {
        return this.address
    }

    async getBalance(): Promise<BigInt> {
        this.balance = await this.provider.getBalance(this.address);
        return this.balance;
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
    uint8: BigInt(1),
    uint16: BigInt(1),
    uint32: BigInt(1),
    uint64: BigInt(1),
    uint128: BigInt(1),
    uint256: BigInt(1),
    int8: Number(-1),
    int16: Number(-1),
    int32: Number(-1),
    int64: Number(-1),
    int128: Number(-1),
    int256: Number(-1),
    bool: true,
    address: "string", // Địa chỉ Ethereum có thể ánh xạ sang kiểu chuỗi
    string: "string",
    bytes32: "string",
    bytes: Uint8Array, // Mảng bytes trong JavaScript

    event: EventEmitter
}

type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;

let l: LazyPerson ={
    getName: function (): string {
        throw new Error("Function not implemented.");
    },
    getAge: function (): number {
        throw new Error("Function not implemented.");
    },
    getLocation: function (): string {
        throw new Error("Function not implemented.");
    }
} ;

console.log(l)

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
        log(abi)
        abi.forEach((v: any) => {
            v.inputs.forEach((input: any) => {
                log(TypeSolidityToJs[input.type])
            })
            if (v.type === 'function') {
                this.addProperty(<IFace>v)
            }
        })
    }

    whatType(typename: string): any {

    }

    addProperty(face: IFace): void {
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
