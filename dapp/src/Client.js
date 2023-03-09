import { useState } from "react";
import "./App.css";
import "./Homepage.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Card from 'react-bootstrap/Card';

document.body.style.background = "#232226";

function BuySongs(){
    return(
        <div class="row py-4 px-5 card-deck">
            <Card>
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_pop">Price?</h5>
                    <Button variant="primary" className="py-2 px-5 card_button">
                        Buy
                    </Button>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_pop">Price?</h5>
                    <Button variant="primary" className="py-2 px-5 card_button">
                        Buy
                    </Button>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_pop">Price?</h5>
                    <Button variant="primary" className="py-2 px-5 card_button">
                        Buy
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

function OwnedSongs(){
    return(
        <div class="row py-4 px-5 card-deck">
            <Card className="card_owned">
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="card_owned">
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="card_owned">
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </div>
        
    );
}

function Homepage() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
    setToggleState(index);
    };

  return (
    <div>
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div className="px-4">
                    <h2 className="mx-4 mt-5 client_name">Client name</h2>
                    <h5 className="mx-4 text_sub">Role name</h5>
                </div>
                

                <div className="nav_btn_con">
                    <Button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}>
                    Buy songs
                    </Button>

                    <Button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}>
                    Owned songs
                    </Button>
                </div>
                <div className="px-4 mx-4 logout_btn_con">
                    <Button className="submit-button py-2 px-5 logout_btn">
                        Logout
                    </Button>
                </div>
                    
            </div>
            
            <div className="col-sm-10 py-5 px-0 m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>Marketplace</h1>
                    <BuySongs/>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h1>Owned songs</h1>
                    <OwnedSongs/>
                </div>
            </div>

        </div>
        

      
    </div>
  );
}

export default Homepage;