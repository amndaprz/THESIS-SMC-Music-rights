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
            <div className="my-3 input_con">
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter percent label :<input
                        type="text"
                        name="addr"
                        className="inputfield_contract"
                        placeholder="Type here"
                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter percent artist :<input
                        type="text"
                        name="addr"
                        className="inputfield_contract"
                        placeholder="Type here"
                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Creation date :<input
                        type="date"
                        name="addr"
                        disabled="true"
                        className="inputfield_contract"
                        defaultValue={date}
                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">End date :<input
                        type="date"
                        name="addr"
                        disabled="true"
                        className="inputfield_contract"
                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter address of label :<input
                        type="text"
                        name="addr"
                        className="inputfield_contract"
                        placeholder="Type here"
                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter address of artist :<input
                        type="text"
                        name="addr"
                        className="inputfield_contract"
                        placeholder="Type here"
                        />
                    </p>
                </div>
                <div className="my-3 p-4 input_contract">
                    <p className="text_sub p-0 m-0">Enter fee per stream :<input
                        type="text"
                        name="addr"
                        className="inputfield_contract"
                        placeholder="Type here"
                        />
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