import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ProposalCommPopup(props){

    return (
      <Modal
        contentClassName="modal_box_contract"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter modal_view"
        centered
      >
        <Modal.Header closeButton className='pb-0'>
            <h4 className='col-sm-6'>{props.songs.title}</h4>
            <div className='col-sm-6 text_pop modal_contracttype'>Commercial</div>
        </Modal.Header>
        <Modal.Body>
            <div className='py-0 m-0'>
                <div className='row text_sub'>
                    <div>by <span className='text_bold'>{props.songs.artist}</span></div>
                    <div className='text_italic'>{props.songs.label}</div>
                </div>
                <div className='row my-2'>
                    <div className='col m-3  modal_percentartist_con'>
                        <div>Label</div>
                        <div className='modal_percentartist'>30%</div>
                    </div>
                    <div className='col m-3  modal_percentlabel_con'>
                        <div>Artist</div>
                        <div className='modal_percentartist'>70%</div>
                    </div>
                </div>
                <table className='table_con'>
                    <tr>
                        <td className='table_header'>Creation date:</td>
                        <td className='table_date text_sub'>10/10/2023</td>
                    </tr>
                    <tr>
                        <td className='table_header'>Total fee:</td>
                        <td className='table_fee text_pop'><h4>0.000000000012 ETH</h4></td>
                    </tr>
                </table>
            </div>
            
        </Modal.Body>
        <Modal.Footer className='mt-3'>
        <Button className="py-2 px-3 modal_btn_sub">
                Decline
            </Button>
            <Button className="py-2 px-5 modal_btn">
                Sign
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ProposalCommPopup;