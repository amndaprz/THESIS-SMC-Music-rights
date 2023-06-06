import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import CardBuy from '../Cards/CardBuy';

function ConfirmPurchasePopup(props) {
    console.log(props.content.songTitle)
    //const cardBuy = new CardBuy();
    //cardBuy.buy

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
                        <div className="col-sm-9 text_sub" >{props.content.songTitle}</div>
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

export default ConfirmPurchasePopup;