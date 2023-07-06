import CardBuy from '../Cards/CardBuy'
import React, { useState } from 'react';
import { json } from 'react-router-dom';
import { unstable_ClassNameGenerator } from '@mui/material';
import { decryptCrowdsaleJson } from 'ethers';




function BuySongs(props){
    
  const jsonObj = props;

  //objectList.push(jsonObj)
  // console.log("Buy songs = " + jsonObj.percent_artist);
  console.log("Object List: " + props);

  //const data2 = JSON.parse(jsonObj);
  console.log("jsonObject 0000000001" + jsonObj.data.song_title);

  return (
      <CardBuy
        keys={jsonObj.keys}
        data={jsonObj.data} />
    );
  
        
}

export default BuySongs;