import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0x84ABc2D85aE7427c6A1BB75c3fD62b93A51e9f86";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);