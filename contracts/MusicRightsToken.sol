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

    // Dump Wallet
    address payable public fixedWallet = payable(0xf9677b7CD5fdDf10697eb4D3976784c55e671F9C);

    // Counter of how many tokens have been minted
    Counters.Counter private _tokenIdCounter;


    // Token price and supply cap
    uint256 public MINT_PRICE = 0.005 ether;
    uint256 public MAX_SUPPLY = 10000;
    
    struct MRC {
        uint256 token_id;
        string ipfsHash;
    }

    //IPFS hash
    mapping (uint256 => MRC) private _MRCs; 
    //Owner of the token & token counter
    mapping (uint256 => address) private _Owner;




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






    // 3. Pausable Functions ------------------------------------------------------------------------------------


    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }


    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }


    // 4. Minting Functions ------------------------------------------------------------------------------------
    //  WITH IPFS
    function safeMint(string calldata ipfsHash) public onlyRole(MINTER_ROLE) {
        _tokenIdCounter.increment();
        uint256 newTokenCounter = _tokenIdCounter.current();


        if(newTokenCounter < MAX_SUPPLY){
            _safeMint(msg.sender, newTokenCounter);
            _MRCs[newTokenCounter] = MRC(newTokenCounter, ipfsHash);
            _Owner[newTokenCounter] = msg.sender;


        }else
        _tokenIdCounter.decrement();
    }


    // Dump Wallet payment

    event payDumpWallet(address dumpWallet, address from, uint256 amount);

    function payToDumpWallet(address payable dumpWallet, address from, uint256 amount) payable external{
        
        require(msg.value >= amount, "Insufficient balance");
        dumpWallet.transfer(amount);

        emit payDumpWallet(dumpWallet, from, amount);
    }


    // Dump Wallet Withdraw
    event withdrawDumpWallet(address recipient, uint256 amount);

    function withdrawFromDumpWallet(address payable recipient, uint256 amount) payable external {
        recipient.transfer(msg.value);

        emit withdrawDumpWallet(recipient, amount);
    }


    // // WITHOUT IPFS


    //   function safeMint() public returns (uint256) {
    //     _tokenIdCounter.increment();
    //     uint256 newTokenCounter = _tokenIdCounter.current();


    //     if(newTokenCounter <= MAX_SUPPLY){
    //         _safeMint(msg.sender, newTokenCounter);
    //         // _IPFSHashes[newTokenCounter] = ipfsHash;
    //         _Owner[newTokenCounter] = msg.sender;
    //         return newTokenCounter;
    //     }else{
    //         _tokenIdCounter.decrement();
    //         return newTokenCounter;
    //     }

    // }
    // 5. Other Functions ------------------------------------------------------------------------------------


    //Event: Transfer token and request payment from client

    event transferWithPayment (address label, address client, uint256 token_id, uint256 total_fee);

    //Transfer token & request payment
    //Total fee from ipfs

    function transferETH(address payable sender, address payable recipientAddress, uint amount) public {
        address payable recipient = recipientAddress;
        recipient.transfer(amount);
    }

    function transferBuyout(address client, uint256 token_id, uint256 total_fee, uint256 percent_label, uint256 percent_artist)payable public {
        
        //For demo purposes, sender does not need to be the owner. This will be implented during THS-ST3
        require(_exists(token_id), "Token ID does not exist");
        require(msg.value == total_fee, "Amount of ethers sent does not match the total fee");
        address label = _Owner[token_id];

        safeTransferFrom(label, client, token_id);
        
        emit transferWithPayment(label,client,token_id, total_fee);

    }

    
    function getAllMRCs() public view returns (MRC[] memory){
        uint256 i = _tokenIdCounter.current();

        MRC[] memory mrcArray ;
        for (uint x =0; x < i ; x++){
            mrcArray[x] = _MRCs[x];
        }


        return mrcArray;
    }


    function getMRC(uint256 token_id) public view returns (string memory) {
         uint256 i = _tokenIdCounter.current();
        string memory temp = "";
        for (uint x =0; x < i; x++){
            if(_MRCs[x].token_id == token_id)
                temp = _MRCs[x].ipfsHash;
        }
        
        return temp;
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

      function _giveRoleArtist () public {
        _grantRole(ARTIST_ROLE, msg.sender);
    }

      function _giveRoleClient () public {
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
