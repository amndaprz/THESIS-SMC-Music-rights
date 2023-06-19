import CardBuy from '../Cards/CardBuy'
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function BuySongs(props){
    
  const jsonObj = props;

  console.log("Object List: " + props);
  console.log("jsonObject 0000000001" + jsonObj.data.song_title);
  
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

  jsonObj.data.sort((a, b) =>
      a.song_title > b.song_title ? 1 : -1,
  );

  //jsonObj.sort((a, b) => a.userId - b.userId);

  if (sort === "z-a") {
    jsonObj.data.sort((a, b) =>
          a.song_title > b.song_title ? -1 : 1,
      );
  }

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
              <option value="a-z">Song title, A-Z</option>
              <option value="z-a">Song title, Z-A</option>
          </select>

      </div>
    </div>

      <div class="row py-4 px-1  card-deck" >
      {jsonObj.data.filter(song => {
                if (query === '') {
                    return song;
                } else if (song.song_title.toLowerCase().includes(query.toLowerCase())) {
                    return song;
                }
              }).map((song, index) => (
            <CardBuy 
            key = {index}
            data = {song}/>
        ))}
      </div>
    </>
    );
  
        
}

export default BuySongs;