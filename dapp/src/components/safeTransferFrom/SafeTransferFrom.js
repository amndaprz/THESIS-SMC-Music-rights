import React, {useState} from 'react'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';


let account;

// Textbox input reading
// let from = document.getElementByID("STF_from");
// let to = document.getElementByID("STF_to");
// let tkid = document.getElementByID("STF_tkid");



const SafeTransferFrom = () => {

    const safeTransferFrom = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        console.log("account is " );
        console.log("sending token id " );
        if(await contract.methods.safeMint(account)){
            console.log("Minting successful");
            console.log("Balance = " + contract.methods.balanceOf(account));
        }
    }

    return(
        <div>
            <form className="mx-4 mt-5" onSubmit="">
                <div className="d-flex justify-content-center flex-column">
                    <h3>safeTransferFrom</h3>
                    <div className="my-3 px-5">
                        <input type="text" name="addr" id="STF_from" className="p-3 my-2 addtest_input" placeholder="from: (address)"/>
                        <input type="text" name="addr" id="STF_to" className="p-3 my-2 addtest_input" placeholder="to: (address)"/>
                        <input type="text" name="addr" id="STF_tkid" className="p-3 my-2 addtest_input" placeholder="token ID:"/>
                    </div>

                    <div>
                        <button type="button" className="submit-button mb-3 py-3 px-5 btn_mod" onClick={safeTransferFrom}> Transact </button>
                    </div>
                </div>
            </form>

            <div className='con_sub con_radius box_contractinfo px-5 mb-3 row'>
                <div className="col-sm-3 box_contractinfo_label" >Output</div>
                <div className="col-sm-9" >Output</div>
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