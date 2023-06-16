
// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;

import "@openzeppelin/contracts@4.8.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.2/security/Pausable.sol";
import "./RoleAccess.sol";

contract MusicRightsToken is ERC721, ERC721Enumerable, Pausable{

    uint256 public MINT_PRICE = 0.005 ether;
    uint256 public MAX_SUPPLY = 10000;
    
    struct MRC {
        uint256 token_id;
        string ipfsHash;
        uint256 status;//0-undefined, 1 - pending, 2-listed, 3-bought, 4 - declined
        string client; //"" - no client 
    }

    //IPFS hash
     uint256 public tokenIdCounter;
    //  MRC[] public _MRCs; //listed
    mapping(uint256 => MRC) internal _MRC;
    uint256[] public Tokens;


    // 2. Lifecycle Methods ------------------------------------------------------------------------------------
    constructor() ERC721("MusicRights Token", "MRT") {
        //  Start token ID incrementor
        tokenIdCounter = 0;
    }

    /*
    nonMint Function
   
    Variables:
        ipfsHash        | STRING input for ipfs hash where supplementary information 
                          about the contract is stored
    */

    function nonMint(string calldata ipfsHash) public  {
         uint256 newTokenCounter = tokenIdCounter + 1;

        if(newTokenCounter < MAX_SUPPLY){
            
            _MRC[newTokenCounter] = MRC(newTokenCounter,ipfsHash,1,"");
            tokenIdCounter = newTokenCounter;
            Tokens.push(tokenIDCounter);
        }
    }

    /*
    safeMintWithToken Function
   
    Variables:
        tokenId         | INT input for the corresponding tokenID representing the index of 
    */
    function safeMintWithToken(uint256 tokenId) public {

        _MRC[token_id].status = 2;
        _safeMint(msg.sender, token_id);
    }

    
    // Call when artist rejects total fee offer
    function rejectProposal(uint256 token_id) public {
        _MRC[token_id].status = 4;
    }


    // Dump Wallet Withdraw
    event withdrawDumpWallet(address recipient, uint256 amount);

    function withdrawFromDumpWallet(address payable recipient, uint256 amount) payable external {
        recipient.transfer(msg.value);
        emit withdrawDumpWallet(recipient, amount);
    }

    // 5. Other Functions ------------------------------------------------------------------------------------  
    function transferETH(address payable recipientAddress, uint amount) public {
        address payable recipient = recipientAddress;
        recipient.transfer(amount);
    }

    function transferBuyout(string calldata client, uint256 token_id, uint256 total_fee, uint256 percent_label, uint256 percent_artist, address payable artist, address payable label)payable public {
        //For demo purposes, sender does not need to be the owner. This will be implented during THS-ST3
        require(_exists(token_id), "Token ID does not exist");
        // require(msg.value == total_fee, "Amount of ethers sent does not match the total fee");

        
        // Split total_fee
        transferETH (artist, total_fee*(percent_artist/100));
        transferETH (label, total_fee*(percent_label/100));
        _MRC[token_id].status = 3;

        safeTransferFrom(label, msg.sender , token_id); //double check if client address to pls thanks
    }

    // function getAllMRCs() public view returns (MRC[] memory){
    //     return _MRCs;
    // }

    function getStatus(uint256 token_id) public view returns (uint256){
        
        return _MRC[token_id].status;


    }

    function getTokenLength() public view returns (uint256){
        return tokenIdCounter;

    }

    function getTokens() public view returns (uint256[] memory){
        return Tokens;
    }

    
    function getMRC(uint256 token_id) public view returns (MRC memory) {
        
        return _MRC[token_id];
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
