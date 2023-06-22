import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ConfirmPurchasePopup from '../Modals/ModalConfirmPurchase'
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';


let account;

function CardBuy(props){
    const [modalShow, setModalShow] = React.useState(false); 
    const jsonObj = props;

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

    const callTransferBuyout = async(isOpen) => {
        await contract.methods.transferBuyout(account, 1, convertedFee, props.percentL, props.percentA).send({from: account, to: props.addrL, value: convertedFee});
    }
    
    const [purchaseContent, setPurchaseContent] = useState([]);


    const buySongModal = async(value, isOpen) => {
        /*
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        testETHTransfer()
        // callTransferBuyout();
        console.log(props.percentA);
        console.log(props.percentL);
        console.log(props.addrA);
        console.log(props.addrL);
        console.log("------------")*/

        setModalShow(isOpen);  
        setPurchaseContent(value)

        //console.log(value.tokenID)
        //console.log(value.songTitle)

    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        } , 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);

    return(
            <>
            <ConfirmPurchasePopup
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data = {purchaseContent}
                />
            <Card key={(jsonObj.keys)}>
                
                {loading ? (
                    <ContentLoader
                        width={450}
                        height={185}
                        speed={2}
                        backgroundColor={'#383447'}
                        foregroundColor={'#2B2833'}
                    >
                        <rect x="5" y="16" rx="5" ry="5" width="250" height="12" />
                        <rect x="5" y="48" rx="5" ry="5" width="390" height="12" />
                        <rect x="5" y="80" rx="5" ry="5" width="390" height="12" />
                        <rect x="5" y="112" rx="5" ry="5" width="390" height="12" />
                        <rect x="5" y="154" rx="5" ry="5" width="170" height="12" />
                        <rect x="255" y="144" rx="5" ry="5" width="140" height="30" />
                    </ContentLoader>
                ): (
                    <>
                    <Card.Body>
                        <Card.Title>{jsonObj.data.song_title}</Card.Title>
                        <Card.Text className="text_sub">
                            <div>by <span className='text_bold'>{jsonObj.data.artist_name}</span></div>
                            <div className='text_italic'>{jsonObj.data.label_name}</div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <h5 className="text_pop">{jsonObj.data.total_fee} ETH</h5>
                        {/* <Button onClick={() => setModalShow(true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                            Buy
                        </Button>*/}
                        
                        <Button key={jsonObj.keys} onClick={() => buySongModal(jsonObj.data, true)} variant="primary" className="py-2 px-5 mx-2 card_button">
                            Buy
                        </Button>
                    </Card.Footer>
                    </>
                )}
            
            </Card>
        </>
    );
}

export default CardBuy;