import React, { useEffect, useState, useRef } from 'react';
import ContentLoader from 'react-content-loader'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Sound from './ding.mp3';

import { FaPause, FaPlay, FaSearch } from "react-icons/fa";
import {contractAddress_Stream, contractABI_Stream, web3_Stream, contract_Stream, contract_RA} from '../../ContractProperties';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let account;
let stream_cnt;
let count;


function CardStream(props) {
    const jsonObj = props;

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);



    const [query, setQuery] = useState("");

    const getInitialSort = () => {
        const sort = "a-z";
        return sort;
    };

    const [sort, setValue] = useState(getInitialSort);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    jsonObj.data.sort((a, b) =>
        a.song_title > b.song_title ? 1 : -1,
    );

    if (sort === "z-a") {
        jsonObj.data.sort((a, b) =>
            a.song_title > b.song_title ? -1 : 1,
        );
    }


    const notify = (title, artist) => {
        new Audio(Sound).play()
        toast("Now playing:  " + title + " by " + artist);
        //console.log(event.target);
    }

    const distributePayment = async() => {
        const batch = new web3_Stream.BatchRequest();
        let numStreams = 0;
        let smrcAddress = account;

        console.log("SMRC Address = " + smrcAddress)
        console.log("numStreams = " + numStreams);

        const testAddress1 = "0x7E4216c925c5A11DC672196403171411Ee748F88";
        const testAddress2 = "0xD077221195986B32B6B64Fe2A66EE26493B09aDA";
        const Addr1Percent = 30;
        const Addr2Percent = 70;
        const totalFee = 3;

        const addr1Cut = totalFee * (Addr1Percent/100);
        const addr2Cut = totalFee * (Addr2Percent/100);

        const valueInWei1 = web3_Stream.utils.toWei(addr1Cut.toString(), 'ether');
        const valueInWei2 = web3_Stream.utils.toWei(addr2Cut.toString(), 'ether');
        console.log(addr1Cut);
        console.log(addr2Cut);


        const tx1Req = web3_Stream.eth.sendTransaction({from: account, to: testAddress1, value: valueInWei1, gas: 21000});
        const tx2Req = web3_Stream.eth.sendTransaction({from: account, to: testAddress2, value: valueInWei2, gas: 21000});
        
        batch.add(tx1Req);
        batch.add(tx2Req);

        batch.execute();

        tx2Req.on('confirmation', (confirmationNumber, receipt) => {

            console.log(confirmationNumber);
            console.log(receipt);
            if( confirmationNumber === 1){

            }else if( confirmationNumber === 0){
                batch.cancel(tx1Req.requestManager.provider, tx1Req.id);
            }
        });

    }

  

    const [currCount, setCurrCount] = useState(0);

    const addStreamCount = async (value) => {
        const accounts = await web3_Stream.eth.requestAccounts();
        const account = accounts[0];

        

        notify(value.song_title, value.artist_name);

        console.log("NGEIJEJI: " + value.token_id + typeof value.token_id);

        await contract_Stream.methods.simulateStreams(1, parseInt(value.token_id)).send({from:account, sender: account});
        
        const update = await contract_Stream.methods.getUpdate(parseInt(value.token_id)).call();

        // let update = await contract_Stream.methods.simulateStreams(0, parseInt(value.token_id)).call();

        console.log("UPDATE: " + update + typeof update);


        
        //const curr_stream = await contract_Stream.methods.getCurrStreams(value.token_id).call();
        console.log("PREV STREAM: " + await contract_Stream.methods.getPrevStreams(value.token_id).call())
        console.log("CURR STREAM: " + await contract_Stream.methods.getCurrStreams(value.token_id).call())

        let addresses = await contract_RA.methods.getAddresses().call();
        let username;
        let artist_address, label_address;

        const num_update = parseInt(update);

        count = await contract_Stream.methods.getCurrStreams(value.token_id).call();
        
        setCurrCount(count);

        //curr_count = curr_count + 1;

        //setCurrCount(curr_count);

        console.log("CURR_COUNT: "+ count);

        if (num_update !== 0){ // update is 10
            
            for (let key in addresses)
            {
                username = await contract_RA.methods.getAlias(addresses[key]).call();

                if(value.artist_name === username)
                {
                    console.log("nice")
                    artist_address = addresses[key];
                }
                if(value.label_name === username)
                {
                    console.log("good")
                    label_address = addresses[key];
                }
                
            }

            console.log("UPDATE2: " + update)

            await contract_Stream.methods.transferStream(parseInt(value.total_fee), parseInt(update), parseInt(value.percent_label), parseInt(value.percent_artist), artist_address, label_address).send({from: account, to: label_address, gas: 800000, value: parseInt(value.total_fee)})
            //await contract_Stream.methods.transferStream(parseInt(value.total_fee), parseInt(update), parseInt(value.percent_label), parseInt(value.percent_artist), artist_address, label_address).send({from: account, to: artist_address, gas: 800000, value: parseInt(value.total_fee)})
            if (await contract_Stream.methods.clearUpdate(parseInt(value.token_id)).send({from:account, sender: account})){
                // num_update = 0;
                // update = 0;
                const update = await contract_Stream.methods.getUpdate(parseInt(value.token_id)).call();
                console.log("NUM_UPDATE: "+ update);}
        }


    };

    return (
        <>
            <div className='row filter_con'>
                <div className='col search_con'>
                    <h4 className='search_title'>Search songs</h4>
                    <div className='input_search'>
                        <input className="inputfield_search" placeholder="Search" onChange={event => setQuery(event.target.value)} />
                        <FaSearch className='mx-2 mb-1' />
                    </div>

                </div>
                <div className='col sort_con'>
                    <h6 className='sort_title'>Sort by</h6>
                    <select value={sort} onChange={handleChange} className="input_sort ">
                        <option value="a-z">Song title, A-Z</option>
                        <option value="z-a">Song title, Z-A</option>
                    </select>

                </div>
                <ToastContainer
                    theme="dark"
                    closeOnClick={true}
                    autoClose={2000}
                />
            </div>
            {jsonObj.data.filter(song => {
                if (query === '') {
                    return song;
                } else if (song.song_title.toLowerCase().includes(query.toLowerCase())) {
                    return song;
                }
                else if (song.artist_name.toLowerCase().includes(query.toLowerCase())) {
                    return song;
                }
                else if (song.label_name.toLowerCase().includes(query.toLowerCase())) {
                    console.log("oasnasoi", song.label.toLowerCase().includes(query.toLowerCase()))
                    
                    return song;
                }

                if(!song.song_title.toLowerCase().includes(query.toLowerCase()) && 
                    !song.artist_name.toLowerCase().includes(query.toLowerCase()) &&
                    !song.label_name.toLowerCase().includes(query.toLowerCase())){
                }



            }).map((song, key) => (
                <Card key={(key)}>
                    {loading ? (
                        <ContentLoader
                            width={450}
                            height={140}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="10" y="16" rx="5" ry="5" width="250" height="12" />
                            <rect x="10" y="48" rx="5" ry="5" width="390" height="12" />
                            <rect x="10" y="110" rx="5" ry="5" width="250" height="12" />
                        </ContentLoader>
                    ) : (
                        <>  
                            
                            <Card.Body>
                                <Card.Title>{song.song_title}</Card.Title>
                                <Card.Text className="text_sub">
                                    <div className='row'>
                                        <div className='col'>
                                            <div>by <span className='text_bold'>{song.artist_name}</span></div>
                                            <div className='text_italic'>{song.label_name}</div>
                                        </div>

                                        <Button className='col mx-2 play_btn' onClick={() => addStreamCount(song)} key={key}>
                                            <FaPlay className='play_icon' />
                                        </Button>
                                    </div>

                                </Card.Text>
                            </Card.Body>
                            {/*
                                <Card.Footer>
                                <h5 className='text_pop'>{currCount} stream(s)</h5>
                            </Card.Footer>
                            */}
                            
                            
                            
                        </>
                    )
                    }
                </Card>
                
            ))}
            
        </>

    );
}

export default CardStream;