import CardList from '../Cards/CardList';

function ViewListedSongs() {
    return(
        <div class="row py-4 px-5 card-deck">
            <CardList/>
            <CardList/>
            <CardList/>
        </div>
    );
}

export default ViewListedSongs;