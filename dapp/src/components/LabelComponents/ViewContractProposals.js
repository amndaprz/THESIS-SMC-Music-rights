import React from 'react';

import CardProposal from '../Cards/CardProposal';

function ViewContractProposals(){
    
    return(
        <div class="row py-4 px-0 card-deck">
            <CardProposal/>
            <CardProposal/>
            <CardProposal/>
        </div>
    );
}

export default ViewContractProposals;