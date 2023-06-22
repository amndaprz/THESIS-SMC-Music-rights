import React, {useEffect, useState} from 'react';

import ContentLoader from 'react-content-loader'
import Button from 'react-bootstrap/Button';

import BuySongs from './BuySongs'
import OwnedSongs from './OwnedSongs'

import { Link, useNavigate} from "react-router-dom";


import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import { FaCartPlus, FaShoppingBag } from 'react-icons/fa';
import {contractAddress, contractABI, web3,web3_RA, contract, contract_RA} from '../../ContractProperties';


// let connectIPFS = new ConnectIPFS();

let dataObject;
let account;
let role;

function Client() {

    const [toggleState, setToggleState] = useState(1);

    const [jsonObject, setJsonObj] = React.useState([]);
    const [tokenObject, setTokenObj] = React.useState("");

    const navigate = useNavigate();

    const[userRole, setUserRole] = useState("")
    
    window.ethereum.on("accountsChanged", () => {
        //window.location.reload();
        getRole();
      });

    const getRole = async() => {
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];
        role = await contract_RA.methods.getRole(account).call();
        setUserRole(role);
        const prev_role = role;
        console.log("User Role " + role);
        switch(role){
            /*
                1-Label, 2-Artist, 3-Client, 4-Admin
            */
            case '1': navigate("../Label"); break;
            case '2': navigate("../Artist"); break;
            case '3': navigate("../Client"); break;
            case '4': navigate('../Stream'); break;
            default: navigate('../'); break;
        }
    };

    

    const [roleString, setRoleString] = useState("Role");
        
    const [name, setUserName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          const t = setTimeout(() => {
            
            setLoading(false);
          }, 3000);
          
          console.log("HERE");
          
          getUserName();
          getRole();

          return () => {
            clearTimeout(t);
          };
        };
        
        fetchData();
      }, []);

      const getUserName = async() => {
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
    

    
    const toggleTab = (index) => {
        setToggleState(index);
    };

    // IPFS
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

    const getDisplaySongs = async() => {

        let allResults = await contract.methods.getAllMRCs().call();

        console.log(allResults);

        return allResults;
    }

    const displayAllInfo = async() => {
        let IPFS = await ipfsClient();
        let info = [];
        const data =[];
        const temp_data = [];
        let allResults = await contract.methods.getTokens().call();
        const all_data = [];
        let data_status;
        let getMRC = [];
        let hash;
        // iterates over allResults with tokenID and CID
    

        try {

            console.log("allResults: " + allResults);
            console.log(Object.keys(allResults).length);

            for (let count in allResults)
            {
                console.log("AAAAAAAAAA");
                data_status = await contract.methods.getStatus(allResults[count]).call();

                console.log(typeof data_status);

                if(data_status === "2")
                {

                    getMRC = await contract.methods.getMRC(allResults[count]).call();

                    hash = getMRC.ipfsHash;

                    console.log("HASH IS HERE: " + typeof hash);

                    for await (const chunk of IPFS.cat(hash)) {
                        console.log(chunk);
                        data.push(chunk); 
                                
                                // temp_data.push(JSON.parse(Buffer.concat(chunk).toString()));
            
                        info = Buffer.concat(data).toString();
                        console.log("INFO - " + info);
            
                        try {
                            const data = JSON.parse(info);
                            console.log(data);
                            temp_data.push(data);
                            //setJsonObj(temp_data);
                            } catch (error) {
                            const position = parseInt(error.message.split(' ').pop(), 10);
                            const cleanJsonString = info.substring(0, position);
                            const data = JSON.parse(cleanJsonString);
                            console.log(temp_data);
                            temp_data.push(data);
                            //setJsonObj(temp_data);
                            
                            }
                            
                            data.pop();
                    }


                }
            }
            
            
            console.log("Extraction successful!");

            //console.log(allResults.size());
            // if for loop doesnt work use while loop instead
            // for await (const chunk of IPFS.cat(cid)) {
            //   data.push(chunk);
            // }
            
            
        
        } catch (err) {
            console.error("Error while retrieving data from IPFS:", err); // handle any errors
        }
        console.log("temp_data datatype: " + data);
        setJsonObj(temp_data);
        //setJsonObj(data);
        console.log("TEMP_DATA" + typeof(temp_data));
        console.log(Buffer.concat(data).toString());
 
    }
    
    const [loading, setLoading] = useState(true);

    
    return (
    <div onLoad={displayAllInfo}>
        {/*<NotificationContainer/>*/}
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
                    ): (
                        <>
                        <div className="px-4 pt-5 pb-3 user_con">
                                <img src="../ritmo_logo.png" alt="logo" className="mt-3 logo_tab" />
                                <h2 className="mx-4 mt-5 client_name">{name}</h2>
                                <h5 className="mx-4 text_sub">Client</h5>
                        </div>
                        
                        <div className="nav_btn_con">
                        
                            <Button
                                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(1)}>
                                <FaCartPlus className='mx-3'/>Buy songs
                            </Button>

                            <Button
                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                onClick={() => toggleTab(2)}>
                                <FaShoppingBag className='mx-3'/>Owned songs
                            </Button>

                            {/* Replace with on website refresh */}
                            {/* <Button
                                onClick={displayAllInfo}>
                            Refresh
                            </Button> */}
                        </div>
                        </>
                    )}
            </div>
            
            <div className="col-sm-10 py-5 px-0 m-0 content_con">
            
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
                    ): (
                        <h1>Marketplace</h1>
                    )}
                    
                    <BuySongs data={jsonObject}/>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                {loading ? (
                        <ContentLoader
                            width={450}
                            height={50}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="90" y="0" rx="5" ry="5" width="270" height="50" />
                        </ContentLoader>
                    ): (
                        <h1>Owned Songs</h1>
                    )}
                    <OwnedSongs/>
                </div>
            </div>

        </div>
        

      
    </div>
  );
}

export default Client;