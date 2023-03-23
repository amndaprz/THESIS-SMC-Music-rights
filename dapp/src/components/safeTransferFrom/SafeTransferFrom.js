import React, {useState} from 'react'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';
//import ipfs from './ipfs';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

let account;

// Textbox input reading
// let from = document.getElementByID("STF_from");
// let to = document.getElementByID("STF_to");
// let tkid = document.getElementByID("STF_tkid");

// const ipfs = create({
//     host: 'ipfs.infura.io',
//     port: 3000,
//     protocol: 'https'
//   })

const SafeTransferFrom = () => {

    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [stf_tkID, setTokenID] = useState('');
    const [balance, setBalance] = useState(' ');

    const ipfsClient = async() => {
        const projectId = '2NOlVoXpecazym067i0JgqK0UzU';
        const projectSecret = '208442d6bd98466af54320034f4d6087';
        const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        const ipfs = create({
            host: 'infura-ipfs.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
            
        })

        return ipfs;
    }

    const saveInput = async(address) => {
        let ipfs = await ipfsClient();

        let result = await ipfs.add(address);
        console.log(result);
    }

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
        console.log('From address:', fromAddress);
        console.log('To address:', toAddress);
        console.log('TokenID:', stf_tkID);

        saveInput(fromAddress);

        // ipfs.add(fromAddress, (error, result) => {
        //     console.log('ipfs results', result)
        //     if(error){
        //         console.error(error)
        //         return
        //     }
        // })
        // ipfs.files.add(fromAddress, (error, result) => {
        //     if(error){
        //         console.error(error);
        //         return
        //     }

        //     console.log(result[0].hash);

        // })
      }


    const safeTransferFrom = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        console.log("account is " );
        console.log("sending token id " );
        if(await contract.methods.safeTransferFrom().send()){
            console.log("Minting successful");
            console.log("Balance = " + contract.methods.balanceOf(account));
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
                        <button type="submit" className="submit-button mb-3 py-3 px-5 btn_mod"> Transact </button>
                    </div>
                </div>
            </form>

            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label">Address {fromAddress} balance {displayBalance}{balance}</div>
                <div className="col-sm-9"></div>
            </div>
            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label" >Output</div>
                <div className="col-sm-9" >Output</div>
            </div>
            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label" >Output</div>
                <div className="col-sm-9" >Output</div>
            </div>

        </div>
    );
}

export default SafeTransferFrom;