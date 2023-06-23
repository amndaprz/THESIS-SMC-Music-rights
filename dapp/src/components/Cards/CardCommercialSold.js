import React, { useState } from 'react';

//import ContractStreamPopup from '../Modals/ContractStream';
import ContractCommPopup from '../Modals/ModalViewCommercialSold';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

    return (
        <>
            <ContractCommPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
                data = {contractContent}
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
                    <h5 class="text_pop">{jsonObj.data.total_fee} ETH</h5>
                    <Button key={jsonObj.keys} onClick={() => clickedContract(jsonObj.data, true)} variant="primary" className="py-2 px-5 card_button">
                        View
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
}

export default CardCommContract;