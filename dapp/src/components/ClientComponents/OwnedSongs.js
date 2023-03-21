import CardOwned from '../Cards/CardOwned'

function OwnedSongs(){
    return(
        <div class="row py-4 px-5 card-deck">
            <CardOwned/>
            <CardOwned/>
            <CardOwned/>
        </div>
    );
}

export default OwnedSongs;