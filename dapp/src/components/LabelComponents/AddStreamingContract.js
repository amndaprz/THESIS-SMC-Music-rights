import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ConfirmAddContract from "../Modals/ConfirmAddContract";

import {FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {contractAddress_Stream, contractABI_Stream, web3_Stream, contract_Stream} from '../../ContractProperties';

import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import 'react-toastify/dist/ReactToastify.css';

function AddStreamingContract(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    const [modalShow, setModalShow] = React.useState(false);

    const [songTitle, setSongTitle] = useState('');
    const [percentLabel, setPLabel] = useState('');
    const [percentArtist, setPArtist] = useState('');
    const [labelName, setLabelName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [totalFee, setTotalFee] = useState('');

    const handleSongTitle = (event) => { setSongTitle(event.target.value);} // Input Song Title

    // Input listener for Label Address
    const handleNameLabel = (event) => { 
        const value = event.target.value;
        const regexUsername = /^[a-zA-Z0-9]*$/;

        if (regexUsername.test(value) || value === '')  setLabelName(event.target.value);
    }
    
    // Input listener for Artist Address
    const handleNameArtist = (event) => {
        const value = event.target.value;
        const regexUsername = /^[a-zA-Z0-9]*$/;
        
        if (regexUsername.test(value) || value === '') setArtistName(event.target.value);
    }     

    // Input listener for Label Percentage
    const handlePLabel = (event) => { 
        const value = event.target.value;
        const regex = /^(?:100|[1-9][0-9]?|0)$/; // Number only from 0-100

        if (regex.test(value) || value === '') { setPLabel(value);}
    }    

    // Input listener for Label Artist
    const handlePArtist = (event) => { 
        const value = event.target.value;
        const regex = /^(?:100|[1-9][0-9]?|0)$/; // Number only from 0-100

        if (regex.test(value) || value === '') { setPArtist(value);}
    }    

    // Input Total Fee
    const handleTotalFee = (event) => { 
        const value = event.target.value;
        const regexFee = /^\d*\.?\d*$/;
        
        if (regexFee.test(value) || value === '') { setTotalFee(value); }else console.log("ERROR");
    }  

    // Error Handlers
    const [error_title, setErrorTitle] = useState('');
    const [error_PLabel, setErrorPLabel] = useState('');
    const [error_PArtist, setErrorPArtist] = useState('');
    

    // Error States
    const [error_title_state, setErrorTitleState] = useState(0);
    const [error_PLabel_state, setErrorPercentLabelState] = useState(0);
    const [error_PArtist_state, setErrorPercentArtistState] = useState(0);


    const clearStates = () => {
        setErrorTitleState(0);
        setErrorPercentLabelState(0);
        setErrorPercentArtistState(0);
    };

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

    const mintERC721_Stream = async() => {
        // Check if percentages add up to 100
        const total = parseInt(percentLabel) + parseInt(percentArtist);
        let error = false;
        try{
            /*
                    Field Checkers
            */
                
            // Case 1: Percentages do NOT add to 100
            if(total != 100){          
                setErrorPArtist("!! Invalid Percentage Split !!  Must total to 100");
                setErrorPLabel("!! Invalid Percentage Split !!  Must total to 100");

                setErrorPercentLabelState(1);
                setErrorPercentArtistState(1);
                // throw new Error("!! Invalid Percentage Split !!  Must total to 100");
                error = true;
            }
            
            // Case 2: Song Title Cannot be Empty
            if(songTitle === ""){ 
                setErrorTitle("song_title is empty");
                setErrorTitleState(1);
                // throw new Error("!! Song Title is Empty !!");
                error = true;
            }               
                

            // If an Error with the Cases above has occurred, return an error and cancel the try-catch
            if(error){
                throw new Error("Invalid Inputs");
            }
                /*
                    Store these in IPFS
                */
                console.log("Song Title: " + songTitle);
                console.log("Percent Label: " + percentLabel);
                console.log("Percent Artist: " + percentArtist);
                console.log("Label Name: " + labelName);
                console.log("Artist Name: " + artistName);
                console.log("Total Fee: " + totalFee);
                
                const accounts = await web3_Stream.eth.requestAccounts();
                const account = accounts[0];
        
                clearStates();
                // Mint Streaming Contract Here + IPFS
                // if(await contract_Stream.methods.addStream().send({from:account, gas: 6000000, sender:account})){
                //     console.log("Initial contract minting successful");
                // }

                let tokenID = await contract_Stream.methods.getStreamLength().call();

            tokenID = parseInt(tokenID) + 1;

            const MRC = {
                token_id: tokenID,
                song_title: songTitle,
                artist_name: artistName,
                label_name: labelName,
                percent_label: parseInt(percentLabel),
                percent_artist: parseInt(percentArtist),
                total_fee: parseFloat(totalFee),
                creation_date: date //Do we still need this?
            };


            // const users = await contract_RA.methods.getUsers().call();
            // console.log(users);

            notify();

            console.log(MRC.song_title);
            console.log(MRC);

            let mrcResult = await saveInput(MRC);

            console.log(mrcResult);
            
            if(await contract_Stream.methods.addStream(mrcResult).send({from:account, sender:account})){
                console.log("Stream contract creation successful");
            }

            // const balance = await contract.methods.balanceOf(account).call();
            // setBalance(balance);
            // console.log("Balance = " + balance);

            return mrcResult;
            
        }catch(e){
            // Error Message
            console.log(e.message);
        }
    };

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
                    <span className='mx-3 my-2'>Percent of Label</span>
                    {
                        error_PLabel_state === 1 && 
                            <span className="mx-2 error_contract"><FaExclamationTriangle /> {error_PLabel}</span>
                    }
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={percentLabel} onChange={handlePLabel} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Percent of Artist</span>
                    {
                        error_PArtist_state === 1 && 
                            <span className="mx-2 error_contract"><FaExclamationTriangle /> {error_PArtist}</span>
                        
                    }
                    <p className="text_sub p-0 mt-2">
                    <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={percentArtist} onChange={handlePArtist}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Creation Date</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="date" name="addr" disabled="true" className="inputfield_contract" defaultValue={date} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>End Date</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="date" name="addr" disabled="true" className="inputfield_contract" defaultValue={date} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Label Name</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={labelName} onChange={handleNameLabel}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Artist Name</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={artistName} onChange={handleNameArtist}/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Total Fee per Stream</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value={totalFee} onChange={handleTotalFee}/>
                    </p>
                </div>
               
          
                <div className="py-4">
                    <Button
                        className="submit-button py-3 px-5 btn_mod"
                        // onClick={() => setModalShow(true)}>
                        onClick={mintERC721_Stream}>
                        Add contract
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddStreamingContract;