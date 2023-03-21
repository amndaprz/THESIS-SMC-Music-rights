import React from 'react';

import ContractPopup from '../Modals/Contract';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardContract(){

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <Card>
            <ContractPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Artist/Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Date</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                    View
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default CardContract;