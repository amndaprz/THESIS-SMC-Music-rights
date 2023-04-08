import React, {useState} from 'react'
import {ethers} from 'ethers'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';



// Accounts
let account;
let result = " ";


const DisplayInfo = () => {

	const [addressText, setAddress] = useState('Address');
	const [roleText, setRole] = useState(' -- ');
	const [balance, setBalance] = useState(' -- ');

    const displayAddress = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];
        
		setAddress(account);
		console.log('Address is displayed');
        // console.log(account);
	}
	
	const displayBalance = async() => {
		const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);
        console.log("Balance = " + balance);
	}

    async function displayRole() {
		result = " " ;
		try {
			// Admin
			if(await contract.methods._isAdmin(account).call()){
				result += "Admin ";
			} 
		} catch (error) {
			// console.error("An error occurred:", error);
		}
		
		try{
			// Client
			if(await contract.methods._isClient(account).call()){
				result += "Client ";
			}
		} catch (error) {
			// console.error("An error occurred:", error);
		}

		try{
			// Label
			if(await contract.methods._isLabel(account).call()){
				result += "Label ";
			} 
		} catch (error) {
			// console.error("An error occurred:", error);
		}

		try{
			// Artist
			if(await contract.methods._isArtist(account).call()){
				result += "Artist ";
                
			}
		} catch (error) {
			// console.error("An error occurred:", error);
		}
			setRole(result);
			console.log("Roles:", result);		
	}

    const displayInfo = async() => {
        displayAddress();
		displayBalance();
        displayRole();
		
        console.log('-----All Info has been displayed----');
    }

    return(
        <div>
            <h1>Display info</h1>
            <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
                <div className="col-sm-3 box_contractinfo_label" >Address</div>
                <div className="col-sm-9">{addressText}</div>
            </div>
            <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
                <div className="col-sm-3 box_contractinfo_label" >Token Balance</div>
                <div className="col-sm-9">{balance} contracts</div>
            </div>
            <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
                <div className="col-sm-3 box_contractinfo_label" >User Role</div>
                <div className="col-sm-9">{roleText}</div>
            </div>

            <button onClick={displayInfo}> Display Information </button>
        </div>
    );
}

export default DisplayInfo;