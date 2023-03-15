import React, { useState } from 'react';
import "./App.css";
import "./Homepage.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Card from 'react-bootstrap/Card';

document.body.style.background = "#232226";

function ConfirmOfferPopup(props) {

    return (
        <Modal
          contentClassName="modal_box_offer"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter modal_view"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                  <div className='modal_contract_title'>
                      Send offer
                  </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                Are your sure you want to send this offer?
            </div>
            <div>
                Track title:
            </div>
            <div>
                Artist name:
            </div>
            <div>
                Label title:
            </div>
            <div>
                Offer:
            </div>
              
          </Modal.Body>
        </Modal>
    );
}
  


function OfferPopup(props) {  
    return (
        <Modal
            contentClassName="modal_box_offer"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter modal_view"
            centered
        >
    
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                    <div className='modal_contract_title'>
                        Track title
                    </div>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="m-4 offer_con" onSubmit="">
                    <input
                    type="text"
                    name="addr"
                    className="p-4 input_offer"
                    placeholder="Enter proposed total fee"
                    />
                    <div className="py-4">
                        <button
                        type="submit"
                        className="submit-button py-3 px-5 btn_mod">
                        Send offer
                        </button>
                    </div>
                </form>
                
            </Modal.Body>
        </Modal>
      
    );
  }


function BuySongs(){
    const [modalShow, setModalShow] = React.useState(false);    
    return(
        <div class="row py-4 px-5 card-deck">
            <OfferPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Card>
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                    Buy
                </Button>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                    Buy
                </Button>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Track title skdg okfnaonfan asokoakf</Card.Title>
                    <Card.Text>
                        <div>Artist name</div>
                        <div>Label name</div>
                    </Card.Text>
                </Card.Body>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                    Buy
                </Button>
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