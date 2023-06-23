import React, {useState, useEffect} from 'react'
import {contract_RA, web3_Stream, contract_Stream} from '../../ContractProperties';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import ContentLoader from 'react-content-loader'
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

    const [loading, setLoading] = useState(true);

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

        setLoading(false);

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

    jsonObj.sort((a, b) =>
        a.song_title > b.song_title ? 1 : -1,
    );

    if (sort === "z-a") {
        jsonObj.sort((a, b) =>
            a.song_title > b.song_title ? -1 : 1,
        );
    }

    let empty = false;

    console.log("LENGTH stream " + jsonObj.length);
    if(jsonObj.length === 0){
        empty = true;
    }
    else{
        empty = false;
    }


    return(
        <div className="stream_content">
            <div>
                <h3 className="mb-4 ">Stream simulation</h3>
            </div>
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
                    <div className='mt-5 text_sub'>Loading songs...</div>
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
                        <div class="row py-4 px-1 card-deck" >
                            {jsonObj.filter(song => {
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
                                <CardStream
                                    keys={index}
                                    data={song} />
                            ))}
                        </div>
                    }
                    {
                        empty &&
                        <div className='text_sub'>
                            No songs for streaming.
                        </div>
                    }

                </>
            )
            }
        </div>
        
    );
  }

export default StreamForm;