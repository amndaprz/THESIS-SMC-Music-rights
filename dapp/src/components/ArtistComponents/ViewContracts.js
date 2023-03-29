import CardContract from '../Cards/CardContract'

function ViewContracts(){

    return(
        <div class="row py-4 px-0 card-deck">
            <CardContract/>
            <CardContract/>
            <CardContract/>
        </div>
    );
}

export default ViewContracts;