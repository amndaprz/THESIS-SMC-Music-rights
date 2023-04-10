import CardBuy from '../Cards/CardBuy'
import React from 'react';
import { json } from 'react-router-dom';

function BuySongs(props){
    const jsonObj = props.data;
    console.log("Buy songs = " + jsonObj.percent_artist);
        return(
        <div class="row py-4 card-deck">
       
            <CardBuy 
                addrA = {jsonObj.artist_address}
                addrL = {jsonObj.label_address}/>
            <CardBuy
                addrA = {jsonObj.artist_address}
                addrL = {jsonObj.label_address}/>
            <CardBuy
                addrA = {jsonObj.artist_address}
                addrL = {jsonObj.label_address}/>
        </div>
    );
}

export default BuySongs;