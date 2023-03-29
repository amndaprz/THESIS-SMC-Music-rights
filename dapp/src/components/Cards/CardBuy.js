import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ConnectIPFS from "./../IPFSComponents/ConnectIPFS"
import ConfirmPurchasePopup from '../Modals/ConfirmPurchase'
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';

let account;

function CardBuy(props){
    const [modalShow, setModalShow] = React.useState(false); 

    // console.log("PROPS = " + props.percentA);

    //console.log("HERE HERE CARDBUY" + jsonObject.percent_artist);
    // const artistPercent = jsonObject.percent_artist;
    // const labelPercent = jsonObject.percent_label;
    // console.log(artistPercent);

    const totalFee = 1;
    const convertedFee = web3.utils.toWei(totalFee.toString(), "ether");


    const testETHTransfer = async() => {
        // await contract.methods.transferETH(account, props.addrL, convertedFee).send({from: account, gasLimit: 500000000 });
        await web3.eth.sendTransaction({from: account, to: props.addrL, value: convertedFee, gas: 21000});
    }

    const callTransferBuyout = async() => {
        await contract.methods.transferBuyout(account, 1, convertedFee, props.percentL, props.percentA).send({from: account, to: props.addrL, value: convertedFee});
    }
       
    const buySong = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        testETHTransfer()
        // callTransferBuyout();
        console.log(props.percentA);
        console.log(props.percentL);
        console.log(props.addrA);
        console.log(props.addrL);
        console.log("------------")

    }




    return(
            <Card>
                <ConfirmPurchasePopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <Card.Body>
                    <Card.Title>Track title</Card.Title>
                    <Card.Text>
                        <div className="card_text">{props.percentA}</div>
                        <div className="card_text">{props.percentL}</div>
                        <div className="card_text">{props.addrA}</div>
                        <div className="card_text">{props.addrL}</div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <h5 className="text_pop">Total fee</h5>
                    {/* <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                        Buy
                    </Button>*/}
                    
                    <Button onClick={buySong} variant="primary" className="py-2 px-5 mx-2 card_button">
                        Buy Instantly
                    </Button>
                </Card.Footer>
            </Card>
        
    );
}

export default CardBuy;