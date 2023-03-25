import CardBuy from '../Cards/CardBuy'

function BuySongs(props){
    const jsonObj = props.data;
    console.log("Buy songs = " + props.percent_artist);
        return(
        <div class="row py-4 px-5 card-deck">
       
            <CardBuy data={props}/>
            <CardBuy/>
            <CardBuy/>
        </div>
    );
}

export default BuySongs;