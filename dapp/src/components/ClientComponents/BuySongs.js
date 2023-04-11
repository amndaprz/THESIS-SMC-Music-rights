import CardBuy from '../Cards/CardBuy'
import React from 'react';
import { json } from 'react-router-dom';
import { unstable_ClassNameGenerator } from '@mui/material';
import { decryptCrowdsaleJson } from 'ethers';

function BuySongs(props){
    
    const jsonObj = props;

    //objectList.push(jsonObj)
   // console.log("Buy songs = " + jsonObj.percent_artist);
    console.log("Object List: " + props);
    console.log(jsonObj);
    

    return (
        <div class="row py-4 px-0 card-deck" >
          {jsonObj.data.map((obj, index) => (
              <CardBuy 
              addrA = {obj.artist_address}
              addrL = {obj.label_address}
              tokenID = {index}/>
          ))}
        </div>
      );
  
        
}

export default BuySongs;