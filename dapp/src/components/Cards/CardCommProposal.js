import React, { useState } from 'react';

import ProposalPopup from '../Modals/ProposalComm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";

function CardContract(props){

    const jsonObj = props;
    const hashes = props.hash;


    const [modalShow, setModalShow] = useState(false);

    const [contractContent, setContractContent] = useState([]);
    const [tokenID, setTokenID] = useState(0);

    console.log("WORD: " + hashes[0]);

    const clickedContract  = (value, isOpen, key) =>{
        console.log("clicked", value);
        setModalShow(isOpen);   
        setContractContent(value);
        setTokenID(hashes[key]); // hashes = tokenID
        console.log("HASH: " + hashes[key]);
    }

    // test
    // const Songs = [
    //     {
    //         title: "meiji",
    //         artist: "ina",
    //         label: "evangelista"
    //     },
    //     {
    //         title: "tres",
    //         artist: "nicole",
    //         label: "cheng"
    //     },
    //     {
    //         title: "unna",
    //         artist: "nicole",
    //         label: "cheng"
    //     },
    //     {
    //         title: "dos",
    //         artist: "nicole",
    //         label: "cheng"
    //     }
    // ];

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

    if (sort === "z-a") {
        jsonObj.data.sort((a, b) =>
            a.song_title > b.song_title ? -1 : 1,
        );
    }

    return(
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
            <ProposalPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
                songs = {contractContent}
                hashContent = {tokenID}
            />
        </div>
        {jsonObj.data.filter(song => {
            if (query === '') {
                return song;
            } else if (song.song_title.toLowerCase().includes(query.toLowerCase())) {
                return song;
            }
        }).map((song, key) => (
        <Card key={(key)}>

            <Card.Body>
                <Card.Title>{song.song_title}</Card.Title>
                <Card.Text className="text_sub">
                    <div>by <span className='text_bold'>{song.artist_name}</span></div>
                    <div className='text_italic'>{song.label_name}</div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div>
                    <span className='text_sub'>
                        Total fee:
                    </span>
                    <h5 class="text_pop">{song.total_fee} ETH</h5>
                </div>
                
                <Button key={key} onClick={() => clickedContract(song, true, key)} variant="primary" className="py-2 px-5 card_button_proposal">
                    View
                </Button>
            </Card.Footer>
        </Card>
        ))}
        </>
    );
}

export default CardContract;