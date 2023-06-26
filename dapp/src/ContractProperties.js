import ERC721 from './erc721ABI.json';
import ERC721_RA from './erc721ABI_RA.json';
import ERC721_Stream from './erc721ABI_Stream.json';

import Web3 from "web3";
// import dotenv from "dotenv";

// MusicRightsToken.sol -------------------------
export const contractAddress = "0x78F139Df914b009aC43317D3E12bdCD831Cf0E0d";

export const contractABI = ERC721;
export const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// export const web3 = new Web3('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101');
export const contract = new web3.eth.Contract(contractABI, contractAddress);


// RoleAccess.sol ------------------
export const contractAddress_RA = "0xF83fCfffcCC994f061668C28fBDA64ef81DCa5C9";

export const contractABI_RA = ERC721_RA;
export const web3_RA = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// export const web3 = new Web3('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101');
export const contract_RA = new web3_RA.eth.Contract(contractABI_RA, contractAddress_RA);


// Stream.sol ------------------
export const contractAddress_Stream = "0xFD28656b5D908d5c95d181004277Dd4dca4A830B";

export const contractABI_Stream = ERC721_Stream;
export const web3_Stream = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// export const web3 = new Web3('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101');
export const contract_Stream = new web3_Stream.eth.Contract(contractABI_Stream, contractAddress_Stream);