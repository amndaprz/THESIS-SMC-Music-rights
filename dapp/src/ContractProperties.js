import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0xD6ad6a6E3039E7e38d6C1E265330F5A9f1f2Dd07";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);