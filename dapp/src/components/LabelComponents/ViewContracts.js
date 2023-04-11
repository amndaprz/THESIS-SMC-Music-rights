import CardContract from '../Cards/CardContract'

function ViewContracts(){

    return(
        <div class="row py-4 card-deck">
            <CardContract/>
            <CardContract/>
            <CardContract/>
        </div>
    );
}

export default ViewContracts;