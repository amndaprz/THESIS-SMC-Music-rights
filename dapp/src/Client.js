import React, { useState } from 'react';
import "./App.css";
import "./Homepage.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Card from 'react-bootstrap/Card';

import "./Notif.css";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


document.body.style.background = "#232226";

function ConfirmPurchasePopup(props) {

    return (
        <Modal
          contentClassName="modal_purchase_confirm"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter modal_view"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='modal_confirm_title'>
                        Purchase Confirmation
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="confirm_subtitle">
                    Please confirm your purchase below.
                </div>
                <div className="confirm_con">
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Track title</div>
                        <div className="col-sm-9 text_sub" >Track title</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Artist name</div>
                        <div className="col-sm-9 text_sub" >Artist name</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Label name</div>
                        <div className="col-sm-9 text_sub" >Label name</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Total fee</div>
                        <div className="col-sm-9 text_sub" >Total fee</div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="py-2 px-5 modal_btn_sub">Cancel</Button>
                <Button onClick={props.onHide} className="py-2 px-5 modal_btn">Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}
  



class Example extends React.Component {
    createNotification = (type) => {
      return () => {
        switch (type) {
          case 'success':
            NotificationManager.success( 'Purchase Successful!'); //Success
            break;
          case 'error':
            NotificationManager.error('Purchase Failed!'); //Error
            break;
        }
      };
    };
  
    render() {
      return (
        <div>
            
            <Modal
          contentClassName="modal_purchase_confirm"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter modal_view"
          centered
        >
            
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='modal_confirm_title'>
                        Purchase Confirmation
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="confirm_subtitle">
                    Please confirm your purchase below.
                </div>
                <div className="confirm_con">
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Track title</div>
                        <div className="col-sm-9 text_sub" >Track title</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Artist name</div>
                        <div className="col-sm-9 text_sub" >Artist name</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Label name</div>
                        <div className="col-sm-9 text_sub" >Label name</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Total fee</div>
                        <div className="col-sm-9 text_sub" >Total fee</div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide} className="py-2 px-5 modal_btn_sub">Cancel</Button>
                <Button className='py-2 px-5 modal_btn'
                    onClick={this.props.onHide}>Confirm
                </Button>
                
                {/* ERROR
                <button className='py-2 px-5 modal_btn'
                    onClick={this.createNotification('error')}>Confirm
                </button> 
                SUCCESS
                {this.createNotification('success')}                
                */} 

            </Modal.Footer>
        </Modal>
        </div>
            
          
      );
    }
  }


function BuySongs(){
    const [modalShow, setModalShow] = React.useState(false);    
    
    return(
        <div class="row py-4 px-5 card-deck">
            <ConfirmPurchasePopup
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
                <Card.Footer className="text-muted">
                    <h5 className="text_pop">Total fee</h5>
                    <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
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
                    <h5 className="text_pop">Total fee</h5>
                    <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
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
                    <h5 className="text_pop">Total fee</h5>
                    <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
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

function Client() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
    setToggleState(index);
    };

  return (
    <div>
        <NotificationContainer/>
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

export default Client;