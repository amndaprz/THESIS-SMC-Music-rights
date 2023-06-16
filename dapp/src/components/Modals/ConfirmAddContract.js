import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {contractAddress_Stream, contractABI_Stream, web3_Stream, contract_Stream} from '../../ContractProperties';

function ConfirmAddContract(props) {

    const addStreamSong = async() => {
         
        const accounts = await web3_Stream.eth.requestAccounts();
		const account = accounts[0];

        console.log("------------")
     
        // console.log("MUSIC streamed");

        if(await contract_Stream.methods.addStream().send({from:account, gas: 6000000, sender:account})){
            console.log("Initial Streaming contract minting successful");
            props.onHide();
        }
    }


    return (
        <Modal
          contentClassName="modal_box_add"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter modal_view"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='modal_confirm_title'>
                        Add Contract Confirmation
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="confirm_subtitle">
                    Please confirm your contract information below.
                </div>
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
                    <div className="col-sm-3 contractinfo_label" >Payment schedule</div>
                    <div className="col-sm-9 text_sub" >Payment schedule</div>
                </div>
                <div className='con_sub con_radius contract_info px-5 my-3 row'>
                    <div className="col-sm-3 contractinfo_label" >Owner address</div>
                    <div className="col-sm-9 text_sub" >Owner address</div>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="py-2 px-5 modal_btn_sub">Cancel</Button>
                <Button onClick={() => { addStreamSong(); }} className="py-2 px-5 modal_btn">Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmAddContract;