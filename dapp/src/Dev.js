import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function InputOutput(){
  return(
    <div>
      <form className="mx-4 mt-5" onSubmit="">
          <div className="d-flex justify-content-center flex-column">
            <h3>safeMint</h3>
            <div className="my-3 px-5">
              <input
                type="text"
                name="addr"
                className="p-3 addtest_input"
                placeholder="to: (address)"
              />
            </div>
            <div>
              <button
                  type="submit"
                  className="submit-button mb-3 py-3 px-5 btn_mod">
                  Transact
              </button>
            </div>
          </div>
        </form>

        <div className='con_sub con_radius box_contractinfo px-5 mb-5 row'>
          <div className="col-sm-3 box_contractinfo_label" >Output</div>
          <div className="col-sm-9" >Output</div>
        </div>

        <form className="mx-4 mt-5" onSubmit="">
          <div className="d-flex justify-content-center flex-column">
            <h3>safeMint</h3>
            <div className="my-3 px-5">
              <input
                type="text"
                name="addr"
                className="p-3 addtest_input"
                placeholder="to: (address)"
              />
            </div>
            <div>
              <button
                  type="submit"
                  className="submit-button mb-3 py-3 px-5 btn_mod">
                  Transact
              </button>
            </div>
          </div>
        </form>

        <div className='con_sub con_radius box_contractinfo px-5 mb-5 row'>
          <div className="col-sm-3 box_contractinfo_label" >Output</div>
          <div className="col-sm-9" >Output</div>
        </div>

        <form className="mx-4 mt-5" onSubmit="">
          <div className="d-flex justify-content-center flex-column">
            <h3>safeMint</h3>
            <div className="my-3 px-5">
              <input
                type="text"
                name="addr"
                className="p-3 addtest_input"
                placeholder="to: (address)"
              />
            </div>
            <div>
              <button
                  type="submit"
                  className="submit-button mb-3 py-3 px-5 btn_mod">
                  Transact
              </button>
            </div>
          </div>
        </form>

        <div className='con_sub con_radius box_contractinfo px-5 mb-5 row'>
          <div className="col-sm-3 box_contractinfo_label" >Output</div>
          <div className="col-sm-9" >Output</div>
        </div>
    </div>
  );
}


function Dev() {
  return (
  <div className="container-fluid p-4">
    <div className='test_con d-flex flex-column justify-content-center'>
      <div className='con_main con_radius m-5 displaytest_con'>
        <InputOutput/>
      </div>
    </div>
  </div>
  );
}

export default Dev;
