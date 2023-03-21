import React, {useState} from 'react'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';

// Accounts
let account;
let result = " ";


const DisplayInfo = () => {

	const [addressText, setAddress] = useState('Address');
	const [roleText, setRole] = useState(' -- ');

    const displayAddress = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];
        
		setAddress(account);
		console.log('Address is displayed');
        // console.log(account);
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
			console.log("Roles:", result);		
	}

    const displayInfo = async() => {
        displayAddress();
        displayRole();

        console.log('-----All Info has been displayed----');
    }

    return(
        <div>
            <form className="mx-4 mt-4" onSubmit="">
                <div className="d-flex justify-content-center flex-column">
                    <h3>safeMint</h3>
                        <div className="my-3 px-5">
                            <input
                                type="text"
                                name="addr"
                                className="p-3 addtest_input"
                                placeholder="to: (address)"
                            />
                        </div>

                        <div>
                        <button
                            type="submit"
                            className="submit-button mb-3 py-3 px-5 btn_mod">
                            Transact
                        </button>
                    </div>
                </div>
            </form>

        <div className='con_sub con_radius box_contractinfo px-5 mb-5 row'>
            <div className="col-sm-3 box_contractinfo_label" >Output</div>
            <div className="col-sm-9" >Output</div>
        </div>

        </div>
    );
}

export default DisplayInfo;