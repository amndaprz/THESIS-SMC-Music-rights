import ERC721 from './erc721ABI.json';
import ERC721_RA from './erc721ABI_RA.json';

import Web3 from "web3";
// import dotenv from "dotenv";

// MusicRightsToken.sol -------------------------
export const contractAddress = "0x195A808B093dcdd835d9FdceC7155883aD2E043E";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// export const web3 = new Web3('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101');
export const contract = new web3.eth.Contract(contractABI, contractAddress);


// RoleAccess.sol ------------------
export const contractAddress_RA = "0xb0219C399a6e787123D7E24d46aD42dc0B1898F2";

export const contractABI_RA = ERC721_RA;
export const web3_RA = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// export const web3 = new Web3('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101');
export const contract_RA = new web3_RA.eth.Contract(contractABI_RA, contractAddress_RA);