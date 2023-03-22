pragma solidity 0.8.19;

contract IPFSStorage{
    string ipfsHash;

    function set(string x)public {
        ipfsHash = x;
    }

    function get()public view returns (string){
        return ipfsHash;
    }
}