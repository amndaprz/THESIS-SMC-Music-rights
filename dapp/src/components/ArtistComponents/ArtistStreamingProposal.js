import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import ContentLoader from 'react-content-loader'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import CardProposal from '../Cards/CardStreamingProposal';

import {web3, contract, contract_RA, contract_Stream} from '../../ContractProperties';

let account;

function ViewContractProposals(){

    const [jsonObject, setJsonObj] = React.useState([]);
    const [ipfsHash, setIPFS] = React.useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            //setLoading(false);
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
        let allResults = await contract_Stream.methods.getAllStreamId().call();
        let data_status;
        let getStream = [];
        let hash;

        let loading = true;

        // iterates over allResults with tokenID and CID
    

        try {

            console.log("allResults: " + allResults);
            console.log(Object.keys(allResults).length);

            for (let count in allResults)
            {
                console.log("AAAAAAAAAA");
                data_status = await contract_Stream.methods.getStatus(allResults[count]).call();

                console.log(typeof data_status);

                if(data_status === "1")
                {

                    getStream = await contract_Stream.methods.getStream(allResults[count]).call();

                    hash = getStream.ipfsHash;

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
        //loading = false;
        setLoading(false);
    }
    
    const [query, setQuery] = useState("");

    const getInitialSort = () => {
        const sort = "a-z";
        return sort;
    };

    const [sort, setValue] = useState(getInitialSort);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    console.log(sort)

    jsonObject.sort((a, b) =>
        a.song_title > b.song_title ? 1 : -1,
    );

    if (sort === "z-a") {
        jsonObject.sort((a, b) =>
            a.song_title > b.song_title ? -1 : 1,
        );
    }

    let empty = false;
    
    console.log("LENGTH " + jsonObject.length);
    if(jsonObject.length === 0){
        empty = true;
    }
    else{
        empty = false;
    }

    return(
        <>
            <div className='row filter_con2'>
                <div className='col search_con2'>
                    <h4 className='search_title2'>Search</h4>
                    <div className='input_search'>
                        <input className="inputfield_search" placeholder="Search" onChange={event => setQuery(event.target.value)} />

                    </div>

                </div>
                <div className='col sort_con2'>
                    <h6 className='sort_title2'>Sort by</h6>
                    <select value={sort} onChange={handleChange} className="input_sort select_signup">
                        <option value="a-z">Song title, A-Z</option>
                        <option value="z-a">Song title, Z-A</option>
                    </select>

                </div>
            </div>
            {loading ? (
                <>
                <div className='mt-5 text_sub'>Loading contract proposals...</div>
                <ContentLoader
                    width={450}
                    height={185}
                    speed={2}
                    backgroundColor={'#383447'}
                    foregroundColor={'#2B2833'}
                >
                    
                    <rect x="20" y="15" rx="5" ry="5" width="390" height="30" />
                </ContentLoader>
                </>
            ) : (
                <>  
                    {
                        !empty && 
                            <div class="row py-4 px-1  card-deck" >
                                {jsonObject.filter(song => {
                                    if (query === '') {
                                        return song;
                                    } else if (song.song_title.toLowerCase().includes(query.toLowerCase())) {
                                        return song;
                                    }
                                    else if (song.artist_name.toLowerCase().includes(query.toLowerCase())) {
                                        return song;
                                    }
                                    else if (song.label_name.toLowerCase().includes(query.toLowerCase())) {
                                        return song;
                                    }
                                }).map((song, index) => (
                                    <CardProposal
                                        keys={index}
                                        data={song} />
                                ))}
                            </div>
                    }   
                    {
                        empty && 
                            <div className='text_sub'>
                                No contract proposals.
                            </div>
                    }
                    
                </>
            )
            }
            {/*
                loading &&
                <h1 className='text_pop'>LOADINGGGGGG.</h1>
        */}
        </>
    );
}

export default ViewContractProposals;