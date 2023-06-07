// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;


import "@openzeppelin/contracts@4.8.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.2/security/Pausable.sol";
import "./RoleAccess.sol";



contract MusicRightsToken is ERC721, ERC721Enumerable, Pausable{


    // 1. Property Variables ------------------------------------------------------------------------------------
   

    // Token price and supply cap
    uint256 public MINT_PRICE = 0.005 ether;
    uint256 public MAX_SUPPLY = 10000;
    
    struct MRC {
        uint256 token_id;
        string ipfsHash;
        uint256 status; //0- not minted, 1 - minted
    }

     //Role Access SMC Instance
    RoleAccess roleAccessInstance;
	
	
	 
    //IPFS hash
     uint256 public tokenIdCounter;
	 MRC[] public _MRCs; 


    // 2. Lifecycle Methods ------------------------------------------------------------------------------------
    constructor() ERC721("MusicRights Token", "MRT") {
      
        //  Start token ID incrementor
        tokenIdCounter = 0;

        //Put contract address ng role access here once implement na ung modifeirs
        // roleAccessInstance = RoleAccess();

    }

    // 3. Minting Functions ------------------------------------------------------------------------------------

    //Call when label inputs form
    function nonMint(string calldata ipfsHash) public  {
         uint256 newTokenCounter = tokenIdCounter + 1;

        if(newTokenCounter < MAX_SUPPLY){
            _MRCs.push(MRC(newTokenCounter, ipfsHash, 0));
        }
    }

    // Call when artist signs
    function safeMintWithToken(uint256 token_id) public {

        //Check if id exists
        uint256 i = tokenIdCounter;

        for (uint x =0; x < i; x++){
            if(_MRCs[x].token_id == token_id)
                if(token_id < MAX_SUPPLY){
                    _MRCs[x].status = 1;//change status to minted
                    _safeMint(msg.sender, token_id);
                }
                
        }
       
    }


    // Dump Wallet Withdraw
    event withdrawDumpWallet(address recipient, uint256 amount);

    function withdrawFromDumpWallet(address payable recipient, uint256 amount) payable external {
        recipient.transfer(msg.value);

        emit withdrawDumpWallet(recipient, amount);
    }


    // 5. Other Functions ------------------------------------------------------------------------------------


  
    function transferETH(address payable sender, address payable recipientAddress, uint amount) public {
        address payable recipient = recipientAddress;
        recipient.transfer(amount);
    }

    function transferBuyout(address payable client, uint256 token_id, uint256 total_fee, uint256 percent_label, uint256 percent_artist, address payable artist, address payable label)payable public {
        
        //For demo purposes, sender does not need to be the owner. This will be implented during THS-ST3
        require(_exists(token_id), "Token ID does not exist");
        // require(msg.value == total_fee, "Amount of ethers sent does not match the total fee");
        // address label = _Owner[token_id];

        // Split total_fee
        transferETH (client, artist, total_fee*(percent_artist/100));
        transferETH (client, label, total_fee*(percent_label/100));


        safeTransferFrom(label, client, token_id);
        

    }

    
     function getAllMRCs() public view returns (MRC[] memory){
        return _MRCs;
    }
    


    function getMRC(uint256 token_id) public view returns (string memory) {
         uint256 i = tokenIdCounter;
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





/*


Acc 1:
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4


Acc 2:
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2


*/