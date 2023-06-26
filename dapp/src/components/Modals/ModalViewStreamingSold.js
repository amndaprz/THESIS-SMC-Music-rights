import Modal from 'react-bootstrap/Modal';

function ContractStreamPopup(props){

    return (
      <Modal
        contentClassName="modal_box_contract"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter modal_view"
        centered
      >
        <Modal.Header closeButton className='pb-0'>
            <h4 className='col-sm-6'>{props.data.song_title}</h4>
            <div className='col-sm-6 text_pop modal_contracttype'>Streaming</div>
        </Modal.Header>
        <Modal.Body>
            <div className='py-0 m-0'>
                <div className='row text_sub'>
                    <div>by <span className='text_bold'>{props.data.artist_name}</span></div>
                    <div className='text_italic'>{props.data.label_name}</div>
                </div>
                <div className='row my-2'>
                    <div className='col m-3  modal_percentartist_con'>
                        <div>Label</div>
                        <div className='modal_percentartist'>{props.data.percent_label}%</div>
                    </div>
                    <div className='col m-3  modal_percentlabel_con'>
                        <div>Artist</div>
                        <div className='modal_percentartist'>{props.data.percent_artist}%</div>
                    </div>
                </div>
                <table className='table_con'>
                    <tr>
                        <td className='table_header'>Creation date:</td>
                        <td className='table_date text_sub'>{props.data.creation_date}</td>
                    </tr>
                    <tr>
                        <td className='table_header'>End date:</td>
                        <td className='table_date text_sub'>{props.data.end_date}</td>
                    </tr>
                    <tr>
                        <td className='table_header'>Fee per stream:</td>
                        <td className='table_fee text_pop'><h4>{props.data.total_fee} ETH</h4></td>
                    </tr>
                </table>
            </div>
            
        </Modal.Body>
      </Modal>
    );
  }

export default ContractStreamPopup;