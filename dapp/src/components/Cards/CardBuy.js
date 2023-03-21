import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import ConfirmPurchasePopup from '../Modals/ConfirmPurchase'

function CardBuy(){
    const [modalShow, setModalShow] = React.useState(false);    
    
    return(
        <Card>
            <ConfirmPurchasePopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    <div>Artist name</div>
                    <div>Label name</div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 className="text_pop">Total fee</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                    Buy
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default CardBuy;