import Web3 from "web3";

declare global {
    interface Window {
        web3: Web3;
    }
}

declare module "*.json" {
    const value: any;
    export default value;
}
