import React from 'react';
import Button from 'react-bootstrap/Button';
import ConfirmAddContract from "../Modals/ConfirmAddContract";


function AddStreamingContract(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <form className="m-4" onSubmit="">
            <ConfirmAddContract
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="input_con">
                <div className="mb-3">
                    <span className='mx-3 my-2'>Song title</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Percent of label</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Percent of artist</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Creation date</span>
                    <p className="text_sub p-0 mt-2">
                    <input type="date" name="addr" disabled="true" className="inputfield_contract" defaultValue={date} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>End date</span>
                    <p className="text_sub p-0 mt-2">
                    <input type="date" name="addr" className="inputfield_contract" defaultValue={date} />
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Address of label</span>
                    <p className="text_sub p-0 mt-2">
                        <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Address of artist</span>
                    <p className="text_sub p-0 mt-2">
                    <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"/>
                    </p>
                </div>
                <div className="my-3">
                    <span className='mx-3 my-2'>Enter fee per stream</span>
                    <p className="text_sub p-0 mt-2">
                    <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"/>
                    </p>
                </div>
          
                <div className="py-4">
                    <Button
                        className="submit-button py-3 px-5 btn_mod"
                        onClick={() => setModalShow(true)}>
                        Add contract
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddStreamingContract;