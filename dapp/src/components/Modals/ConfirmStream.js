import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmStream(props) {

    return (
        <Modal
          contentClassName="modal_stream_confirm"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter modal_view"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='modal_confirm_title'>
                        Stream simulation
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="confirm_subtitle">
                    Please confirm stream simulation below.
                </div>
                <div className="confirm_con">
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >SMRC address</div>
                        <div className="col-sm-9 text_sub" >SMRC address</div>
                    </div>
                    <div className='con_sub con_radius confirm_info px-5 my-3 row'>
                        <div className="col-sm-3 contractinfo_label" >Number of streams</div>
                        <div className="col-sm-9 text_sub" >Number of streams</div>
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

export default ConfirmStream;