import React, { useState } from 'react';

//import ContractStreamPopup from '../Modals/ContractStream';
import ContractCommPopup from '../Modals/ContractComm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardContract() {

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
            label: "evangelista",
            type: "Streaming"
        },
        {
            title: "tres",
            artist: "nicole",
            label: "cheng",
            type: "Commercial"
        },
        {
            title: "unna",
            artist: "nicole",
            label: "cheng",
            type: "Streaming"
        },
        {
            title: "dos",
            artist: "nicole",
            label: "cheng",
            type: "Commercial"
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
                <ContractCommPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    songs = {contractContent}
                />

                <Card.Body>
                    <Card.Title>{song.title}</Card.Title>
                    <Card.Text className="text_sub">
                        <div>by <span className='text_bold'>{song.artist}</span></div>
                        <div className='text_italic'>{song.label}</div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">Date</h5>
                    <Button key={key} onClick={() => clickedContract(song, true)} variant="primary" className="py-2 px-5 card_button">
                        View
                    </Button>
                </Card.Footer>
            </Card>
            ))}
        </>
    );
}

export default CardContract;