import React, { useState } from 'react';

import ProposalPopup from '../Modals/ProposalStream';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";

function CardContract(){

    const [modalShow, setModalShow] = useState(false);

    const [contractContent, setContractContent] = useState([]);

    const clickedContract  = (value, isOpen) =>{
        console.log("clicked", value);
        setModalShow(isOpen);   
        setContractContent(value)
    }

    // test
    const Songs = [
        {
            title: "meiji",
            artist: "ina",
            label: "evangelista"
        },
        {
            title: "tres",
            artist: "nicole",
            label: "cheng"
        },
        {
            title: "unna",
            artist: "nicole",
            label: "cheng"
        },
        {
            title: "dos",
            artist: "nicole",
            label: "cheng"
        }
    ];

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

    Songs.sort((a, b) =>
        a.title > b.title ? 1 : -1,
    );

    if (sort === "z-a") {
        Songs.sort((a, b) =>
            a.title > b.title ? -1 : 1,
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
            />
        </div>
        {Songs.filter(song => {
            if (query === '') {
                return song;
            } else if (song.title.toLowerCase().includes(query.toLowerCase())) {
                return song;
            }
            else if (song.artist.toLowerCase().includes(query.toLowerCase())) {
                return song;
            }
            else if (song.label.toLowerCase().includes(query.toLowerCase())) {
                return song;
            }
        }).map((song, key) => (
        <Card key={(key)}>

            <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Card.Text className="text_sub">
                    <div>by <span className='text_bold'>{song.artist}</span></div>
                    <div className='text_italic'>{song.label}</div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div>
                    <span className='text_sub'>
                        Fee per stream:
                    </span>
                    <h5 class="text_pop">0.00000000012 ETH</h5>
                </div>
                
                <Button key={key} onClick={() => clickedContract(song, true)} variant="primary" className="py-2 px-5 card_button_proposal">
                    View
                </Button>
            </Card.Footer>
        </Card>
        ))}
        </>
    );
}

export default CardContract;