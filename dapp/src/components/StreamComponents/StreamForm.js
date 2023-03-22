import React from 'react';
import Button from 'react-bootstrap/Button';
import ConfirmStream from "../Modals/ConfirmStream";

function StreamForm(){
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <form className="mx-4 mt-5" onSubmit="">
            <ConfirmStream
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="input_con">
              <h3 className="mb-4 ">Stream simulation</h3>
  
              <div className="my-3 p-4 input_contract">
                  <p className="text_sub p-0 m-0">Enter SMRC address :<input
                      type="text"
                      name="addr"
                      className="inputfield_contract"
                      placeholder="Type here"
                      />
                  </p>
              </div>
              <div className="my-3 p-4 input_contract">
                  <p className="text_sub p-0 m-0">Enter N streams :<input
                      type="text"
                      name="addr"
                      className="inputfield_contract"
                      placeholder="Type here"
                      />
                  </p>
              </div>
              <div>
                <Button
                    className="submit-button mt-3 py-3 px-5 btn_mod"
                    onClick={() => setModalShow(true)}>
                    Simulate
                </Button>
              </div>
            </div>
          </form>
    );
  }

export default StreamForm;