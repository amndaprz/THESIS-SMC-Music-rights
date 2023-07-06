import CardList from '../Cards/CardListedSongs';
import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import ContentLoader from 'react-content-loader'
import {web3, web3_RA, contract, contract_RA} from '../../ContractProperties';
import Button from 'react-bootstrap/Button';

let account;

function ViewBalance() {
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    var [time,setTime] = useState(new Date());

    useEffect(() => {
        getBalance();
        setTime(new Date());
    }, []);

    const[balance, setBalance] = useState();

    const getBalance = async() => {
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];
        const val = await web3.eth.getBalance(account);
        const res = web3.utils.fromWei(val , 'ether');
        setBalance(res);
        console.log("BALANCEEE2 = " + balance + typeof(balance));
        setTime(new Date());
    }

    return(
        <>
            <div className='balance_con mt-5' onLoad={getBalance}>
                Balance as of {date} {time.toLocaleTimeString()}:
                <h3 className='mt-3 text_pop'>
                    {balance} ETH
                </h3>
                <Button className='refresh_btn' onClick={getBalance}>Refresh</Button>
            </div>
        </>
    );
}

export default ViewBalance;