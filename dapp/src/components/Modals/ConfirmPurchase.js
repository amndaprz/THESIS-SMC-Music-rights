import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import CardBuy from '../Cards/CardBuy';
import {contractAddress, contractABI, web3, contract, contract_RA} from '../../ContractProperties';

let account;

function ConfirmPurchasePopup(props) {
    console.log(typeof props.data.total_fee)
    //const cardBuy = new CardBuy();
    //cardBuy.buy

    const buySong = async() => {

        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        let addresses = await contract_RA.methods.getAddresses().call();
        let username;
        let artist_address, label_address;

        for (let key in addresses)
        {
            username = await contract_RA.methods.getAlias(addresses[key]).call();

            if(props.data.artist_name === username)
            {
                console.log("nice")
                artist_address = addresses[key];
            }
            if(props.data.label_name === username)
            {
                console.log("good")
                label_address = addresses[key];
            }

            
            //if(label_)
        }

        console.log("TOTAL FEE: " + props.data.total_fee);
        await contract.methods.transferBuyout(account, parseInt(props.data.token_id), parseInt(props.data.total_fee), parseInt(props.data.percent_label), parseInt(props.data.percent_artist), artist_address, label_address).send({from: account, to: label_address, gas: 800000, value: parseInt(props.data.total_fee)});

        props.onHide();
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
                <h4 className='mb-3'>{props.data.song_title}</h4>
                <table className='table_con'>
                <tr>
                    <td className='table_header text_sub'>Artist:</td>
                    <td>{props.data.artist_name}</td>
                </tr>
                <tr>
                    <td className='table_header text_sub'>Label:</td>
                    <td>{props.data.label_name}</td>
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