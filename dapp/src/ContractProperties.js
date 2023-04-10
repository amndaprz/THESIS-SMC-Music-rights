import ERC721 from './erc721ABI.json';
import ERC721stream from './erc721StreamABI.json';
import Web3 from "web3";

// buyout
export const contractAddress = "0xb694dA74A8D4Fb7fFA94b364E7bFC82d0C4e8773";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);

// Stream
export const contractStreamAddress = "0x88e3436422568b1Ea78625e8ee05897331fC571e";

export const contractStreamABI = ERC721stream;
export const web3S = new Web3(Web3.givenProvider || "http:://127.0.0.1:7545");
export const contractStream = new web3S.eth.Contract(contractStreamABI, contractStreamAddress);
