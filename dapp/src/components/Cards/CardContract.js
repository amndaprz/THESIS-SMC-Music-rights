import React, { useState } from 'react';

import ContractPopup from '../Modals/Contract';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";


function CardContract() {

    const [modalShow, setModalShow] = React.useState(false);

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
    return (
        <>
            <div className='row filter_con'>
                <div className='col search_con'>
                    <h4 className='search_title'>Search songs</h4>
                    <div className='input_search'>
                        <input className="inputfield_search" placeholder="Search" onChange={event => setQuery(event.target.value)} />
                        <FaSearch className='mx-2 mb-1' />
                    </div>

                </div>
                <div className='col sort_con'>
                    <h6 className='sort_title'>Sort by</h6>
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
            <Card>
                <ContractPopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <Card.Body>
                    <Card.Title>{song.title}</Card.Title>
                    <Card.Text className="text_sub">
                        Label - {song.label}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">Date</h5>
                    <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                        View
                    </Button>
                </Card.Footer>
            </Card>
            ))}
        </>
    );
}

export default CardContract;