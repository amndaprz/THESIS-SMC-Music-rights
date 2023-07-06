import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {web3, contract, contract_RA} from '../../ContractProperties';
import { ToastContainer, toast } from 'react-toastify';

let account;

function ConfirmPurchasePopup(props) {
    console.log(typeof props.data.total_fee)
    
    const buySong = async() => {
        //notify("zsfas");
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
        }

        console.log("TOTAL FEE: " + props.data.total_fee);

        const totalFeePay = props.data.total_fee;
      
        const pLabel = parseInt(props.data.percent_label);
        const pArtist = parseInt(props.data.percent_artist);

        const labelCut = totalFeePay * (pLabel / 100);
        const artistCut = totalFeePay * (pArtist / 100);

        const labelCutWei = web3.utils.toWei(labelCut.toString(), 'ether');
        const artistCutWei = web3.utils.toWei(artistCut.toString(), 'ether');

        notify("Transferring fees to label and artist...");
        if(await web3.eth.sendTransaction({ from: account, to: label_address, value: labelCutWei})){
            notify("Transferred fee to Label");
        }
        else{
            notifyWarn("Transfer unsuccessful!");
        }; // Label Cut

        //notify("Transferring fee to Artist...");
        if(await web3.eth.sendTransaction({ from: account, to: artist_address, value: artistCutWei })){
            notify("Transferred fee to Artist");
        }
        else{
            notifyWarn("Transfer unsuccessful!");
        }; // Artist Cut
        
        //notify("Purchasing song...");
        // await web3.eth.sendTransaction({ from: account, to: artist_address, value: artistCutWei }); // Artist Cut
        if(await contract.methods.transferBuyout(account, parseInt(props.data.token_id), parseInt(props.data.total_fee), parseInt(props.data.percent_label), parseInt(props.data.percent_artist), artist_address, label_address).send({from: account, to: label_address})){
            notify("Purchase successful!");
        }
        else{
            notifyWarn("Purchase unsuccessful");
        };

        window.location.reload();

        props.onHide();
    }

    const notify = (message) => {
        toast(message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
    }

    const notifyWarn = (message) => {
        toast.warn(message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
    }

    return (
        <>
            <Modal
            contentClassName="modal_purchase_confirm"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter modal_view"
            centered
            >
                <ToastContainer
                    theme="dark"
                    closeOnClick={true}
                    autoClose={2000}
                    toastStyle={{ backgroundColor: "#232226", 
                                    marginBottom: "-230px", 
                                    marginLeft:"-700px",
                                    bottom:"0px", 
                                    position:"absolute"}}
                />
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
                    <tr>
                        <td className='table_header text_sub'>Total fee:</td>
                        <td className='text_pop'><h5>{props.data.total_fee} ETH</h5></td>
                    </tr>
                </table>
                </Modal.Body>
                <Modal.Footer className='mt-3'>
                    {/* change to buySong */}
                    <Button onClick={props.onHide} className="py-2 px-4 modal_btn_sub">Cancel</Button>
                    
                    <Button onClick={() => { buySong(); }} className="py-2 px-4 modal_btn">Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmPurchasePopup;