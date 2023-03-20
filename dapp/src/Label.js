import React, { useState } from 'react';
import "./App.css";
import "./Homepage.css";

import 'reactjs-popup/dist/index.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';


document.body.style.background = "#232226";

function ContractPopup(props) {

    return (
      <Modal
        contentClassName="modal_box_contract"
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
            <div className='contract_con py-0 m-0'>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Percent label</div>
                    <div className="col-sm-9 text_sub" >Percent label</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Percent artist</div>
                    <div className="col-sm-9 text_sub" >Percent artist</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Total fee</div>
                    <div className="col-sm-9 text_sub" >Total fee</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Creation date</div>
                    <div className="col-sm-9 text_sub" >Creation date</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Client address</div>
                    <div className="col-sm-9 text_sub" >Client address</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Artist address</div>
                    <div className="col-sm-9 text_sub" >Artist address</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Label address</div>
                    <div className="col-sm-9 text_sub" >Label address</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Contract type</div>
                    <div className="col-sm-9 text_sub" >Contract type</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Status</div>
                    <div className="col-sm-9 text_sub" >Status</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Owner address</div>
                    <div className="col-sm-9 text_sub" >Owner address</div>
                </div>
            </div>
            
        </Modal.Body>
      </Modal>
    );
  }

  function ProposalPopup(props) {

    return (
        <Modal
        contentClassName="modal_box_proposal"
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
            <div className='contract_con py-0 m-0'>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Percent label</div>
                    <div className="col-sm-9 text_sub" >Percent label</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Percent artist</div>
                    <div className="col-sm-9 text_sub" >Percent artist</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Total fee</div>
                    <div className="col-sm-9 text_sub" >Total fee</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Creation date</div>
                    <div className="col-sm-9 text_sub" >Creation date</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Client address</div>
                    <div className="col-sm-9 text_sub" >Client address</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Artist address</div>
                    <div className="col-sm-9 text_sub" >Artist address</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Label address</div>
                    <div className="col-sm-9 text_sub" >Label address</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Contract type</div>
                    <div className="col-sm-9 text_sub" >Contract type</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Status</div>
                    <div className="col-sm-9 text_sub" >Status</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Owner address</div>
                    <div className="col-sm-9 text_sub" >Owner address</div>
                </div>
            </div>
            
        </Modal.Body>
        <Modal.Footer>
        <Button className="py-2 px-5 modal_btn_sub">
                Decline
            </Button>
            <Button className="py-2 px-5 modal_btn">
                Sign
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }

function AddStreamingContract(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);
    return(
        <form className="m-4" onSubmit="">
          <div className="my-3 input_con">
          <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter percent label :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter percent artist :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Creation date :<input
                    type="date"
                    name="addr"
                    disabled="true"
                    className="inputfield_contract"
                    defaultValue={date}
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">End date :<input
                    type="date"
                    name="addr"
                    disabled="true"
                    className="inputfield_contract"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter address of label :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter address of artist :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter fee per stream :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
          
          <div className="py-4">
            <button
              type="submit"
              className="submit-button py-3 px-5 btn_mod">
              Add contract
            </button>
          </div>
        </div>
      </form>
    );
}


function AddCommercialContract(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    return(
        <form className="m-4" onSubmit="">
          <div className="my-3 input_con">
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter percent label :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter percent artist :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Creation date :<input
                    type="date"
                    name="addr"
                    disabled="true"
                    className="inputfield_contract"
                    defaultValue={date}
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter address of label :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter address of artist :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
          
          <div className="py-4">
            <button
              type="submit"
              className="submit-button py-3 px-5 btn_mod">
              Add contract
            </button>
          </div>
        </div>
      </form>
    );
}

function ViewListedSongs() {
    return(
        <div class="row py-4 px-5 card-deck">
            <Card>
                <Card.Body>
                    <Card.Title>Track title</Card.Title>
                    <Card.Text>
                        Artist name
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">Stream count</h5>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Track title</Card.Title>
                    <Card.Text>
                        Label name
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">Stream count</h5>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Track title</Card.Title>
                    <Card.Text>
                        Label name
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">Stream count</h5>
                </Card.Footer>
            </Card>
        </div>
        
    );
}

