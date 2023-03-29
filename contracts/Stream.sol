pragma solidity >=0.5.17;


contract StreamContract {
   
    uint256 private _streamCounter;
    struct Stream {
        uint256 prevStream;
        uint256 currStream;
        string ipfsHash;
        uint256 stream_id;
    }
    // Stores all stream struct
    mapping(uint256 => Stream) streams;


   
    function addStream( string memory ipfsHash) public returns (uint256) {
        _streamCounter = _streamCounter + 1;
        uint256 prevStream = 0;
        uint256 currStream = 0;
        streams[ _streamCounter] = Stream(prevStream, currStream, ipfsHash, _streamCounter);


        return  _streamCounter;
    }

// UPDate thisbitch
    function simulateStreams (uint256 n_streams, uint256 stream_id) public return (uint256){
       

        Stream storage temp_stream = streams [stream_id];


        temp_stream.prevStream = temp_stream.currStream;
        temp_stream.currStream = temp_stream.currStream + n_streams;
        
        uint256 update = 0 ; //default , 0
        if (  temp_stream.currStream - temp_stream.prevStream >= 10) {
                // if the difference between previous and current stream is equal to or greater than 10, return update count
               update =  temp_stream.currStream - temp_stream.prevStream;
        }


        return update;

    }


    function getStream(uint256 id) public view returns (uint256,uint256, string memory, uint256) {
        Stream memory stream = streams[id];
        return (stream.prevStream, stream.currStream, stream.ipfsHash, stream.stream_id);
    }



    function getAllStreams() public view returns (Stream[] memory){


        Stream[] memory streamArray ;
        for (uint x =0; x < _streamCounter; x++){
            streamArray[x] = streams[x];
        }

        return streamArray;
    }


   
}
