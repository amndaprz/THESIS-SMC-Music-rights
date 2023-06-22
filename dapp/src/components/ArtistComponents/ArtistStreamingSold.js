import CardContract from '../Cards/CardStreamingSold'
import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import {web3, contract_RA, contract_Stream} from '../../ContractProperties';

let account;
function StreamingContracts(){

    useEffect(() => {
    
        listSoldSongs();

        return () => {
        }
    }, []);

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

    const [jsonObj, setJsonObj] = React.useState([]);

    const listSoldSongs = async() => {
        console.log("FCFGVH");
        // get address of current user
        const accounts = await web3.eth.requestAccounts();
        account = accounts[0];
        // get alias of current user with address
        console.log("ACCOUNT: " + typeof account);
        let alias = await contract_RA.methods.getAlias(account).call();

        let IPFS = await ipfsClient();
        let info = [];
        const data =[];
        const temp_data = [];
        let allResults = await contract_Stream.methods.getAllStreamId().call();
        let data_status;
        let getMRC = [];
        let hash;

        try {

            console.log("STREAM allResults: " + allResults);
            console.log(Object.keys(allResults).length);

            for (let count in allResults)
            {

                console.log(typeof data_status);

                

                getMRC = await contract_Stream.methods.getStream(allResults[count]).call();

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
                        //console.log("LABEL NAME: " + data.label_name);
                        if(data.artist_name === alias)
                        {
                            console.log("ALIAS NAME: " + alias);
                            temp_data.push(data);
                        }

                        
                        
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



    return(
        <div class="row py-4 px-1 card-deck">
            <CardContract data={jsonObj}/>
        </div>
    );
}

export default StreamingContracts;