import React, { useState } from 'react';

//import ContractStreamPopup from '../Modals/ContractStream';
import ContractCommPopup from '../Modals/ContractComm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardCommContract(props) {
    const jsonObj = props;
    const [modalShow, setModalShow] = useState(false);

    const [contractContent, setContractContent] = useState([]);

    const clickedContract  = (value, isOpen) =>{
        console.log("clicked", value);
        setModalShow(isOpen);   
        setContractContent(value)
    }
    // test
    
    
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
                <ContractCommPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data = {contractContent}
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
                    return song;
                }
            }).map((song, key) => (
            <Card key={(key)}>

                <Card.Body>
                    <Card.Title>{song.song_title}</Card.Title>
                    <Card.Text className="text_sub">
                        <div>by <span className='text_bold'>{song.artist_name}</span></div>
                        <div className='text_italic'>{song.label_name}</div>
                        <div className='text_italic'>{song.total_fee}</div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">{song.creation_date}</h5>
                    <Button key={key} onClick={() => clickedContract(song, true)} variant="primary" className="py-2 px-5 card_button">
                        View
                    </Button>
                </Card.Footer>
            </Card>
            ))}
        </>
    );
}

export default CardCommContract;