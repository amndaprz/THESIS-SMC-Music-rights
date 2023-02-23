// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Artist {
    address public ArtistOwner;

    event signContract(address _from);

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count;

    constructor() {
        ArtistOwner = msg.sender;
    }

    modifier onlyArtist() {
        require(msg.sender == ArtistOwner, "Only the Artist can perform this action");

        _;
    }

    function addSong(string memory songName, uint256 _price) public onlyArtist view returns(string memory){
        return string(abi.encodePacked(songName, "has been added to your library, priced at", _price));
    }

    function sellSong() public onlyArtist view returns (string memory){
        return "Song has been listed on the market";
    }

    function signMRC(string memory contractName, uint256 _a) public returns(string memory) {
        emit signContract(msg.sender);
        return string(abi.encodePacked(contractName, _a));
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getAddress() public view returns (address){
        return address(this);
    }

    
}