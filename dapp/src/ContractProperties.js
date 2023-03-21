import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0x075a409b79031A9E66401D6Cd22eDaD845729861";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);