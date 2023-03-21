import './App.css';
import WalletCard from './WalletCard';
import erc721abi from './erc721ABI.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayInfo from './components/DisplayInfo/DisplayInfo';
import SafeMint from './components/safeMint/SafeMint'

import { Link } from "react-router-dom";
import SafeTransferFrom from './components/safeTransferFrom/SafeTransferFrom';



function AddContract() {

  
  // for testing 
  return (
    
    <div className="d-flex justify-content-center flex-column ">
      <div className="App">
      <WalletCard/>
      </div>
      <div className="">
        <h2 >Add music contract (for testing)</h2>
      </div>
      <div>
        <form className="m-4" onSubmit="">
          <div className="d-flex flex-column justify-content-center">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="my-3 p-3 readtest_input"
                placeholder="Enter percent label"
              />
              <input
                type="text"
                name="addr"
                className="my-3 p-3 readtest_input"
                placeholder="Enter percent artist"
              />
              <input
                type="text"
                name="addr"
                className="my-3 p-3 readtest_input"
                placeholder="Enter address of owner"
              />
              <input
                type="text"
                name="addr"
                className="my-3 p-3 readtest_input"
                placeholder="Enter percent artist"
              />
               <select className='my-3 p-3 readtest_input'>
                <option value="">Commercial</option>
                <option value="">Streaming</option>
              </select>
            </div>
            
            <div>
              <button
                type="submit"
                className="submit-button py-3 px-5 btn_mod">
                Add contract
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
    
  );
}

function ReadContract() {
  // for testing 

  /*Percentage Cuts, address of Artist/Label, details of Contract related to the music/client. */
  return (
    <div className="d-flex justify-content-center flex-column">
      <div className='readtest_con'>
        <h2 >Read music contract (for testing)</h2>
      </div>
      <div>
        {/* <form className="m-4" onSubmit="">
          <div className="d-flex justify-content-center flex-column">
            <div className="my-3 px-5">
              <input
                type="text"
                name="addr"
                className="p-3 addtest_input"
                placeholder="Enter music contract address"
              />
            </div>
            <div>
              <button
                type="submit"
                className="submit-button my-3 py-3 px-5 btn_mod">
                Get contract info
              </button>
            </div>
          </div>
        </form> */}
        
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Percent label</div>
          <div className="col-sm-9" >Percent label</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Percent artist</div>
          <div className="col-sm-9" >Percent artist</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Total fee</div>
          <div className="col-sm-9" >Total fee</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Creation date</div>
          <div className="col-sm-9" >Creation date</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Client address</div>
          <div className="col-sm-9" >Client address</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Artist address</div>
          <div className="col-sm-9" >Artist address</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Label address</div>
          <div className="col-sm-9" >Label address</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Contract type</div>
          <div className="col-sm-9" >Contract type</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Status</div>
          <div className="col-sm-9" >Status</div>
        </div>
        <div className='con_sub con_radius box_contractinfo px-5 my-4 row'>
          <div className="col-sm-3 box_contractinfo_label" >Owner address</div>
          <div className="col-sm-9" >Owner address</div>
        </div>
      </div>
    </div>
  );
}

function Buttons(){
  return(
    <div>
      <h1>Buttons</h1>
      <button
        type=""
        className=" m-3 py-3 px-5 btn_mod">
        Button 1
      </button>
      <button
        type=""
        className=" m-3 py-3 px-5 btn_mod">
        Button 2
      </button>
      <button
        type=""
        className=" m-3 py-3 px-5 btn_mod">
        Button 3
      </button>
    </div>
  );
}

function InputOutput(){
  return(
    <div>
      <h1>I/O</h1>

        <SafeMint/>
        <SafeTransferFrom/>
        
    </div>
  );
}


function Test() {
  return (
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
    
  <div className="container-fluid p-4">
    <div className='test_con d-flex flex-column justify-content-center'>
      <div className='con_sub con_radius m-3 mb-4 p-5 addtest_con'>
        <AddContract />
      </div>
      <div className='con_main con_radius m-3 mt-5 readtest_con'>
        <ReadContract />
      </div>
      <div className="line">---------------------------------------------------------------------------------------------------------------------------------------------------------</div>
      <div className='con_main con_radius m-3 mt-5 displaytest_con'>
        <DisplayInfo/>
      </div>
      <div className='con_main con_radius m-3 mt-5 displaytest_con'>
        <InputOutput/>
      </div>
      <div className='con_main con_radius m-3 mt-5 displaytest_con'>
        <Buttons/>
      </div>
    </div>
  </div>
  );
}

export default Test;
