// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;


contract StreamContract {
   
    uint256 private _streamCounter;
    struct Stream {
        uint256 prevStream; //paid stream count
        uint256 currStream; //unpaid stream count
        string ipfsHash;
        uint256 status; //0- undefind, 1- pending, 2-signed, 3 - declined
        uint256 streamId;
        uint256 update; // number of streams that needs to- be paid for
    }
    // Stores all stream struct
    mapping(uint256 => Stream) streams;
    uint256[] streamID;

     constructor() {
         _streamCounter = 0;
    }


/*
    addStream Function
    Called when Label adds a new streaming contract

    Parameters:
        ipfsHash        | STRING input for ipfs hash where supplementary information 
                          about the contract is stored

*/ 
    function addStream( string memory ipfsHash) public {
        _streamCounter = _streamCounter + 1;
        streams[ _streamCounter] = Stream(0, 0, ipfsHash, 1, _streamCounter, 0);
        streamID.push(_streamCounter);
    }


    function signStream(uint256 streamId) public {
        streams[streamId].status = 2;
    }


/*
    simulateStreams Function
    Handles the streaming processes. It adds the number of streams that the Admin wants to simulate
    If the number of prevStreams is 10 streams lesser than the current stream, then the function returns the number of streams that must be paid for

    Parameters:
        nStreams                | UINT256 input for the number of streams to be added to the currStreams parameter of the streaming contract
        streamId                | UINT256 input for the id corresponding to the index of the STREAM struct that is being queried
   
    Returns:  
        uint256                 | number of streams that has to be paid for

*/  
    function simulateStreams (uint256 nStreams, uint256 streamId) public{
       
        streams [streamId].currStream = streams [streamId].currStream + nStreams;
        
        if (  streams [streamId].currStream >= 10) {
                // if the difference between previous and current stream is equal to or greater than 10, return update count
               streams [streamId].update =  streams [streamId].currStream;
               streams [streamId].prevStream += streams [streamId].currStream;
               streams [streamId].currStream = 0;

        }

    }



/*
    transferETH Function
    Automatically called when the number of streams that are unpaid for are equal to or greater than 10
    
    Parameters:
        tokenId         | INT input for the corresponding tokenID representing the index of 
                          the MRT item they are trying to reject
*/
    function transferETH(address payable recipientAddress, uint amount) public {
        address payable recipient = recipientAddress;
        recipient.transfer(amount);
    }


/*
    transferBuyout Function
    Called when the Admin agrees to pay for the simulated streaming fee
    
    Parameters:
        totalFeePerStream| UINT256 input for the token id of the corresponding MRC contract that the client wants to buy
        nStreams         | UINT256 input for the total fee to be paid by the client (msg.sender), as requested by the label and artist
        percentLabel     | UINT256 input for the peercentage that the Label is entitled to
        percentArtist    | UINT256 input for the percetnage that the Artist is entitles to
        artist           | ADDRESS PAYABLE input for the address of the Artist wallet/account
        label            | ADDRESS PAYABLE input for the address of the Label wallent/account

*/
    function transferStream( uint256 totalFeePerStream, uint256 nStreams, uint256 percentLabel, uint256 percentArtist, address payable artist, address payable label)payable public {
        // Split total_fee
        transferETH (artist, totalFeePerStream*nStreams*(percentArtist/100));
        transferETH (label, totalFeePerStream*nStreams**(percentLabel/100));
    }

/*
    getStream Function
    Returns the Stream object that is stored in the streams array given the input id index
    
    Parameters:
        id                | UINT256 input for the id corresponding to the index of the STREAM struct that is being queried
   
    Returns:  
        Stream            | object that is stored in the given id index

*/
    function getStream(uint256 id) public view returns (Stream memory ) {
        return streams[id];
    }


/*
    getAllStreamId Function
    Returns the array of stream ids that are stored in the smart contract
    
    Returns: 
        uint256[]         | An array of streaming ids stored in the smart contract

*/
    function getAllStreamId() public view returns (uint256[] memory){
        return streamID;
    }


/*
    getStreamLength Function
    Returns the length of the streams mapping array
    
    Returns: 
        uint256[]         | An array of stream structs that corresponds to the array of streaming ids stored in the smart contract

*/
    function getStreamLength() public view returns (uint256){
        return _streamCounter;
    }

/*
    getCurrStreams Function
    Returns the number of unpaid streams given the stream id
    
    Returns: 
        uint256           | An int representing the current number of simulated streams that have yet to be paid for

*/
    function getCurrStreams(uint256 streamId) public view returns (uint256){
        return streams[streamId].currStream;
    }


/*
    getCurrStreams Function
    Returns the number of paid streams given the stream id
    
    Returns: 
        uint256           | An int representing the previous number of simulated streams that have already been paid for

*/
    function getPrevStreams(uint256 streamId) public view returns (uint256){
        return streams[streamId].prevStream;
    }



/*
    getCurrStreams Function
    Returns the number of streams that the Admin must pay for
    
    Returns: 
        uint256           | An int representing the number of simulated streams that the Admin must pay for

*/
    function getUpdate(uint256 streamId) public view returns (uint256){

        return streams[streamId].update;
    }



/*
    clearUpdate Function
    Called when the Admin successfully pays for the number of simulated streams store in the update attribute.
    This function clears the number of simulated streams that needs to be paid for

     Parameters:
        id                | UINT256 input for the id corresponding to the index of the STREAM struct that is being queried

*/

    function clearUpdate (uint256 streamId) public {
        streams[streamId].update = 0;
    }

   
}
