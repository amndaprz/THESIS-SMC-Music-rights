import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function StreamForm(){
  return(
      <form className="mx-4 mt-5" onSubmit="">
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
              <button
                  type="submit"
                  className="submit-button mt-3 py-3 px-5 btn_mod">
                  Simulate
              </button>
            </div>
          </div>
        </form>
  );
}


function Stream() {
  return (
  <div className="container-fluid p-4">
    <div className='test_con d-flex flex-column justify-content-center'>
      <div className='con_main con_radius m-5 displaytest_con'>
        <StreamForm/>
      </div>
    </div>
  </div>
  );
}

export default Stream;
