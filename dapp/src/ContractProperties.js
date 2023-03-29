import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0xeCB86E47f832cf2c4f0f79023B7bf696E1C3d049";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
export const contract = new web3.eth.Contract(contractABI, contractAddress);