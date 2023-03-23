import React, {useState} from 'react'
import ERC721 from '../../erc721ABI.json';
import Web3 from "web3";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';

//
let account;

const accounts2 = web3.eth.requestAccounts();



const SafeMint = () => {

    const [balance, setBalance] = useState(' ');
    const [percentLabel, setPLabel] = useState('');
    const [percentArtist, setPArtist] = useState('');
    const [addrLabel, setAddrLabel] = useState('');
    const [addrArtist, setAddrArtist] = useState('');

    // Input listener for Label Address
    const handleAddrLabel = (event) => {
        setAddrLabel(event.target.value);
    }

    // Input listener for Artist Address
    const handleAddrArtist = (event) => {
        setAddrArtist(event.target.value);
    }

    // Input listener for Label Percentage
    const handlePLabel = (event) => {
        setPLabel(event.target.value);
    }

    // Input listener for Label Artist
    const handlePArtist = (event) => {
        setPArtist(event.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();

        mintERC721();

        console.log('From address:', addrLabel);
        console.log('Label %:', percentLabel);

        console.log('To address:', addrArtist);
        console.log('Artist %:', percentArtist);

    }

    // Minting -----------
    const mintERC721 = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        setAddrLabel(account);

        if(await contract.methods.safeMint(account).send({from: account})){
            console.log("Minting successful");
        }

        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);
        console.log("Balance = " + balance);

    }

    return(
        <div>
            <div className="">
                <br></br>
                <h2>SafeMint</h2>
            </div>
                <div>
                    <form className="m-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column justify-content-center">
                            <div className="my-3">
                                {/* <input type="text" name="addr" className="my-3 p-3 readtest_input" placeholder="Enter address of label" value={''} readOnly={true} /> */}
                                <input type="text" name="addr" className="my-3 p-3 readtest_input" placeholder="Enter percent label" value={percentLabel} onChange={handlePLabel}/>

                                <input type="text" name="addr" className="my-3 p-3 readtest_input" placeholder="Enter address of artist" value={addrArtist} onChange={handleAddrArtist}/>
                                <input type="text" name="addr" className="my-3 p-3 readtest_input" placeholder="Enter percent artist" value={percentArtist} onChange={handlePArtist}/>

                                <select className='my-3 p-3 readtest_input'>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Streaming">Streaming</option>
                                </select>
                            </div>
                            
                            <div>
                                <button type="submit" className="submit-button mb-3 py-3 px-5 btn_mod"> Transact (Inputs REQUIRED)</button>
                                <br></br>
                                <button type="button" onClick={mintERC721} className="submit-button mb-3 py-3 px-5 btn_mod"> Transact (Inputs NOT REQUIRED)</button>
                            </div>
                           
                        </div>
                    </form>
                </div>
        </div>
    );

    
}

export default SafeMint;