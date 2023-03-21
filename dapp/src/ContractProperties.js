import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0x9Ae2E22c651Df8B579b828F20AC49D895B1898C7";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);