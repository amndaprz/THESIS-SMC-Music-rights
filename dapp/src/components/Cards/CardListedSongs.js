import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";

function CardList(props){

    const jsonObj = props;
    console.log("card list" + jsonObj.data)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        } , 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);


    return(
        <>
        <Card key={(jsonObj.keys)}>
            <Card.Body>
                <Card.Title>{jsonObj.data.song_title}</Card.Title>
                <Card.Text className="text_sub">
                    <div>by <span className='text_bold'>{jsonObj.data.artist_name}</span></div>
                    <div className='text_italic'>{jsonObj.data.label_name}</div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_pop">{jsonObj.data.total_fee} ETH</h5>
            </Card.Footer>
        </Card>
    </>
    );
}

export default CardList;