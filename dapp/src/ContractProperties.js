import ERC721 from './erc721ABI.json';
import Web3 from "web3";

export const contractAddress = "0x53cF1C4F84469f8fA3d5Af20e0eA6852dB49fb68";

export const contractABI = ERC721;
const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/92a80845fcca49f0aa359bb806201101'));
export const contract = new web3.eth.Contract(contractABI, contractAddress);