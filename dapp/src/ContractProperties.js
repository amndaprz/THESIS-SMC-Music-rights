import ERC721 from './erc721ABI.json';
import Web3 from "web3";
//require("dotenv").config();

// just change web3 link if you want to test other rpc servers
// if alchemy, change methods
// if infura, change web3 to ethereum

export const contractAddress = "0xC88A62772a89Ff40e8F9F9e06EaC910c28B7a966";
//const http_key = process.env.REACT_APP_ALCHEMY_KEY;
//console.log(JSON.stringify(contract.abi));

export const contractABI = ERC721;
export const web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/7xQu8LjQYqTTF-gWhwKGbHfEdxF5-WCN");
export const contract = new web3.eth.Contract(contractABI, contractAddress);