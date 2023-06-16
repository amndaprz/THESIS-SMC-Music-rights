import React, { useEffect, useState } from 'react';
import {contractAddress, contractABI, web3,web3_RA, contract, contract_RA} from '../../ContractProperties';

import Button from 'react-bootstrap/Button';

import ViewListedSongs from './ViewListedSongs';
import CommercialContracts from './CommercialContracts';
import StreamingContracts from './StreamingContracts';
import StreamingProposals from './StreamingProposals';
import CommercialProposals from './CommercialProposals';

import ContentLoader from 'react-content-loader'
import { Link } from "react-router-dom";
import { FaFileContract, FaMoneyCheck, FaMusic, FaSignature } from 'react-icons/fa';

document.body.style.background = "#232226";

function Artist() {

    const getRole = async () => {
        const getUsersList = await contract_RA.methods.getUsers().call();
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];
        let userRole;

        console.log(getUsersList);
        for(let i = 0; i < getUsersList.length; i++){
            if(getUsersList[i][0] === account){
                 userRole = getUsersList[i][2];
                 console.log(getUsersList[i][2]);
                 console.log("User Role " + userRole);
            }
        }
        // console.log(typeof(userRole));
        userRole = parseInt(userRole);
        return userRole;
    };

    let username;
    let result;

    const getUserName = async() => {
        const getUsersList = await contract_RA.methods.getUsers().call();
        const accounts = await web3.eth.requestAccounts();
		const account = accounts[0];
        console.log("ACCOUNT" + account);
        
        for(let i = 0; i < getUsersList.length; i++){
            if(getUsersList[i][0] === account){
                 username = getUsersList[i][1];
                 console.log(getUsersList[i][1]);
                 console.log("User Role " + username);

            }
        }
        console.log("RESULT" + result);
        setUserName(username);
    }
    
    const [name, setUserName] = useState("Name");
    const [roleString, setRoleString] = useState("Role");

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [toggleState3, setToggleState3] = useState(1);

    const toggleTab3 = (index) => {
        setToggleState3(index);
    };

    const [toggleState4, setToggleState4] = useState(1);

    const toggleTab4 = (index) => {
        setToggleState4(index);
    };


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          const t = setTimeout(() => {
            setLoading(false);
          }, 3000);
      
          console.log("HERE");
          switch (await getRole()) {
            case 1:
              setRoleString('Label');
              break;
            case 2:
              setRoleString('Artist');
              break;
            case 3:
              setRoleString('Client');
              break;
            case 4:
              setRoleString('Admin');
              break;
          }

          getUserName();
      
          return () => {
            clearTimeout(t);
          };
        };
      
        fetchData();
      }, []);

    return (
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div>
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
                                    <h5 className="mx-4 text_sub">{roleString}</h5>
                                </div>
                            <div className="nav_btn_con">
                                <Button
                                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(1)}>
                                    <FaMusic className='mx-3'/>View listed songs
                                </Button>

                                <Button
                                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(2)}>
                                    <FaFileContract className='mx-3'/>View contracts
                                </Button>

                                <Button
                                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(3)}>
                                    <FaSignature className='mx-3'/>View contract proposals
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                {/* <div className="px-4 mx-4 logout_btn_con">
                    <Link to="/">
                        <Button className="submit-button py-2 px-5 logout_btn">
                            Logout
                        </Button>
                    </Link>
                </div>*/}
            </div>

            <div className="col-sm-10 py-5 m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    {loading ? (
                        <ContentLoader
                            width={450}
                            height={50}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="90" y="15" rx="5" ry="5" width="270" height="12" />
                        </ContentLoader>
                    ) : (
                        <h1>View listed songs</h1>
                    )}

                    <ViewListedSongs />
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h1>View contracts</h1>
                    
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
                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <h1>View contract propoals</h1>
                    
                    <div className=" mt-5 mb-4">Choose a contract type below:</div>
                    <div className="row">
                        <div className="col">
                            <Button
                                className={toggleState4 === 1 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                onClick={() => toggleTab4(1)}>
                                Commercial
                            </Button>
                        </div>
                        <div className="col">
                            <Button
                                className={toggleState4 === 2 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                onClick={() => toggleTab4(2)}>
                                Streaming
                            </Button>
                        </div>
                    </div>
                    <div className={toggleState4 === 1 ? "content active-content" : "content"}>
                        <CommercialProposals />
                    </div>
                    <div className={toggleState4 === 2 ? "content active-content" : "content"}>
                        <StreamingProposals />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artist;