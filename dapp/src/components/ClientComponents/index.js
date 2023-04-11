import React, {useEffect, useState} from 'react';

import ContentLoader from 'react-content-loader'
import Button from 'react-bootstrap/Button';

import BuySongs from './BuySongs'
import OwnedSongs from './OwnedSongs'

import ConnectIPFS from '../IPFSComponents/ConnectIPFS';

import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';


// let connectIPFS = new ConnectIPFS();

let dataObject;

function Client() {

    const [toggleState, setToggleState] = useState(1);

    const [jsonObject, setJsonObj] = React.useState("");
    const [tokenObject, setTokenObj] = React.useState("");

    React.useEffect(() => {
    const getInfo = async () => {
      // your code to get the JSON object from IPFS
      const IPFS = await ipfsClient();
      const cid = "QmcaJKcQ5h6QdYBaLYLaTosgCa8zF9nML18EgcLiHHAH1K";
      let allResults = await contract.methods.getAllMRCs().call();
      try {
        const data = [];
        const i = 0;
        const j = 0;
        for(i = 0; i < allResults.size(); i++)
        {

            for await (const chunk of IPFS.cat(allResults[i][0])) {
                data.push(chunk);
            }

        
        }
        const info = Buffer.concat(data).toString();
        const jsonObj = JSON.parse(info);
        //setJsonObj(jsonObj);
      } catch (err) {
        console.error("Error while retrieving data from IPFS:", err); // handle any errors
      }
    };
    
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

    const getDisplaySongs = async() => {

        let allResults = await contract.methods.getAllMRCs().call();

        console.log(allResults);

        return allResults;
    }

    const displayAllInfo = async() => {
        let IPFS = await ipfsClient();
        let info = [];
        const cid = "QmcaJKcQ5h6QdYBaLYLaTosgCa8zF9nML18EgcLiHHAH1K";
        const data =[];
        const temp_data = [];
        let allResults = await contract.methods.getAllMRCs().call();

        console.log("HATDOG");
        console.log(allResults);
        console.log(Object.keys(allResults).length);

        // iterates over allResults with tokenID and CID
    

        try {
            
            for (let key in allResults)
            {
                console.log("Data is " + allResults[key][0]);

                for await (const chunk of IPFS.cat(allResults[key][1])) {
                    console.log(chunk);
                    data.push(chunk); 
                    // temp_data.push(JSON.parse(Buffer.concat(chunk).toString()));

                    info = Buffer.concat(data).toString();
                    console.log("INFO - " + info);

                    try {
                        const data = JSON.parse(info);
                        console.log(data);
                        temp_data.push(data);
                        //setJsonObj(data);
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
        console.log(typeof data);
        console.log(Buffer.concat(data).toString()); // log the contents of the file to the console
        
        
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

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        } , 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);
    return (
    <div>
        {/*<NotificationContainer/>*/}
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div className="px-4 pb-5">
                    {loading ? (
                        <ContentLoader
                            width={450}
                            height={126}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="20" y="70" rx="5" ry="5" width="220" height="12" />
                            <rect x="20" y="102" rx="5" ry="5" width="220" height="12" />
                        </ContentLoader>
                    ): (
                        <>
                        <h2 className="mx-4 mt-5 client_name">Client name</h2>
                        <h5 className="mx-4 text_sub">Role name</h5>
                        </>
                    )}
                    
                </div>
                <div className="nav_btn_con">
                {loading ? (
                        <ContentLoader
                            width={450}
                            height={200}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="40" y="10" rx="5" ry="5" width="270" height="50" />
                            <rect x="40" y="80" rx="5" ry="5" width="270" height="50" />
                        </ContentLoader>
                    ): (
                        <>
                        <Button
                            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(1)}>
                        Buy songs
                        </Button>

                        <Button
                            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(2)}>
                        Owned songs
                        </Button>

                        {/* Replace with on website refresh */}
                        <Button
                            onClick={displayAllInfo}>
                        Display all Tokens
                        </Button>
                        </>
                    )}
                    
                </div>
                    
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