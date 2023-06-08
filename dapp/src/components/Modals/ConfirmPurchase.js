import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import CardBuy from '../Cards/CardBuy';
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';


function ConfirmPurchasePopup(props) {
    console.log(props.content.songTitle)
    //const cardBuy = new CardBuy();
    //cardBuy.buy

    const buySong = async() => {
         
        const accounts = await web3.eth.requestAccounts();
		const account = accounts[0];

        // testETHTransfer()1
        console.log(props.percentA);
        console.log(props.percentL);
        console.log(props.addrA);
        console.log(props.addrL);
        console.log("------------")

        props.onHide();
        console.log("MUSIC BOUGHT");
    }


    return (
        <Modal
          contentClassName="modal_purchase_confirm"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter modal_view"
          centered
        >
            <Modal.Header closeButton className='pb-0'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>
                        Purchase Confirmation
                    </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4 text_sub">
                    Please confirm your purchase below.
                </div>
                <h4 className='mb-3'>{props.content.songTitle}</h4>
                <table className='table_con'>
                <tr>
                    <td className='table_header text_sub'>Artist:</td>
                    <td>Artist name</td>
                </tr>
                <tr>
                    <td className='table_header text_sub'>Label:</td>
                    <td>Label name</td>
                </tr>
            </table>
            </Modal.Body>
            <Modal.Footer className='mt-3'>
                {/* change to buySong */}
                <Button onClick={props.onHide} className="py-2 px-4 modal_btn_sub">Cancel</Button>
                
                <Button onClick={() => { buySong(); }} className="py-2 px-4 modal_btn">Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmPurchasePopup;