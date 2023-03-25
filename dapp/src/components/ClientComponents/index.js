import React, {useState}from 'react';

import Button from 'react-bootstrap/Button';

import BuySongs from './BuySongs'
import OwnedSongs from './OwnedSongs'

import ConnectIPFS from '../IPFSComponents/ConnectIPFS';

function Client() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };


    const displayAllInfo = async() => {
        ConnectIPFS.displayAllInfo();
    }

  return (
    <div>
        {/*<NotificationContainer/>*/}
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div className="px-4">
                    <h2 className="mx-4 mt-5 client_name">Client name</h2>
                    <h5 className="mx-4 text_sub">Role name</h5>
                </div>
                <div className="nav_btn_con">
                    <Button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}>
                    Buy songs
                    </Button>

                    <Button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}>
                    Owned songs
                    </Button>

                    {/* Replace with on website refresh */}
                    <Button
                    onClick="">
                    Display all Tokens
                    </Button>
                </div>
                    
            </div>
            
            <div className="col-sm-10 py-5 px-0 m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>Marketplace</h1>
                    <BuySongs/>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h1>Owned songs</h1>
                    <OwnedSongs/>
                </div>
            </div>

        </div>
        

      
    </div>
  );
}

export default Client;