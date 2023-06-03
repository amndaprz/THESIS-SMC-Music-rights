import ERC721 from './erc721ABI.json';
import Web3 from "web3";
//require("dotenv").config();

export const contractAddress = "0xC88A62772a89Ff40e8F9F9e06EaC910c28B7a966";
const http_key = process.env.REACT_APP_ALCHEMY_KEY;

export const contractABI = ERC721;
export const web3 = new Web3(http_key);
export const contract = new web3.eth.Contract(contractABI, contractAddress);