function ViewContracts(){
    const [modalShow, setModalShow] = React.useState(false);

    return(
        
        <div class="row py-4 px-5 card-deck">

        <ContractPopup
            show={modalShow}
            onHide={() => setModalShow(false)}
        />

        <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Date</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                    View
                </Button>
            </Card.Footer>
        </Card>

        <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Date</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                    View
                </Button>
            </Card.Footer>
        </Card>

        <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Date</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                    View
                </Button>
            </Card.Footer>
        </Card>        
      
           
        </div>
    );
}

function ViewContractProposals(){
    
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div class="row py-4 px-5 card-deck">
            <ProposalPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Card>
                <Card.Body>
                    <Card.Title>Track title</Card.Title>
                    <Card.Text>
                        Label name
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 class="text_sub">Date</h5>
                    <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                        View
                    </Button>
                </Card.Footer>
            </Card>

            <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Date</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                    View
                </Button>
            </Card.Footer>
        </Card>

        <Card>
            <Card.Body>
                <Card.Title>Track title</Card.Title>
                <Card.Text>
                    Label name
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <h5 class="text_sub">Date</h5>
                <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 card_button">
                    View
                </Button>
            </Card.Footer>
        </Card>
        </div>
    );
}

function Payout() {
    return(
        <form className="m-4" onSubmit="">
            <div className="my-3 input_con">
                <div className='con_sub con_radius balance_info p-4 my-3 row'>
                    <div className="col-sm-3 balanceinfo_label" >Balance</div>
                    <div className="col-sm-9 text_sub" >Balance</div>
                </div>
                <input
                type="text"
                name="addr"
                className="my-3 p-4 input_contract"
                placeholder="Enter amount to withdraw"
                />
            
            <div className="py-4">
                <button
                type="submit"
                className="submit-button py-3 px-5 btn_mod">
                Withdraw
                </button>
            </div>
            </div>
        </form>
    );
}


function Artist() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
    setToggleState(index);
    };

    const [toggleState2, setToggleState2] = useState(1);

    const toggleTab2 = (index) => {
    setToggleState2(index);
    };


  return (
    <div>
        <div className="row p-0 m-0 card_con">
            
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div className="px-4">
                    <h2 className="mx-4 mt-5 client_name">Label name</h2>
                    <h5 className="mx-4 text_sub">Role name</h5>
                </div>
                

                <div className="nav_btn_con">
                    <Button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}>
                    Add contract
                    </Button>

                    <Button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}>
                    View listed songs
                    </Button>

                    <Button
                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(3)}>
                    View contracts
                    </Button>

                    <Button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}>
                    View contract proposals
                    </Button>

                    <Button
                    className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(5)}>
                    Payout
                    </Button>
                </div>
            </div>
            
            <div className="col-sm-10 py-5  m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>Add contract</h1>
                    <div className=" mt-5 mb-4">Please choose a contract type below:</div>
                    <div className="row">
                        <div className="col">
                            <Button
                                className={toggleState2 === 1 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                onClick={() => toggleTab2(1)}>
                                Commercial
                            </Button>
                        </div>
                        <div className="col">
                            <Button
                                className={toggleState2 === 2 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                onClick={() => toggleTab2(2)}>
                                Streaming
                            </Button>
                        </div>
                    </div>
                    <div className={toggleState2 === 1 ? "content  active-content" : "content"}>
                        <AddCommercialContract/>
                    </div>
                    <div className={toggleState2 === 2 ? "content  active-content" : "content"}>
                        <AddStreamingContract/>
                    </div>
                    
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h1>View listed songs</h1>
                    <ViewListedSongs/>
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <h1>View contracts</h1>
                    <ViewContracts/>
                </div>

                <div className={toggleState === 4 ? "content  active-content" : "content"}>
                    <h1>View contract proposals</h1>
                    <ViewContractProposals/>
                </div>

                <div className={toggleState === 5 ? "content  active-content" : "content"}>
                    <h1>Payout</h1>
                    <Payout/>
                </div>
            </div>

        </div>
        
        
      
    </div>
  );
}

export default Artist;