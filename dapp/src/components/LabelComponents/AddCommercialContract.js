import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ConfirmAddContract from "../Modals/ConfirmAddContract";
import SafeMintLabel from "../safeMint/SafeMintLabel"
import {contractAddress, contractABI, web3, contract, contract_RA} from '../../ContractProperties';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import {utils} from 'web3';
import ipfs from "./../IPFSComponents/ConnectIPFS"

import {FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let account;

function AddCommercialContract(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    const [modalShow, setModalShow] = React.useState(false);

    // Safe Mint (Replace with SafeMintLabel.js) 
    // File Path -- components > safeMint > SafeMintLabel.js
    const [balance, setBalance] = useState('');
    const [percentLabel, setPLabel] = useState('');
    const [percentArtist, setPArtist] = useState('');
    const [labelName, setLabelName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [totalFee, setTotalFee] = useState('');
    const [songTitle, setSongTitle] = useState('');

    // Input listener for Label Address
    const handleNameLabel = (event) => { setLabelName(event.target.value); }

    // Input listener for Artist Address
    const handleNameArtist = (event) => { setArtistName(event.target.value);}

    // Input listener for Label Percentage
    const handlePLabel = (event) => { setPLabel(event.target.value); }

    // Input listener for Label Artist
    const handlePArtist = (event) => { setPArtist(event.target.value);}

    const handleTotalFee = (event) => { setTotalFee(event.target.value);} 

    const handleSongTitle = (event) => { setSongTitle(event.target.value);}

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     mintERC721();

        // console.log('From address:', addrLabel);
        // console.log('Label %:', percentLabel);
        // console.log('To address:', addrArtist);
        // console.log('Artist %:', percentArtist);
    // }

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

    const saveInput = async(MRC) => {
        let ipfs = await ipfsClient();
        let mrcToString = Buffer.from(JSON.stringify(MRC));
        let result = await ipfs.add(mrcToString);
        //console.log(address);
        console.log(result);

        return result.path;
    }


    // Checkers 
    const isValidPercentage = (pLabel, pArtist) => {
        const LabelCut = parseInt(pLabel);
        const ArtistCut = parseInt(pArtist);

        if((LabelCut + ArtistCut) == 100){
            return true
        }else return false;

    };

    const isSenderValid = (addressInput, addressMetamask) => {
        // Is the address given same as the one in metamask
        const confirmAddr = addressInput === addressMetamask
        return confirmAddr;
        // Check if role fits this contract function
        
    };

    // const isReceiverValid = (addressArtist) => {
    //     return contract.methods._isArtist(addressArtist).call()
    //       .then((isArtist) => {
    //         console.log( isArtist);
    //         return isArtist;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };;

    // Error test

    const [errors, setErrors] = useState({})
    //var error_message = "Error 1";
    const [error_title, setErrorTitle] = useState('');
    const [error_title_state, setErrorTitleState] = useState(0);
    const [error_percentlabel, setErrorPercentLabel] = useState('');
    const [error_percentlabel_state, setErrorPercentLabelState] = useState(0);

    // Minting 
    // Generates IPFS hash
    const mintERC721 = async() => {
        //setErrors(Validation(songTitle));
        // Check for missing fields
        
        // Check Percentage Count
        console.log("ValidPercentage Total: " + isValidPercentage(percentLabel, percentArtist));
        
        // Request for metamask account
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        // Set Address to useState
        //setAddrLabel(account);
        
        // Check if Sender address is valid
        //console.log("IsSenderValid: "+ isSenderValid(addrLabel,account));

        // Check if Artist Address is Valid
        //console.log(addrArtist);
        //const isArtistValid  = await isReceiverValid(addrArtist);
        //console.log("isReceiverValid: "+ isArtistValid);

        // temp
    

        //setArtistName(artist_name);
        //setLabelName(label_name);
        // find label name

        const MRC = {
            song_title: songTitle,
            artist_name: artistName,
            label_name: labelName,
            percent_label: parseInt(percentLabel),
            percent_artist: parseInt(percentArtist),
            total_fee: parseFloat(totalFee),
        };

        //setErrors(Validation(MRC));

        if(MRC.song_title === ""){
            setErrorTitle("song_title is empty");
            setErrorTitleState(1);
        }
        else{
            setErrorTitleState(0);
        }

        if(percentLabel === ""){
            setErrorPercentLabel("percent_label is empty");
            console.log("percent_label is empty")
            setErrorPercentLabelState(1);
        }
        else{
            setErrorPercentLabelState(0);
            console.log("percent_label is not empty")
            console.log("percent_label is = %", MRC.percent_label)
        }

        const users = await contract_RA.methods.getUsers().call();

        console.log(users);

        toast("Notify");

        console.log(MRC.song_title);

        console.log(MRC);

        let mrcResult = await saveInput(MRC);

        console.log(mrcResult);
        
        // Add Checker if all prereqs are satisfied
        //console.log(account);
        // if(await contract.methods.safeMintWithHash(mrcResult).send({from: account, gas: 6000000, sender: account })){
        //     console.log("Minting successful");
        // }

        if(await contract.methods.nonMint(mrcResult).call()){
            console.log("Initial contract minting successful");
        }

        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);
        console.log("Balance = " + balance);


        // Checkers
        // console.log('From address:', addrLabel);
        // console.log('Label %:', percentLabel);
        // console.log('To address:', addrArtist);
        // console.log('Artist %:', percentArtist);

        return mrcResult;

    }

    const notify = () => {
        toast("Notify");
    }

    

    return(
        <form className="m-4" onSubmit="">
            <ConfirmAddContract
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ToastContainer
                    theme="dark"
                    closeOnClick={true}
                    autoClose={2000}
                />
            <div className="input_con">
                <div className="mb-3">
                    <span className='mx-3 my-2'>Song Title</span>
                    {
                        error_title_state === 1 && 
                            <span className="mx-2 error_contract"><FaExclamationTriangle /> {error_title}</span>
                        
                    }
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={songTitle} onChange={handleSongTitle}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Name of Label</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={labelName} onChange={handleNameLabel} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Name of Artist</span>
                    <p className="text_sub p-0 mt-2">
                    <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={artistName} onChange={handleNameArtist}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Percent of Label</span>
                    {
                        error_percentlabel_state === 1 && 
                            <span className="mx-2 error_contract"><FaExclamationTriangle /> {error_percentlabel}</span>
                        
                    }
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={percentLabel} onChange={handlePLabel}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Percent of Artist</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={percentArtist} onChange={handlePArtist} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Total Fee</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={totalFee} onChange={handleTotalFee}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Creation Date</span>
                    <p className="text_sub p-0 mt-2">
                    <input type="date" name="addr" disabled="true" className="inputfield_contract" defaultValue={date} />
                    </p>
                </div>
               
          
                <div className="py-4">
                    <Button
                        className="submit-button py-3 px-5 btn_mod"
                        // onClick={() => setModalShow(true)}>
                        onClick={mintERC721}>
                        Add contract
                    </Button>
                    <Button
                        className="submit-button py-3 px-5 btn_mod"
                        // onClick={() => setModalShow(true)}>
                        onClick={notify}>
                        Add contract
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddCommercialContract;