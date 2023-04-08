import React, {useState} from 'react'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';

//
let account;

const SafeMint = () => {

    const [balance, setBalance] = useState(' ');

    const mintERC721 = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        console.log("account is " + account);
        if(await contract.methods.safeMint(account).send({from: account})){
            console.log("Minting successful");
           
        }

        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);
        console.log("Balance = " + balance);

    }

    return(
        <div>
            <form className="mx-4 mt-4">
                <div className="d-flex justify-content-center flex-column">
                    <h3>safeMint</h3>
                        <div className="my-3 px-5">
                            <input type="text" name="addr" className="p-3 addtest_input" placeholder="to: (address)"/>
                        </div>
                        <div>
                        <button type="button" onClick={mintERC721} className="submit-button mb-3 py-3 px-5 btn_mod"> Transact </button>
                    </div>
                </div>
            </form>

        <div className='con_sub con_radius box_contractinfo px-5 mb-5 row'>
            <div className="col-sm-3 box_contractinfo_label"> Output </div>
            <div className="col-sm-9"> {balance} contracts </div>
        </div>

        </div>
    );
}

export default SafeMint;