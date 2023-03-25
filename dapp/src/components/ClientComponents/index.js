import React, {useState}from 'react';

import Button from 'react-bootstrap/Button';

import BuySongs from './BuySongs'
import OwnedSongs from './OwnedSongs'

import ConnectIPFS from '../IPFSComponents/ConnectIPFS';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

// let connectIPFS = new ConnectIPFS();

function Client() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // const displayMarketplace = async() => {
    //     console.log("MARKETPLACE")
    //    try {
    //         const testHashes = await connectIPFS.displayAllInfo();
    //         console.log(testHashes);
    //    }catch {

    //    }
    // }

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

        const cid = "QmYPx9zF2snqBs4HE31VizrKQnJXiaXgQgZ7XNP1irRqia";

        try {
            const result = await IPFS.cat(cid);
            console.log(result.toString());
            console.log(result);
        }catch (err) {

        }

        try {
            const data = [];
            for await (const chunk of IPFS.cat(cid)) {
              data.push(chunk);
            }
            console.log(Buffer.concat(data).toString()); // log the contents of the file to the console
          } catch (err) {
            console.error("Error while retrieving data from IPFS:", err); // handle any errors
          }
       
        
        // const allPinned = await IPFS.pin.ls({type: 'recursive'});
        // try {
        //     const allPinned = await Promise.all(IPFS.pin.ls({ type: 'recursive' }));
        //     console.log(allPinned);
        // } catch (err) {
        //     console.error("Error while retrieving pinned items from IPFS:", err);
        // }

        const allHashes = new Set();

        console.log("Hashes" + Array.from(allHashes));

        return allHashes;
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
                    onClick={displayAllInfo}>
                    Display all Tokens
                    </Button>
                </div>
                    
            </div>
            
            <div className="col-sm-10 py-5 px-0 m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>Marketplace</h1>
                    <BuySongs/>
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