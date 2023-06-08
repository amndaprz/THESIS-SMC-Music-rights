import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'

import Button from 'react-bootstrap/Button';

import AddCommercialContract from './AddCommercialContract';
import AddStreamingContract from './AddStreamingContract';
import ViewListedSongs from './ViewListedSongs';
import CommercialContracts from './CommercialContracts';
import StreamingContracts from './StreamingContracts';
import ViewContractProposals from './ViewContractProposals';
import Payout from './Payout';

import { Link } from "react-router-dom";

import {FaFileContract, FaMoneyCheck, FaMusic, FaPlus, FaSignature } from "react-icons/fa";
import {contractAddress, contractABI, web3, contract, contract_RA} from '../../ContractProperties';

document.body.style.background = "#232226";
let account;

function Label() {

    
    const [name, setUserName] = useState("");
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [toggleState2, setToggleState2] = useState(1);

    const toggleTab2 = (index) => {
        setToggleState2(index);
    };

    const [toggleState3, setToggleState3] = useState(1);

    const toggleTab3 = (index) => {
        setToggleState3(index);
    };

    const [loading, setLoading] = useState(true);
    
    
    //Window.onload = getUserName();
    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
            
        }, 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);

    
    const getUserName = async() => {
        //window.location.reload();
        //Window.location.reload();
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];
        console.log("ACCOUNT" + account);

        let result = await contract_RA.methods.getAlias(account).call();
        // if(result === ""){
        //     window.location.reload();
        // }
        console.log("RESULT" + result);
        setUserName(result);
    }
    

    /*
    useEffect(() => {
        // declare the async data fetching function
        const getUserName = async () => {
          const accounts = await web3.eth.requestAccounts();
          account = accounts[0];
          console.log("ACCOUNT" + account);
  
          let result = await contract_RA.methods.getAlias(account).call();
          console.log("RESULT" + result);
          setUserName(result);
        }
      
        // call the function
        getUserName()
          // make sure to catch any error
          .catch(console.error);;
      }, [])
      */

    //const [data, setData] = useState(null);
    /*
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function getUserName() {
            setIsLoading(true);
            try {
                const accounts = await web3.eth.requestAccounts();
                account = accounts[0];
                console.log("ACCOUNT" + account);
                window.location.reload();
                let result = await contract_RA.methods.getAlias(account).call();
                console.log("RESULT" + result);
                setUserName(result);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        getUserName();
    }, []);
    */
        return (
            <div onLoad={getUserName}>
                <div className="row p-0 m-0 card_con">
    
                    <div className="col-sm-2 p-0 m-0 nav_con">
                        {loading ? (
                            <ContentLoader
                                width={450}
                                height={1000}
                                speed={2}
                                backgroundColor={'#383447'}
                                foregroundColor={'#2B2833'}
                            >
                                <rect x="50" y="70" rx="5" ry="5" width="220" height="12" />
                                <rect x="50" y="102" rx="5" ry="5" width="220" height="12" />
                                <rect x="40" y="300" rx="5" ry="5" width="270" height="50" />
                                <rect x="40" y="370" rx="5" ry="5" width="270" height="50" />
                                <rect x="40" y="440" rx="5" ry="5" width="270" height="50" />
                                <rect x="40" y="510" rx="5" ry="5" width="270" height="50" />
                                <rect x="40" y="580" rx="5" ry="5" width="270" height="50" />
                            </ContentLoader>
                        ) : (
                            <>
                                <div className="px-4 pt-5 pb-3 user_con">
                                    <img src="../tina_logo.png" alt="logo" className="mt-3 logo_tab" />
                                    <h2 className="mx-4 mt-5 client_name">{name}</h2>
                                    <h5 className="mx-4 text_sub">Role name</h5>
                                </div>
                            
                                <div className="nav_btn_con">
                                    <Button
                                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(1)}>
                                        <FaPlus className='mx-3'/>Add contract
                                    </Button>
    
                                    <Button
                                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(2)}>
                                        <FaMusic className='mx-3'/>View listed songs
                                    </Button>
    
                                    <Button
                                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(3)}>
                                        <FaFileContract className='mx-3'/>View contracts
                                    </Button>
    
                                    <Button
                                        className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(4)}>
                                        <FaMoneyCheck className='mx-3'/>Payout
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
    
                    <div className="col-sm-10 py-5  m-0 content_con">
                        {loading ? (
                            <ContentLoader
                                width={1500}
                                height={1000}
                                speed={2}
                                backgroundColor={'#383447'}
                                foregroundColor={'#2B2833'}
                            >
                                <rect x="620" y="40" rx="5" ry="5" width="270" height="12" />
                                <rect x="595" y="130" rx="5" ry="5" width="320" height="12" />
                                <rect x="595" y="162" rx="5" ry="5" width="140" height="30" />
                                <rect x="775" y="162" rx="5" ry="5" width="140" height="30" />
                                <rect x="490" y="300" rx="5" ry="5" width="550" height="50" />
                                <rect x="490" y="370" rx="5" ry="5" width="550" height="50" />
                                <rect x="490" y="440" rx="5" ry="5" width="550" height="50" />
                                <rect x="490" y="510" rx="5" ry="5" width="550" height="50" />
                                <rect x="490" y="580" rx="5" ry="5" width="550" height="50" />
                                <rect x="490" y="650" rx="5" ry="5" width="550" height="50" />
                                <rect x="490" y="720" rx="5" ry="5" width="550" height="50" />
    
                            </ContentLoader>
                        ) : (
                            <>
                                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                    <h1>Add contract</h1>
                                    <div className=" mt-5 mb-4">Choose a contract type below:</div>
                                    <div className="row">
                                        <div className="col">
                                            <Button
                                                className={toggleState2 === 1 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                                onClick={() => toggleTab2(1)}>
                                                Commercial
                                            </Button>
                                        </div>
                                        <div className="col">
                                            <Button
                                                className={toggleState2 === 2 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                                onClick={() => toggleTab2(2)}>
                                                Streaming
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={toggleState2 === 1 ? "content  active-content" : "content"}>
                                        <AddCommercialContract />
                                    </div>
                                    <div className={toggleState2 === 2 ? "content  active-content" : "content"}>
                                        <AddStreamingContract />
                                    </div>
    
                                </div>
    
                                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                    <h1>View listed songs</h1>
                                    <ViewListedSongs />
                                </div>
    
                                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                                    <h1>View contracts</h1>
                                    {/*<CommercialContracts />*/}
                                    <div className=" mt-5 mb-4">Choose a contract type below:</div>
                                    <div className="row">
                                        <div className="col">
                                            <Button
                                                className={toggleState3 === 1 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                                onClick={() => toggleTab3(1)}>
                                                Commercial
                                            </Button>
                                        </div>
                                        <div className="col">
                                            <Button
                                                className={toggleState3 === 2 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                                onClick={() => toggleTab3(2)}>
                                                Streaming
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={toggleState3 === 1 ? "content  active-content" : "content"}>
                                        <CommercialContracts />
                                    </div>
                                    <div className={toggleState3 === 2 ? "content  active-content" : "content"}>
                                        <StreamingContracts />
                                    </div>
                                </div>
    
                                <div className={toggleState === 4 ? "content  active-content" : "content"}>
                                    <h1>Payout</h1>
                                    <Payout />
                                </div>
                            </>
                        )}
    
                    </div>
    
                </div>
    
    
    
            </div>
        );
    
    
}

export default Label;