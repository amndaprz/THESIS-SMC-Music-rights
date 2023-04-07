import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ConfirmStream from "../Modals/ConfirmStream";
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';


let account;

function StreamForm(){
    const [modalShow, setModalShow] = React.useState(false);

    // Inputs
    const [smrcAddress, setSMRCAddress] = useState('');
    const [numStreams, setNumStreams] = useState('');

    // onChange Handlers
    const handleSMRCAddress = (event) => { setSMRCAddress(event.target.value); }
    const handleNumStreams = (event) => { setNumStreams(event.target.value); }

    const simulateStreamPayout = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        const batch = new web3.BatchRequest();

        console.log("SMRC Address = " + smrcAddress)
        console.log("numStreams = " + numStreams);

        const testAddress1 = "0xAaB410B1489f49c52516519aCd2eFed002653260";
        const testAddress2 = "0xF0Aba17b873c2E48F83008402AAF9ea829dfe9aa";
        const Addr1Percent = 30;
        const Addr2Percent = 70;
        const totalFee = 3;

        const addr1Cut = totalFee * (Addr1Percent/100);
        const addr2Cut = totalFee * (Addr2Percent/100);

        const valueInWei1 = web3.utils.toWei(addr1Cut.toString(), 'ether');
        const valueInWei2 = web3.utils.toWei(addr2Cut.toString(), 'ether');
        console.log(addr1Cut);
        console.log(addr2Cut);


        const tx1Req = web3.eth.sendTransaction({from: account, to: testAddress1, value: valueInWei1, gas: 21000});
        const tx2Req = web3.eth.sendTransaction({from: account, to: testAddress2, value: valueInWei2, gas: 21000});
        
        batch.add(tx1Req);
        batch.add(tx2Req);

        batch.execute();

        tx2Req.on('confirmation', (confirmationNumber, receipt) => {

            console.log(confirmationNumber);
            console.log(receipt);
            if( confirmationNumber === 1){

            }else if( confirmationNumber === 0){
                batch.cancel(tx1Req.requestManager.provider, tx1Req.id);
            }
        });
    

        // try{
        //     if(await web3.eth.sendTransaction({from: account, to: testAddress1, value: valueInWei1, gas: 21000})){
        //         console.log("Transfered " + addr1Cut + " to address 1: " + testAddress1);
                
        //         if(await web3.eth.sendTransaction({from: account, to: testAddress2, value: valueInWei2, gas: 21000})){
        //             console.log("Transfered " + addr2Cut + " to address 2: " + testAddress2);
        //         }
    
        //     }
        // }catch (e){
            
        // }
       
        

    }


    return(
        <form className="mx-4 mt-5" onSubmit="">
            <ConfirmStream
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div className="input_con">
              <h3 className="mb-4 ">Stream simulation</h3>
  
              <div className="my-3 p-4 input_contract">
                  <p className="text_sub p-0 m-0">Enter SMRC address :
                  <input type="text" name="addr" className="inputfield_contract" placeholder="Type here"  value = {smrcAddress} onChange={handleSMRCAddress} />
                  </p>
              </div>
              <div className="my-3 p-4 input_contract">
                  <p className="text_sub p-0 m-0">Enter N streams :
                  <input type="text" name="addr" className="inputfield_contract" placeholder="Type here" value = {numStreams} onChange={handleNumStreams} />
                  </p>
              </div>
              <div>
                <Button
                    className="submit-button mt-3 py-3 px-5 btn_mod"
                    onClick={() => setModalShow(true)}>
                    Simulate
                </Button>

                <Button
                    className="submit-button mt-3 py-3 px-5 btn_mod"
                    onClick={simulateStreamPayout}>
                    Simulate w/o Modal
                </Button>
              </div>
            </div>
          </form>
    );
  }

export default StreamForm;