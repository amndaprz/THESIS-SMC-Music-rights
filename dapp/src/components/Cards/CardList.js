import Card from 'react-bootstrap/Card';

function CardList(){
    return(
        <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Artist/Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Stream count</h5>
            </Card.Footer>
        </Card>
    );
}

export default CardList;