pragma solidity >=0.5.17;


contract StreamContract {
   
    uint256 private _streamCounter;
    struct Stream {
        uint256 prevStream;
        uint256 currStream;
        string ipfsHash;
        uint256 streamId;
    }
    // Stores all stream struct
    mapping(uint256 => Stream) streams;
    uint256[] streamID;


   
    function addStream( string memory ipfsHash) public returns (uint256) {
        _streamCounter = _streamCounter + 1;
        uint256 prevStream = 0;
        uint256 currStream = 0;
        streams[ _streamCounter] = Stream(prevStream, currStream, ipfsHash, _streamCounter);
        streamID.push(_streamCounter);

        return  _streamCounter;
    }



/*
    simulateStreams Function
    Handles the streaming processes. It adds the number of streams that the admin adds to each streaming contract.
    If the number of prevStreams is 10 streams lesser than the current stream, then the function returns the number of streams that must be paid for
    Parameters:
        nStreams                | UINT256 input for the number of streams to be added to the currStreams parameter of the streaming contract
        streamId                | UINT256 input for the id corresponding to the index of the STREAM struct that is being queried
   
    Returns:  
        uint256                 | number of streams that has to be paid for

*/  
    function simulateStreams (uint256 nStreams, uint256 streamId) public returns (uint256){
       

        Stream storage temp_stream = streams [streamId];


        temp_stream.prevStream = temp_stream.currStream;
        temp_stream.currStream = temp_stream.currStream + nStreams;
        
        uint256 update = 0 ; //default , 0
        if (  temp_stream.currStream - temp_stream.prevStream >= 10) {
                // if the difference between previous and current stream is equal to or greater than 10, return update count
               update =  temp_stream.currStream - temp_stream.prevStream;
        }


        return update;

    }

/*
    getStream Function
    Returns the alias of the user corresponding to the roleAddress input
    
    Parameters:
        id                | UINT256 input for the id corresponding to the index of the STREAM struct that is being queried
   
    Returns:  
        uint256           | number of streams that has been paid for
        uint256           | total number of streams that are being stored into the smart contract
        string            | string ipfs hash that corresponds to the streaming contract
        uint256           | int value corresponding to he id of the streaming contract

*/  
    function getStream(uint256 id) public view returns (uint256,uint256, string memory, uint256) {
        Stream memory stream = streams[id];
        return (stream.prevStream, stream.currStream, stream.ipfsHash, stream.streamId);
    }


/*
    getAllStreams Function
    Returns the array of addresses that are stoed in the smart contract
    
    Returns: 
        uint256[]         | An array of stream structs that corresponds to the array of streaming ids stored in the smart contract

*/
    function getAllStreams() public view returns (uint256[] memory){
        return streamID;
    }


   
}
