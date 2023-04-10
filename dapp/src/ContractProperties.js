import ERC721 from './erc721ABI.json';
import ERC721stream from './erc721StreamABI.json';
import Web3 from "web3";

// buyout
export const contractAddress = "0x3A34f12eD4Cd5C1DFDe46614FB636CBD7CEeDFCd";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);

// Stream
export const contractStreamAddress = "0x72FE16135e6DeBdFF6320D1deA4F5fAa33EF197a";

export const contractStreamABI = ERC721stream;
export const web3S = new Web3(Web3.givenProvider || "http:://127.0.0.1:7545");
export const contractStream = new web3S.eth.Contract(contractStreamABI, contractStreamAddress);
