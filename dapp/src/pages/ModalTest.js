import { useState, useEffect } from 'react';
import { Row, Table, Form, Button, Modal, Alert } from 'react-bootstrap';

const System = () => {
  const [tmpName, setTmpName] = useState();

  const [showName, setShowName] = useState(false);
  
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setShowName(false);
  }

  const handleCancel = () => {
    setShowName(false);
  };

  const handleSetNameSubmit = () => {
    console.log('tmpName: ', tmpName);
    //code to change the name to tmpName
    setSubmitted(modalButtonsPostSubmit);
  }

  const modalButtonsPreSubmit = () => {
    return (
      <>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSetNameSubmit}>
          Submit
        </Button>
      </>
    )
  };

  const modalButtonsPostSubmit = () => {
    return (
    <>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </>
    )
  };
  const buttons = submitted ? modalButtonsPostSubmit : modalButtonsPreSubmit;

  return (
    <>
    <div className="card">
      <h5>System</h5>
        <Table variant="dark" responsive>
          <tr>
            <td>Name:</td>
            <td>{showName} <Button onClick={() => setShowName(true)}>Edit</Button></td>
          </tr>
        </Table>
    </div>

    {/* Set Name */}
    <Modal show={showName} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>
          <Form.Control
            type="text"
            defaultValue={showName}
            onChange={(event) => setTmpName(event.target.value)}
          />
        </span>
      </Modal.Body>
      <Modal.Footer>
        {buttons}
        {/*<Button variant="secondary" onClick={handleCancel}>*/}
        {/*  Cancel*/}
        {/*</Button>*/}
        {/*<Button variant="primary" onClick={handleSetNameSubmit}>*/}
        {/*  Submit*/}
        {/*</Button>*/}
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default System;