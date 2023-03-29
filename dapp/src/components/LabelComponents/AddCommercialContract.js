import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ConfirmAddContract from "../Modals/ConfirmAddContract";
import SafeMintLabel from "../safeMint/SafeMintLabel"
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import {utils} from 'web3';
import ipfs from "./../IPFSComponents/ConnectIPFS"

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
    const [addrLabel, setAddrLabel] = useState('');
    const [addrArtist, setAddrArtist] = useState('');
    const [totalFee, setTotalFee] = useState('');
    const [songTitle, setSongTitle] = useState('');

    // Input listener for Label Address
    const handleAddrLabel = (event) => { setAddrLabel(event.target.value); }

    // Input listener for Artist Address
    const handleAddrArtist = (event) => { setAddrArtist(event.target.value);}

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


    // Minting 
    // Generates IPFS hash
    const mintERC721 = async() => {
        // Check for missing fields
        
        // Check Percentage Count
        console.log("ValidPercentage Total: " + isValidPercentage(percentLabel, percentArtist));
        
        // Request for metamask account
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        // Set Address to useState
        setAddrLabel(account);
        
        // Check if Sender address is valid
        console.log("IsSenderValid: "+ isSenderValid(addrLabel,account));

        // Check if Artist Address is Valid
        console.log(addrArtist);
        //const isArtistValid  = await isReceiverValid(addrArtist);
        //console.log("isReceiverValid: "+ isArtistValid);

        const MRC = {
            song_title: songTitle,
            percent_label: parseInt(percentLabel),
            percent_artist: parseInt(percentArtist),
            label_address: addrLabel,
            artist_address: addrArtist,
            total_fee: parseFloat(totalFee),
        };

        console.log(MRC);

        let mrcResult = await saveInput(MRC);

        console.log(mrcResult);
        
        // Add Checker if all prereqs are satisfied
        console.log(account);
        if(await contract.methods.safeMintWithHash(mrcResult).send({from: account, gas: 6000000, sender: account })){
            console.log("Minting successful");
        }

        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);
        console.log("Balance = " + balance);


        // Checkers
        console.log('From address:', addrLabel);
        console.log('Label %:', percentLabel);
        console.log('To address:', addrArtist);
        console.log('Artist %:', percentArtist);

        //return mrcResult;

    }

    return(
        <form className="m-4" onSubmit="">
            <ConfirmAddContract
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="my-3 input_con">
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter song title :
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" alue={songTitle} onChange={handleSongTitle}/>
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter percent label :
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={percentLabel} onChange={handlePLabel}                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter percent artist :
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={percentArtist} onChange={handlePArtist} />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter total fee :
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={totalFee} onChange={handleTotalFee}/>
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Creation date :
                        <input type="date" name="addr" disabled="true" className="inputfield_contract" defaultValue={date} />
                    </p>
                </div>

                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter address of label :
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={addrLabel} onChange={handleAddrLabel} />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter address of artist :
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={addrArtist} onChange={handleAddrArtist}/>
                    </p>
                </div>
          
                <div className="py-4">
                    <Button
                        className="submit-button py-3 px-5 btn_mod"
                        // onClick={() => setModalShow(true)}>
                        onClick={mintERC721}>
                        Add contract
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddCommercialContract;