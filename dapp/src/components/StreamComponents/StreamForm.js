import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import ConfirmStream from "../Modals/ConfirmStream";
import {contractAddress_Stream, contractABI_Stream, contract_RA, web3_Stream, contract_Stream} from '../../ContractProperties';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import CardStream from "../Cards/CardStream";


let account;

function StreamForm(){

    // Inputs
    const [smrcAddress, setSMRCAddress] = useState('');
    const [numStreams, setNumStreams] = useState('');
    const [jsonObj, setJsonObj] = React.useState([]);

    // onChange Handlers
    const handleSMRCAddress = (event) => { setSMRCAddress(event.target.value); }
    const handleNumStreams = (event) => { setNumStreams(event.target.value); }

    useEffect(() => {
        const t = setTimeout(() => {
            simulateStreamPayout();
        } , 0);

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

    const simulateStreamPayout = async() => {
        let IPFS = await ipfsClient();
        const accounts = await web3_Stream.eth.requestAccounts();
		account = accounts[0];
        let allStreamID = await contract_Stream.methods.getAllStreamId().call();
        let hash;
        let data = [];
        let temp_data = [];
        let info = [];
        let alias = await contract_RA.methods.getAlias(account).call();

        try{
            for(let key in allStreamID)
            {
                let stream = await contract_Stream.methods.getStream(allStreamID[key]).call();

                hash = stream.ipfsHash;

                for await (const chunk of IPFS.cat(hash)) {
                    console.log(chunk);
                    data.push(chunk); 
                                        
                    info = Buffer.concat(data).toString();
                    console.log("INFO - " + info);
        
                    try {
                        let data = JSON.parse(info);
                        console.log(data);
                        temp_data.push(data);
                                                    
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
        }catch(err){
            console.error("Error while retrieving data from IPFS:", err); // handle any errors
        }

        console.log("temp_data datatype: " + data);
        setJsonObj(temp_data);
        console.log("TEMP_DATA" + typeof(temp_data));
        console.log(Buffer.concat(data).toString());

    

        // try{
        //     if(await web3.eth.sendTransaction({from: account, to: testAddress1, value: valueInWei1, gas: 21000})){
        //         console.log("Transfered " + addr1Cut + " to address 1: " + testAddress1);
                
        //         if(await web3.eth.sendTransaction({from: account, to: testAddress2, value: valueInWei2, gas: 21000})){
        //             console.log("Transfered " + addr2Cut + " to address 2: " + testAddress2);
        //         }
    
        //     }
        // }catch (e){
            
        // }
       
        

    }


    return(
        // <div>
            
        //     <form className="mx-4 mt-5" onSubmit="">
        //         <ConfirmStream
        //             show={modalShow}
        //             onHide={() => setModalShow(false)}
        //         />
        //         <div className="input_con">
        //         <h3 className="mb-4 ">Stream simulation</h3>
    
        //         <div className="my-3 p-4 input_contract">
        //             <p className="text_sub p-0 m-0">Enter SMRC address :
        //             <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"  value = {smrcAddress} onChange={handleSMRCAddress} />
        //             </p>
        //         </div>
        //         <div className="my-3 p-4 input_contract">
        //             <p className="text_sub p-0 m-0">Enter N streams :
        //             <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value = {numStreams} onChange={handleNumStreams} />
        //             </p>
        //         </div>
        //         <div>
        //             <Button
        //                 className="submit-button mt-3 py-3 px-5 btn_mod"
        //                 onClick={() => setModalShow(true)}>
        //                 Simulate
        //             </Button>

        //             <Button
        //                 className="submit-button mt-3 py-3 px-5 btn_mod"
        //                 onClick={simulateStreamPayout}>
        //                 Simulate w/o Modal
        //             </Button>
        //         </div>
        //         </div>
        //     </form>

        //     
        //   </div> 
        <div className="stream_content">
            <div>
                <h3 className="mb-4 ">Stream simulation</h3>
            </div>
            
            <div class="row py-4 card-deck card_stream_con">
                <CardStream data={jsonObj}/>
            </div>
        </div>
        
    );
  }

export default StreamForm;