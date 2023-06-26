import React, { useState } from 'react';

import ProposalPopup from '../Modals/ModalViewStreamingProposal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaSearch } from "react-icons/fa";

function CardContract(props){

    const jsonObj = props;
    //const hashes = props.hash;


    const [modalShow, setModalShow] = useState(false);

    const [contractContent, setContractContent] = useState([]);
    const [stringTokenID, setStringTokenID] = useState("");

    //console.log("WORD: " + hashes[0]);

    const clickedContract  = (value, isOpen) =>{
        console.log("clicked", value);
        setModalShow(isOpen);   
        setContractContent(value);
        setStringTokenID(value.token_id);
    }

    return(
        <>
        <ProposalPopup
            show={modalShow}
            onHide={() => setModalShow(false)}
            songs = {contractContent}
            tokenID = {stringTokenID}
        />
        <Card key={(jsonObj.keys)}>

            <Card.Body>
                <Card.Title>{jsonObj.data.song_title}</Card.Title>
                <Card.Text className="text_sub">
                    <div>by <span className='text_bold'>{jsonObj.data.artist_name}</span></div>
                    <div className='text_italic'>{jsonObj.data.label_name}</div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div>
                    <span className='text_sub'>
                        Total fee:
                    </span>
                    <h5 class="text_pop">{jsonObj.data.total_fee} ETH</h5>
                </div>
                
                <Button key={jsonObj.keys} onClick={() => clickedContract(jsonObj.data, true)} variant="primary" className="py-2 px-5 card_button_proposal">
                    View
                </Button>
            </Card.Footer>
        </Card>
        </>
    );
}

export default CardContract;