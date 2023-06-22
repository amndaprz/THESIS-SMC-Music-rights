import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';


import CardProposal from '../Cards/CardCommercialProposal';

import {web3, contract, contract_RA} from '../../ContractProperties';

let account;

function ViewContractProposals(){

    const [jsonObject, setJsonObj] = React.useState([]);
    const [ipfsHash, setIPFS] = React.useState([]);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
            displayAllInfo();
        } , 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);


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

        const accounts = await web3.eth.requestAccounts();
        account = accounts[0];
        // get alias of current user with address
        console.log("ACCOUNT: " + typeof account);
        let alias = await contract_RA.methods.getAlias(account).call();

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
                                            
                        info = Buffer.concat(data).toString();
                        console.log("INFO - " + info);
            
                        try {
                            const data = JSON.parse(info);
                            console.log(data);
                            if(alias === data.artist_name)
                            {
                                console.log("IS ARTIST: " + data.artist_name);
                                temp_data.push(data);
                            }                            
                            } catch (error) {
                            const position = parseInt(error.message.split(' ').pop(), 10);
                            const cleanJsonString = info.substring(0, position);
                            const data = JSON.parse(cleanJsonString);
                            console.log(temp_data);
                            temp_data.push(data);
                            
                            }
                            
                            data.pop();
                    }

                }
            }
            
            
            console.log("Extraction successful!");       
        
        } catch (err) {
            console.error("Error while retrieving data from IPFS:", err); // handle any errors
        }
        console.log("temp_data datatype: " + data);
        setJsonObj(temp_data);
        console.log("TEMP_DATA" + typeof(temp_data));
        console.log(Buffer.concat(data).toString());
    
    }
    
    const [loading, setLoading] = useState(true);
    
    return(
        <div class="row py-4 px-1 card-deck">
            <CardProposal data={jsonObject} hash={ipfsHash}/>
        </div>
    );
}

export default ViewContractProposals;