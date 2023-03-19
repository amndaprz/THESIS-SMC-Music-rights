import React, {useState} from 'react'
import {ethers} from 'ethers'
import ERC721 from './erc721ABI.json';
import Web3 from "web3";

// Contract Connection
const contractAddress = "0x39A790dCD35D33b9B4503249b859C5abA8284102";

// abi
const contractABI = ERC721;
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Accounts
let account;

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
		try {
			const result = await contract.methods._isArtist().call();
			console.log("The result of _isArtist is:", result);
			setRole(result);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	}
	
	return (
		<div>

		<h4> {"Connect to MetaMask"} </h4>	
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
			</div>

			<div className='balanceDisplay'>
				<button onClick={displayRole}>Display Role</button>
				<h3 id='role'> Role: {roleText}</h3>
			</div>

			{}
		</div>

		
	);
}

export default ConnectContract;