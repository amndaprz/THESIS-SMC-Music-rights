// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;

import "@openzeppelin/contracts@4.8.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.2/security/Pausable.sol";
import "@openzeppelin/contracts@4.8.2/access/AccessControl.sol";
import "@openzeppelin/contracts@4.8.2/utils/Counters.sol";

contract MusicRightsToken is ERC721, ERC721Enumerable, Pausable, AccessControl {

    // 1. Property Variables ------------------------------------------------------------------------------------
    using Counters for Counters.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");

    // Counter of how many tokens have been minted
    Counters.Counter private _tokenIdCounter;

    // Token price and supply cap
    uint256 public MINT_PRICE = 0.005 ether;
    uint256 public MAX_SUPPLY = 10000;


    // 2. Lifecycle Methods ------------------------------------------------------------------------------------
    constructor() ERC721("MusicRights Token", "MRT") {
        // -------- Restrict these to certain accounts only (ADMIN)----------------
        // _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEFAULT_ADMIN_ROLE, 0xd9f50E7e3f141E9b8dDccB23d58D5f959e7D3FE7);

   
        // ------- Client Accounts ------
        _grantRole(CLIENT_ROLE, 0x81bD0B9d5D5F3D4d19e98806CeCeE28911d99daa);

        // ------- Label Accounts ------
        _grantRole(LABEL_ROLE, 0xd9f50E7e3f141E9b8dDccB23d58D5f959e7D3FE7);

        // ------- Artist Accounts ------
        _grantRole(ARTIST_ROLE, 0x81bD0B9d5D5F3D4d19e98806CeCeE28911d99daa);

        // ------- Pauser Accounts ------
        // _grantRole(PAUSER_ROLE, msg.sender);
        // _grantRole(MINTER_ROLE, msg.sender);
        
        //  Start token ID incrementor
        _tokenIdCounter.increment();
    }

    // function withdraw() public onlyOwner() {
    //     require(address(this).balance > 0, "Balance is zero");
    //     payable(owner()).transfer(address(this).balance);
    // }


    // 3. Pausable Functions ------------------------------------------------------------------------------------

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    // 4. Minting Functions ------------------------------------------------------------------------------------

    // Remove onlyRole() if we want all roles to get a token for music rights contract

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // 5. Other Functions ------------------------------------------------------------------------------------

    // --- Client to Label Transfer Form

    function safeTransferFromLabelClient(address from, address to, uint256 tokenId) public {
        require(hasRole(CLIENT_ROLE, msg.sender), "User must have CLIENT Role to transfer token");
        require(hasRole(LABEL_ROLE, to), "Recipient Address must have LABEL Role to transfer");
        safeTransferFrom(from, to, tokenId);
    }



    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // 6. Checking Functions ------------------------------------------------------------------------------------

    function _isAdmin (address from) public view returns (bool) {
        require(hasRole(DEFAULT_ADMIN_ROLE, from), "User is not an ADMIN");
        return true;
    }

    function _isClient (address from) public view returns (bool) {
        require(hasRole(CLIENT_ROLE, from), "User is not a CLIENT");
        return true;
    }

    function _isLabel (address from) public view returns (bool) {
        require(hasRole(LABEL_ROLE, from), "User is not a LABEL");
        return true;
    }

    function _isArtist (address from) public view returns (bool) {
        require(hasRole(ARTIST_ROLE, from), "User is not a ARTIST");
        return true;
    }

    // 7. Grant / Revoke Functions -------------

    function _giveRoleLabel () public {
        _grantRole(LABEL_ROLE, msg.sender);
    }

    function _removeRoles (address to) public {
        _revokeRole(DEFAULT_ADMIN_ROLE, to);
        _revokeRole(CLIENT_ROLE, to);
        _revokeRole(LABEL_ROLE, to);
        _revokeRole(ARTIST_ROLE, to);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}

/*

Acc 1: 
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

Acc 2:
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

*/