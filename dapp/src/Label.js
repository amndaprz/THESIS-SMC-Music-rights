import { useState } from "react";
import "./App.css";
import "./Homepage.css";

document.body.style.background = "#232226";

function ViewContracts(){
    return(
        <div class="row py-4 px-5 card-deck">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Track title skdg okfnaonfan asokoakf </h5>
                    <div>Label name</div>
                </div>
                <div class="card-footer">
                    <h5 class="text_sub">Date</h5>
                    <button className="submit-button py-2 px-5 card_button">
                        View
                    </button>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Track title skdg okfnaonfan asokoakf </h5>
                    <div>Label name</div>
                </div>
                <div class="card-footer">
                    <h5 class="text_sub">Date</h5>
                    <button className="submit-button py-2 px-5 card_button">
                        View
                    </button>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Track title skdg okfnaonfan asokoakf </h5>
                    <div>Label name</div>
                </div>
                <div class="card-footer">
                    <h5 class="text_sub">Date</h5>
                    <button className="submit-button py-2 px-5 card_button">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

function ViewProposals(){
    return(
        <div class="row py-4 px-5 card-deck">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Track title skdg okfnaonfan asokoakf </h5>
                    <div>Label name</div>
                </div>
                <div class="card-footer">
                    <h5 class="text_sub">Date</h5>
                    <button className="submit-button py-2 px-5 card_button">
                        View
                    </button>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Track title skdg okfnaonfan asokoakf </h5>
                    <div>Label name</div>
                </div>
                <div class="card-footer">
                    <h5 class="text_sub">Date</h5>
                    <button className="submit-button py-2 px-5 card_button">
                        View
                    </button>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Track title skdg okfnaonfan asokoakf </h5>
                    <div>Label name</div>
                </div>
                <div class="card-footer">
                    <h5 class="text_sub">Date</h5>
                    <button className="submit-button py-2 px-5 card_button">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

function Label() {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
    setToggleState(index);
    };

  return (
    <div>
        <div className="row p-0 m-0 card_con">
            <div className="col-sm-2 p-0 m-0 nav_con">
                <div className="px-4">
                    <h2 className="mx-4 mt-5 client_name">Label name</h2>
                    <h5 className="mx-4 text_sub">Role name</h5>
                </div>
                

                <div className="nav_btn_con">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}>
                    Add contract
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}>
                    View contracts
                    </button>
                    <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}>
                    View proposals
                    </button>

                    <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}>
                    Payout
                    </button>
                </div>
                <div className="px-4 mx-4 logout_btn_con">
                    <button className="submit-button py-2 px-5 logout_btn">
                        Logout
                    </button>
                </div>
                    
            </div>
            
            <div className="col-sm-10 py-5  m-0 content_con">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>Add contract</h1>
                    <div>Add contract</div>
                </div>
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h1>View contracts</h1>
                    <ViewContracts/>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h1>View proposals</h1>
                    <ViewProposals/>
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <h1>Payout</h1>
                    <div>Payout</div>
                </div>
            </div>

        </div>
        

      
    </div>
  );
}

export default Label;