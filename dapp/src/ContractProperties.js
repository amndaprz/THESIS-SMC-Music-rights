import ERC721 from './erc721ABI.json';
import Web3 from "web3";
// import dotenv from "dotenv";

export const contractAddress = "0x031699D978d526623999f8F1e75Be6CE4fDb539E";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// export const web3 = new Web3('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101');
export const contract = new web3.eth.Contract(contractABI, contractAddress);