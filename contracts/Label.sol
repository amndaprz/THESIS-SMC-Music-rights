//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract LabelContract{

    struct Label{
        address labelAddress;
        string labelName;
    }

    struct MusicContract{
        address contractAddress;
    }
    

    Label[] private labels; 
    MusicContract[] private mrcs;

    function getAddress(uint _id) public view returns (address){
        return labels[_id].labelAddress; 
    }

    // GetMRC
    function getMRC(address _contractAddress) public {
        // getMRC function from mrc contract?
    }

    // GetBalance (MetaMask)
    function getBalance() public view returns (uint) {
    }

    // Withdraw (MetaMask)
    function withdraw() public view returns (uint) {
    }


}