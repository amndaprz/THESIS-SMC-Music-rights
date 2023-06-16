import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';


import CardProposal from '../Cards/CardCommProposal';

import {contractAddress, contractABI, web3, contract, contract_RA} from '../../ContractProperties';


function ViewContractProposals(){

    const [toggleState, setToggleState] = useState(1);

    const [jsonObject, setJsonObj] = React.useState([]);
    const [ipfsHash, setIPFS] = React.useState([]);
    const [tokenObject, setTokenObj] = React.useState("");

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
            displayAllInfo();
        } , 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);

    
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

    const displayAllInfo = async() => {
        let IPFS = await ipfsClient();
        let info = [];
        const data =[];
        const temp_data = [];
        let allResults = await contract.methods.getTokens().call();
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

                if(data_status === "1")
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
         // log the contents of the file to the console
        
        
        // info = Buffer.concat(data).toString();
        // console.log("INFO - " + info);
        //info = "["+info.åreplace(/\n/g, ",")+"]";
        // const jsonObj = 0;
        // try {
        //     const jsonObj = JSON.parse(info);
        // } catch (err) { console.error("Error parse-ing: ", err);}

        // dataObject = jsonObj;

        // console.log("Parsed: " + dataObject);
        
        // const jsonObj = JSON.parse(info);
        // console.log(typeof data);
        //getDisplaySongs();

        
    

    
    }
    
    const [loading, setLoading] = useState(true);
    
    return(
        <div class="row py-4 px-1 card-deck">
            <CardProposal data={jsonObject} hash={ipfsHash}/>
        </div>
    );
}

export default ViewContractProposals;