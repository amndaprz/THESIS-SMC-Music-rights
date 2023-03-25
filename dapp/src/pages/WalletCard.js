import React, {useState} from 'react'
import {ethers} from 'ethers'
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../ContractProperties';
import ERC721 from '../erc721ABI.json';

let account;
let result = " ";

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
				displayInfo();
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

    // update account
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		window.location.reload();
	}


	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);


	// Display INfo

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

    return (
		<div className='walletCard'>
		<h4> {"Connect to MetaMask"} </h4>
			
			<div className='accountDisplay'>
				{/* <h3>Address: {defaultAccount}</h3> */}
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance} ETH</h3>
			</div>
			{errorMessage}
			{/* {displayInfo} */}
			{/* <DisplayInfo/> */}

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

			<button onClick={connectWalletHandler}>{connButtonText}</button>
		</div>
	);
}

export default WalletCard;