import React from 'react';

import Card from 'react-bootstrap/Card';

function CardOwned(){
    return(
        <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text className="text_sub">
                    <div>Artist name</div>
                    <div>Label name</div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardOwned;
