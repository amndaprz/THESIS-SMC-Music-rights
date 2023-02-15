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