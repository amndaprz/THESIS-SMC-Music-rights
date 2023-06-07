import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';

import ViewListedSongs from './ViewListedSongs';
import ViewContracts from './ViewContracts';
import ViewContractProposals from './ViewContractProposals';
import Payout from './Payout';

import ContentLoader from 'react-content-loader'
import { Link } from "react-router-dom";
import { FaFileContract, FaMoneyCheck, FaMusic, FaSignature } from 'react-icons/fa';

document.body.style.background = "#232226";

function Artist() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
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
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div>
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
                                    <h2 className="mx-4 mt-5 client_name">Artist name</h2>
                                    <h5 className="mx-4 text_sub">Role name</h5>
                                </div>
                            <div className="nav_btn_con">
                                <Button
                                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(1)}>
                                    <FaMusic className='mx-3'/>View listed songs
                                </Button>

                                <Button
                                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(2)}>
                                    <FaFileContract className='mx-3'/>View contracts
                                </Button>

                                <Button
                                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(3)}>
                                    <FaSignature className='mx-3'/>View contract proposals
                                </Button>

                                <Button
                                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                                    onClick={() => toggleTab(4)}>
                                    <FaMoneyCheck className='mx-3'/>Payout
                                </Button>
                            </div>
                        </>
                    )}
                </div>


                
                <div className="px-4 mx-4 logout_btn_con">
                    <Link to="/">
                        <Button className="submit-button py-2 px-5 logout_btn">
                            Logout
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="col-sm-10 py-5 m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    {loading ? (
                        <ContentLoader
                            width={450}
                            height={50}
                            speed={2}
                            backgroundColor={'#383447'}
                            foregroundColor={'#2B2833'}
                        >
                            <rect x="90" y="15" rx="5" ry="5" width="270" height="12" />
                        </ContentLoader>
                    ) : (
                        <h1>View listed songs</h1>
                    )}

                    <ViewListedSongs />
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>

                    <h1>View contracts</h1>
                    <ViewContracts />
                </div>
                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <h1>View contract propoals</h1>
                    <ViewContractProposals />
                </div>
                <div className={toggleState === 4 ? "content  active-content" : "content"}>
                    <h1>Payout</h1>
                    <Payout />
                </div>
            </div>
        </div>
    );
}

export default Artist;