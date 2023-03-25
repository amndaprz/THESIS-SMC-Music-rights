import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ConnectIPFS from "./../IPFSComponents/ConnectIPFS"
import ConfirmPurchasePopup from '../Modals/ConfirmPurchase'


function CardBuy(props){
    const [modalShow, setModalShow] = React.useState(false);    
    console.log("PROPS = " +props.percent_artist);

    //console.log("HERE HERE CARDBUY" + jsonObject.percent_artist);
    // const artistPercent = jsonObject.percent_artist;
    // const labelPercent = jsonObject.percent_label;
    // console.log(artistPercent);
    
    return(
        <Card>
            <ConfirmPurchasePopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    <div></div>
                    <div></div>
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