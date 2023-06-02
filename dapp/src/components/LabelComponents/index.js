import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'

import Button from 'react-bootstrap/Button';

import AddCommercialContract from './AddCommercialContract';
import AddStreamingContract from './AddStreamingContract';
import ViewListedSongs from './ViewListedSongs';
import ViewContracts from './ViewContracts';
import ViewContractProposals from './ViewContractProposals';
import Payout from './Payout';

import { Link } from "react-router-dom";

import {FaFileContract, FaMoneyCheck, FaMusic, FaPlus, FaSignature } from "react-icons/fa";

document.body.style.background = "#232226";

function Label() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [toggleState2, setToggleState2] = useState(1);

    const toggleTab2 = (index) => {
        setToggleState2(index);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(t);
        }
    }, []);


    return (
        <div>
            <div className="row p-0 m-0 card_con">

                <div className="col-sm-2 p-0 m-0 nav_con">
                    {loading ? (
                        <ContentLoader
                            width={450}
                            height={1000}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="50" y="70" rx="5" ry="5" width="220" height="12" />
                            <rect x="50" y="102" rx="5" ry="5" width="220" height="12" />
                            <rect x="40" y="300" rx="5" ry="5" width="270" height="50" />
                            <rect x="40" y="370" rx="5" ry="5" width="270" height="50" />
                            <rect x="40" y="440" rx="5" ry="5" width="270" height="50" />
                            <rect x="40" y="510" rx="5" ry="5" width="270" height="50" />
                            <rect x="40" y="580" rx="5" ry="5" width="270" height="50" />
                        </ContentLoader>
                    ) : (
                        <>
                            <div className="px-4 pt-5 pb-3 user_con">
                                <img src="../tina_logo.png" alt="logo" className="mt-3 logo_tab" />
                                <h2 className="mx-4 mt-5 client_name">Label name</h2>
                                <h5 className="mx-4 text_sub">Role name</h5>
                            </div>
                        
                            <div className="nav_btn_con">
                                <Button
                                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(1)}>
                                    <FaPlus className='mx-3'/>Add contract
                                </Button>

                                <Button
                                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(2)}>
                                    <FaMusic className='mx-3'/>View listed songs
                                </Button>

                                <Button
                                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(3)}>
                                    <FaFileContract className='mx-3'/>View contracts
                                </Button>

                                <Button
                                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(4)}>
                                    <FaSignature className='mx-3'/>View contract proposals
                                </Button>

                                <Button
                                    className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(5)}>
                                    <FaMoneyCheck className='mx-3'/>Payout
                                </Button>
                            </div>
                        </>
                    )}
                    <div className="px-4 mx-4 logout_btn_con">
                        <Link to="/">
                            <Button className="submit-button py-2 px-5 logout_btn">
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="col-sm-10 py-5  m-0 content_con">
                    {loading ? (
                        <ContentLoader
                            width={1500}
                            height={1000}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="620" y="40" rx="5" ry="5" width="270" height="12" />
                            <rect x="595" y="130" rx="5" ry="5" width="320" height="12" />
                            <rect x="595" y="162" rx="5" ry="5" width="140" height="30" />
                            <rect x="775" y="162" rx="5" ry="5" width="140" height="30" />
                            <rect x="490" y="300" rx="5" ry="5" width="550" height="50" />
                            <rect x="490" y="370" rx="5" ry="5" width="550" height="50" />
                            <rect x="490" y="440" rx="5" ry="5" width="550" height="50" />
                            <rect x="490" y="510" rx="5" ry="5" width="550" height="50" />
                            <rect x="490" y="580" rx="5" ry="5" width="550" height="50" />
                            <rect x="490" y="650" rx="5" ry="5" width="550" height="50" />
                            <rect x="490" y="720" rx="5" ry="5" width="550" height="50" />

                        </ContentLoader>
                    ) : (
                        <>
                            <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                <h1>Add contract</h1>
                                <div className=" mt-5 mb-4">Choose a contract type below:</div>
                                <div className="row">
                                    <div className="col">
                                        <Button
                                            className={toggleState2 === 1 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                            onClick={() => toggleTab2(1)}>
                                            Commercial
                                        </Button>
                                    </div>
                                    <div className="col">
                                        <Button
                                            className={toggleState2 === 2 ? "tabs_contract atabs_contract py-3 px-5" : "tabs_contract py-3 px-5"}
                                            onClick={() => toggleTab2(2)}>
                                            Streaming
                                        </Button>
                                    </div>
                                </div>
                                <div className={toggleState2 === 1 ? "content  active-content" : "content"}>
                                    <AddCommercialContract />
                                </div>
                                <div className={toggleState2 === 2 ? "content  active-content" : "content"}>
                                    <AddStreamingContract />
                                </div>

                            </div>

                            <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                <h1>View listed songs</h1>
                                <ViewListedSongs />
                            </div>

                            <div className={toggleState === 3 ? "content  active-content" : "content"}>
                                <h1>View contracts</h1>
                                <ViewContracts />
                            </div>

                            <div className={toggleState === 4 ? "content  active-content" : "content"}>
                                <h1>View contract proposals</h1>
                                <ViewContractProposals />
                            </div>

                            <div className={toggleState === 5 ? "content  active-content" : "content"}>
                                <h1>Payout</h1>
                                <Payout />
                            </div>
                        </>
                    )}

                </div>

            </div>



        </div>
    );
}

export default Label;