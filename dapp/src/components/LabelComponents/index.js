import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'
import Button from 'react-bootstrap/Button';
import AddCommercialContract from './LabelAddCommercial';
import AddStreamingContract from './LabelAddStreaming';
import ViewListedSongs from './LabelListedSongs';
import CommercialContracts from './LabelCommercialSold';
import StreamingContracts from './LabelStreamingSold';

import {useNavigate } from "react-router-dom";

import {FaFileContract, FaMusic, FaPlus } from "react-icons/fa";
import {web3,web3_RA, contract_RA} from '../../ContractProperties';

document.body.style.background = "#232226";
let account;
let role;
function Label() {

    const navigate = useNavigate();

    const[userRole, setUserRole] = useState("")
    

    window.ethereum.on("accountsChanged", () => {
        window.location.reload();
        //getRole();
      });

    const getRole = async() => {
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];
        role = await contract_RA.methods.getRole(account).call();
        
        setUserRole(role);
        console.log("User Role " + role);
        
        switch(role){
            case '1': navigate("../Label"); break;
            case '2': navigate("../Artist"); break;
            case '3': navigate("../Client"); break;
            case '4': navigate('../Stream'); break;
            default: navigate('../'); break;
        }
        
    };
    if(role === ""){
        window.location.reload();
    }

    const [roleString, setRoleString] = useState("Role");
        
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
    
    
    useEffect(() => {
        getRole();
        const fetchData = async () => {
          const t = setTimeout(() => {
            setLoading(false);
          }, 3000);
      
          getUserName();
          return () => {
            clearTimeout(t);
          };
        };
        fetchData();
      }, []);

    
    const getUserName = async() => {
        //window.location.reload();
        //Window.location.reload();
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];
        console.log("ACCOUNT" + account);

        let result = await contract_RA.methods.getAlias(account).call();
        if(result === ""){
            window.location.reload();
        }
        console.log("RESULT" + result);
        setUserName(result);
        
    }
    
        return (
            <div onLoad={getRole}>

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
                                    <img src="../ritmo_logo.png" alt="logo" className="mt-3 logo_tab" />
                                    <h2 className="mx-4 mt-5 client_name">{name}</h2>
                                    <h5 className="mx-4 text_sub">Label</h5>
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
                                        <FaFileContract className='mx-3'/>View sold
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
                                                className={toggleState2 === 1 ? "tabs_contract atabs_contract py-3 px-5 " : " tabs_contract py-3 px-5"}
                                                onClick={() => toggleTab2(1)}>
                                                Commercial
                                            </Button>
                                        </div>
                                        <div className="col">
                                            <Button
                                                className={toggleState2 === 2 ? "tabs_contract atabs_contract py-3 px-5" : " tabs_contract  py-3 px-5"}
                                                onClick={() => toggleTab2(2)}>
                                                Streaming
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={toggleState2 === 1 ? "content  active-content" : "content"}>
                                        <AddCommercialContract user = {name}/>
                                    </div>
                                    <div className={toggleState2 === 2 ? "content  active-content" : "content"}>
                                        <AddStreamingContract user = {name}/>
                                    </div>
    
                                </div>
    
                                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                    <h1>View listed songs</h1>
                                    <ViewListedSongs />
                                </div>
    
                                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                                    <h1>View sold</h1>
                                    {/*<CommercialContracts />*/}
                                    <div className=" mt-5 mb-4">Choose a contract type below:</div>
                                    <div className="row">
                                        <div className="col">
                                            <Button
                                                className={toggleState3 === 1 ? "tabs_contract atabs_contract py-3 px-5" : " tabs_contract  py-3 px-5"}
                                                onClick={() => toggleTab3(1)}>
                                                Commercial
                                            </Button>
                                        </div>
                                        <div className="col">
                                            <Button
                                                className={toggleState3 === 2 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5 "}
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
                            </>
                        )}
    
                    </div>
    
                </div>
    
    
    
            </div>
        );
    
    
}

export default Label;