import React, { useEffect, useState, useRef } from 'react';
import ContentLoader from 'react-content-loader'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Sound from './ding.mp3';

import { FaPause, FaPlay, FaSearch } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function CardStream() {

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

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);



    const [query, setQuery] = useState("");

    const getInitialSort = () => {
        const sort = "a-z";
        return sort;
    };

    const [sort, setValue] = useState(getInitialSort);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    Songs.sort((a, b) =>
        a.title > b.title ? 1 : -1,
    );

    if (sort === "z-a") {
        Songs.sort((a, b) =>
            a.title > b.title ? -1 : 1,
        );
    }


    const notify = (title, artist) => {
        new Audio(Sound).play()
        toast("Now playing:  " + title + " by " + artist);
        //console.log(event.target);
    }

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
                    <select value={sort} onChange={handleChange} className="input_sort ">
                        <option value="a-z">Song title, A-Z</option>
                        <option value="z-a">Song title, Z-A</option>
                    </select>

                </div>
                <ToastContainer
                    theme="dark"
                    closeOnClick={true}
                    autoClose={2000}
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
                    console.log("oasnasoi", song.label.toLowerCase().includes(query.toLowerCase()))
                    
                    return song;
                }

                if(!song.title.toLowerCase().includes(query.toLowerCase()) && 
                    !song.artist.toLowerCase().includes(query.toLowerCase()) &&
                    !song.label.toLowerCase().includes(query.toLowerCase())){
                }



            }).map((song, key) => (
                <Card key={(key)}>
                    {loading ? (
                        <ContentLoader
                            width={450}
                            height={140}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="10" y="16" rx="5" ry="5" width="250" height="12" />
                            <rect x="10" y="48" rx="5" ry="5" width="390" height="12" />
                            <rect x="10" y="110" rx="5" ry="5" width="250" height="12" />
                        </ContentLoader>
                    ) : (
                        <>  
                            <Card.Body>
                                <Card.Title>{song.title}</Card.Title>
                                <Card.Text className="text_sub">
                                    <div className='row'>
                                        <div className='col'>
                                            <div>by <span className='text_bold'>{song.artist}</span></div>
                                            <div className='text_italic'>{song.label}</div>
                                        </div>

                                        <Button className='col mx-2 play_btn' onClick={() => notify(song.title, song.artist)} key={key}>
                                            <FaPlay className='play_icon' />
                                        </Button>
                                    </div>

                                </Card.Text>
                            </Card.Body>
                            
                            
                        </>
                    )
                    }
                </Card>
                
            ))}
            
        </>

    );
}

export default CardStream;