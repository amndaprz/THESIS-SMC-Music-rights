import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import {contractAddress, contractABI, web3, contract, contract_RA, contract_Stream} from '../../ContractProperties';

let account; 
function ProposalStreamPopup(props){

    console.log("HATDOG");
    console.log(props.tokenID);
    const mintWithToken = async() => {
        notify("Signing contract...");
        const accounts = await web3.eth.requestAccounts();
        account = accounts[0];
        if(await contract_Stream.methods.signStream(props.tokenID).send({from: account, sender: account })){
            notify("Signed contract");
            console.log("Minting successful");
        }
        window.location.reload();
    }

    const rejectProposal = async() => {
        notify("Declining contract...");
        const accounts = await web3.eth.requestAccounts();
        account = accounts[0];
        if(await contract_Stream.methods.rejectStream(props.tokenID).send({from: account, sender: account })){
            notify("Declined contract");
            console.log("Minting successful");
        }
        window.location.reload();
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
      <Modal
        contentClassName="modal_box_contract"
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
                                    marginBottom: "-170px", 
                                    marginLeft:"-640px",
                                    bottom:"0px", 
                                    position:"absolute"}}
                />
        <Modal.Header closeButton className='pb-0'>
            <h4 className='col-sm-6'>{props.songs.song_title}</h4>
            <div className='col-sm-6 text_pop modal_contracttype'>Streaming</div>
        </Modal.Header>
        <Modal.Body>
            <div className='py-0 m-0'>
                <div className='row text_sub'>
                    <div>by <span className='text_bold'>{props.songs.artist_name}</span></div>
                    <div className='text_italic'>{props.songs.label_name}</div>
                </div>
                <div className='row my-2'>
                    <div className='col m-3  modal_percentartist_con'>
                        <div>Label</div>
                        <div className='modal_percentartist'>{props.songs.percent_label}%</div>
                    </div>
                    <div className='col m-3  modal_percentlabel_con'>
                        <div>Artist</div>
                        <div className='modal_percentartist'>{props.songs.percent_artist}%</div>
                    </div>
                </div>
                <table className='table_con'>
                    <tr>
                        <td className='table_header'>Creation date:</td>
                        <td className='table_date text_sub'>{props.songs.creation_date}</td>
                    </tr>
                    <tr>
                        <td className='table_header'>End date:</td>
                        <td className='table_date text_sub'>{props.songs.end_date}</td>
                    </tr>
                    <tr>
                        <td className='table_header'>Total fee:</td>
                        <td className='table_fee text_pop'><h4>{props.songs.total_fee} ETH</h4></td>
                    </tr>
                </table>
            </div>
            
        </Modal.Body>
        <Modal.Footer className='mt-3'>
        <Button className="py-2 px-3 modal_btn_sub" onClick={rejectProposal}>
                Decline
            </Button>
            <Button className="py-2 px-5 modal_btn" onClick={mintWithToken}>
                Sign
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ProposalStreamPopup;