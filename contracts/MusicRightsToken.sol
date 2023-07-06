// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;
 
import "@openzeppelin/contracts@4.8.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.2/security/Pausable.sol";
 
contract MusicRightsToken is ERC721, ERC721Enumerable, Pausable{
 
    uint256 public MAX_SUPPLY = 10000;
 
    struct MRC {
        uint256 tokenId;
        string ipfsHash;
        uint256 status;//0-undefined, 1 - pending, 2-listed, 3-bought, 4 - declined
        string client; //"" - no client 
    }
 
    uint256 public tokenIdCounter;
    mapping(uint256 => MRC) internal _MRC;
    uint256[] public Tokens;
 
    constructor() ERC721("MusicRights Token", "MRT") {
        //  Start token ID incrementor
        tokenIdCounter = 0;
    }
 
/*
    nonMint Function
    This function is called when a Label user inputs information for a new Commercial contract.
 
    Parameters:
        ipfsHash        | STRING input for ipfs hash where supplementary information 
                          about the contract is stored
*/
 
    function nonMint(string calldata ipfsHash) public  {
         uint256 newTokenCounter = tokenIdCounter + 1;
 
        if(newTokenCounter < MAX_SUPPLY){
 
            _MRC[newTokenCounter] = MRC(newTokenCounter,ipfsHash,1,"");
            tokenIdCounter = newTokenCounter;
            Tokens.push(tokenIdCounter);
        }
    }
 
/*
    safeMintWithToken Function
    Called when an Artist signs a commercial contract proposed by their Label
 
    Parameters:
        tokenId         | UINT256 input for the corresponding tokenID representing the index of 
                          the MRT item they are trying to mint
*/
    function safeMintWithToken(uint256 tokenId) public {
 
        _MRC[tokenId].status = 2;
        _safeMint(msg.sender, tokenId);
    }
 
 
/*
    rejectProposal Function
    Called when an Artist declines a commercial contract proposed by their Label
 
    Parameters:
        tokenId         | UINT256 input for the corresponding tokenID representing the index of 
                          the MRT item they are trying to reject
*/
    function rejectProposal(uint256 tokenId) public {
        _MRC[tokenId].status = 4;
    }
 
 
 
/*
    transferETH Function
    Called by transferBuyout function when transferring eth to the Artist & Label account (recipientAddress)
 
    Parameters:
        recipientAddress | ADDRESS input representing the address of the account to receive the input amount
        amount           | UINT256 input that corresponds to the amount of eth that must be sent to the recipientAddress
*/
    function transferETH(address payable recipientAddress, uint amount) public {
        address payable recipient = recipientAddress;
        recipient.transfer(amount);
    }
 
/*
    transferBuyout Function
    Called when a Client decides to buy a song from the marketplace
 
    Parameters:
        tokenId          | UINT256 input for the token id of the corresponding MRC contract that the client wants to buy
        totalFee         | UINT256 input for the total fee to be paid by the client (msg.sender), as requested by the label and artist
        percentLabel     | UINT256 input for the peercentage that the Label is entitled to
        percentArtist    | UINT256 input for the percetnage that the Artist is entitles to
        artist           | ADDRESS PAYABLE input for the address of the Artist wallet/account
        label            | ADDRESS PAYABLE input for the address of the Label wallent/account
 
*/
 
    function transferBuyout(string calldata client, uint256 tokenId, uint256 totalFee, uint256 percentLabel, uint256 percentArtist, address payable artist, address payable label)payable public {
 
        require(_exists(tokenId), "Token ID does not exist");
 
        // Split totalFee
        transferETH (artist, totalFee*(percentArtist/100));
        transferETH (label, totalFee*(percentLabel/100));
        //Change the status to 3 - Bought
        _MRC[tokenId].status = 3;
        //Set the token client address attribute to the address of the client
        _MRC[tokenId].client = client;
        //transfers the token from the Artist to the Client
        _setApprovalForAll(msg.sender, artist, true);
        _approve(msg.sender, tokenId);
        safeTransferFrom(artist, msg.sender , tokenId);
    } 
 
 
/*
    getStatus Function
    Called when an Artist declines a commercial contract proposed by their Label
 
    Parameters:
        tokenId         | UINT256 input for the token id corresponding to the index of the MRC that is being queried
*/
 
    function getStatus(uint256 tokenId) public view returns (uint256){
 
        return _MRC[tokenId].status;
    }
 
/*
    getTokenLength Function
    Returns the number of tokens stored in the smart contract as metadata
 
    Returns: 
*/
    function getTokenLength() public view returns (uint256){
        return tokenIdCounter;
 
    }
 
 
/*
    getTokens Function
    Returns the array of token ids that are stoed in the smart contract
 
    Returns: 
        uint256[]         | An array of uint256 that corresponds to the array of token ids
 
*/
    function getTokens() public view returns (uint256[] memory){
        return Tokens;
    }
 
 
/*
    getMRC Function
    Returns the array of token ids that are stoed in the smart contract
 
    Parameters:
        tokenId         | UINT256 input for the token id corresponding to the index of the MRC that is being queried
 
    Returns:  
        MRC              | MRC struct that corresponds to the token id input
 
*/   
    function getMRC(uint256 tokenId) public view returns (MRC memory) {
 
        return _MRC[tokenId];
    }
 
 
 
 
 
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
 
 
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}