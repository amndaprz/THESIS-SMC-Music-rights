import CardBuy from '../Cards/CardBuy'
import React, { useState } from 'react';
import { json } from 'react-router-dom';
import { unstable_ClassNameGenerator } from '@mui/material';
import { decryptCrowdsaleJson } from 'ethers';

import { FaSearch } from "react-icons/fa";


function BuySongs(props){
    
  const jsonObj = props;

  //objectList.push(jsonObj)
  // console.log("Buy songs = " + jsonObj.percent_artist);
  console.log("Object List: " + props);
  console.log("jsonObject" + jsonObj);
  
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

/*
    jsonObj.sort((a, b) =>
        a.songTitle > b.songTitle ? 1 : -1,
    );

    jsonObj.sort((a, b) => a.userId - b.userId);

    if (sort === "z-a") {
      jsonObj.sort((a, b) =>
            a.songTitle > b.songTitle ? -1 : 1,
        );
    }
*/


  return (
    <>
    <div className='row filter_con2'>
      <div className='col search_con2'>
          <h4 className='search_title2'>Search</h4>
          <div className='input_search'>
              <input className="inputfield_search" placeholder="Search" onChange={event => setQuery(event.target.value)} /><FaSearch className='mx-2 mb-1' />
              
          </div>

      </div>
      <div className='col sort_con2'>
          <h6 className='sort_title2'>Sort by</h6>
          <select value={sort} onChange={handleChange} className="input_sort select_signup">
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
          </select>

      </div>
    </div>

      <div class="row py-4 px-1  card-deck" >
        {jsonObj.data.map((obj, index) => (
            <CardBuy 
            songTitle = {obj.song_title}
            addrA = {obj.artist_address}
            addrL = {obj.label_address}
            tokenID = {index}
            totalFee = {obj.total_fee}/>
        ))}
      </div>
    </>
    );
  
        
}

export default BuySongs;