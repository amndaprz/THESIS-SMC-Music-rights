import React, {useState} from 'react'
import {ethers} from 'ethers'
import ERC721 from './erc721ABI.json';
import Web3 from "web3";
import properties from "./ContractProperties";


// Contract Connection
const contractAddress = "0x4efE1A9FB95EB626D3e9dd73fEF05AF13c771AFf";

// abi
const contractABI = ERC721;
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Accounts
let account;
let result = " ";

const ConnectContract = () => {

	const [addressText, setAddress] = useState(' ');
	const [roleText, setRole] = useState(' ');

	const displayAddress = async() => {
		const accounts = await web3.eth.requestAccounts();
		account = accounts[0];
		setAddress(account);

		console.log('Address is displayed');
	}
	
	async function displayRole() {
		result = " " ;
		try {
			// Admin
			if(await contract.methods._isAdmin(account).call()){
				result += "Admin ";
			} 
		} catch (error) {
			console.error("An error occurred:", error);
		}
		
		try{
			// Client
			if(await contract.methods._isClient(account).call()){
				result += "Client ";
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}

		try{
			// Label
			if(await contract.methods._isLabel(account).call()){
				result += "Label ";
			} 
		} catch (error) {
			console.error("An error occurred:", error);
		}

		try{
			// Artist
			if(await contract.methods._isArtist(account).call()){
				result += "Artist ";
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
			console.log("Roles:", result);
			setRole(result);
		
	}
	
	return (
		<div>

			{/* <h4> {"Connect to MetaMask"} </h4>	
			<button onClick={displayAddress}>Display Address </button>

			<div className='accountDisplay'>
				<h3 id='account'>Address: {addressText}</h3>
			</div>
			
			<div className='balanceDisplay'>
				<h3>Balance: {}</h3>
			</div>

			<div className='balanceDisplay'>
				<button onClick={displayRole}>Display Role</button>
				<h3 id='role'> Role: {roleText}</h3>
			</div> */}

			{/* <div className='balanceDisplay'>
				<button onClick={displayRole}>Display Role</button>
				<h3 id='role'> Role: {roleText}</h3>
			</div> */}

			{}

			
		</div>

		
	);
}

export default ConnectContract;