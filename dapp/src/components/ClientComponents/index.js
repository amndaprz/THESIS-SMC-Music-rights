import React, {useState}from 'react';

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

    React.useEffect(() => {
    const getInfo = async () => {
      // your code to get the JSON object from IPFS
      const IPFS = await ipfsClient();
      const cid = "QmcaJKcQ5h6QdYBaLYLaTosgCa8zF9nML18EgcLiHHAH1K";
      try {
        const data = [];
        for await (const chunk of IPFS.cat(cid)) {
          data.push(chunk);
        }
        const info = Buffer.concat(data).toString();
        const jsonObj = JSON.parse(info);
        setJsonObj(jsonObj);
      } catch (err) {
        console.error("Error while retrieving data from IPFS:", err); // handle any errors
      }
    };
    getInfo();
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

    const displaySongs = async() => {

        let allResults = await contract.methods.getAllMRCs().call();

        console.log(allResults);

        return 
    }

    const displayMarketplace = async() => {
        let IPFS = await ipfsClient();
        const allPinned = IPFS.pin.ls({type: 'recursive'});
        // IPFS.c
        const allHashes = new Set();

        console.log(allPinned);
        // allPinned.forEach((item) => {
        //     allHashes.add(item.cid.toString());
        // })

        

        console.log(Array.from(allHashes));

        return allHashes;
    }

    const displayAllInfo = async() => {
        let IPFS = await ipfsClient();
        let info = [];

        const cid = "QmcaJKcQ5h6QdYBaLYLaTosgCa8zF9nML18EgcLiHHAH1K";

        try {
            const data = [];
            for await (const chunk of IPFS.cat(cid)) {
              data.push(chunk);
            }
           
            console.log(Buffer.concat(data).toString()); // log the contents of the file to the console
            info = Buffer.concat(data).toString();
        
        } catch (err) {
            console.error("Error while retrieving data from IPFS:", err); // handle any errors
        }

        console.log("INFO - " + info);
        const jsonObj = JSON.parse(info);
        dataObject = jsonObj;

        console.log(dataObject);

        //displayMarketplace(IPFS);

        setJsonObj(jsonObj);

    }
    

  return (
    <div>
        {/*<NotificationContainer/>*/}
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div className="px-4">
                    <h2 className="mx-4 mt-5 client_name">Client name</h2>
                    <h5 className="mx-4 text_sub">Role name</h5>
                </div>
                <div className="nav_btn_con">
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
                    onClick={displaySongs}>
                    Display all Tokens
                    </Button>
                </div>
                    
            </div>
            
            <div className="col-sm-10 py-5 px-0 m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>Marketplace</h1>
                    <BuySongs data={jsonObject}/>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h1>Owned songs</h1>
                    <OwnedSongs/>
                </div>
            </div>

        </div>
        

      
    </div>
  );
}

export default Client;