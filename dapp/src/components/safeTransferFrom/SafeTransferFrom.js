import React, {useState} from 'react'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';
import {utils} from 'web3';


let account;

// Textbox input reading
// let from = document.getElementByID("STF_from");
// let to = document.getElementByID("STF_to");
// let tkid = document.getElementByID("STF_tkid");


const SafeTransferFrom = () => {

    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [stf_tkID, setTokenID] = useState('');
    const [balance, setBalance] = useState(' ');

    const handleFromChange = (event) => {
        setFromAddress(event.target.value);
    }
    
    const handleToChange = (event) => {
        setToAddress(event.target.value);
    }
    
    const handleTokenID = (event) => {
        setTokenID(event.target.value);
    }
    
    const handleSubmit = (event) => {


        event.preventDefault();

        if (!utils.isAddress(toAddress)) {
            console.error("Invalid Ethereum address");
            return;
        }else {
            console.log("HEEERERERERE");
      
        
            safeTransferFromFunction();
            console.log('From address:', fromAddress);
            console.log('To address:', toAddress);
            console.log('TokenID:', stf_tkID); 
        }
    }


    const safeTransferFromFunction = async() => {
        
        const accounts = await web3.eth.requestAccounts();
		const fromAddress = accounts[0];

        setFromAddress(fromAddress);
        console.log("Balance of Sender = " + fromAddress);
         

        if(await contract.methods.safeTransferFrom(fromAddress,toAddress,stf_tkID).send({from: fromAddress})){
            // // const receiverBal = await contract.methods.balanceOf.call(toAddress);


            // console.log("Balance of Sender = " + senderBal);
            // console.log("Balance of Reciever  = " + receiverBal);
            console.log("Transfer completed");
            const senderBal = await contract.methods.balanceOf(fromAddress).call();
            console.log("New Balance : " + senderBal);


        }

    }

    const displayBalance = async(addressFrom) => {
		const balance = await contract.methods.balanceOf(addressFrom).call();
        setBalance(balance);
        console.log("Balance = " + balance);
	}


    return(
        <div>
            <form className="mx-4 mt-5" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center flex-column">
                    <h3>safeTransferFrom</h3>
                    <div className="my-3 px-5">
                        <input type="text" name="STF_from" className="p-3 my-2 addtest_input" placeholder= "from: (address)" value={fromAddress} onChange={handleFromChange}/>
                        <input type="text" name="STF_to" className="p-3 my-2 addtest_input" placeholder= "to: (address)" value={toAddress} onChange={handleToChange}/>
                        <input type="text" name="STF_tkid" className="p-3 my-2 addtest_input" placeholder="token ID:" value={stf_tkID} onChange={handleTokenID}/>
                    </div>

                    <div>
                        <button type="submit" className="submit-button mb-3 py-3 px-5 btn_mod" > Transact </button>
                    </div>
                </div>
            </form>

            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label">From: </div>
                <div className="col-sm-9">{fromAddress}</div>
            </div>
            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label" >To:</div>
                <div className="col-sm-9" >{toAddress}</div>
            </div>
            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label" >Token ID:</div>
                <div className="col-sm-9" >{stf_tkID}</div>
            </div>

        </div>
    );
}

export default SafeTransferFrom;