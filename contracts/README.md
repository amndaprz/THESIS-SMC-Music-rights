

**FOLDER: contracts**

**MusicRightsToken.sol**


<table>
  <tr>
   <td><strong>Function</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Input</strong>
   </td>
   <td><strong>Invokes</strong>
   </td>
  </tr>
  <tr>
   <td>nonMint
   </td>
   <td>This function is called when a Label user inputs information for a new Commercial contract. 
   </td>
   <td>ipfsHash – string calldata 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>safeMintWithToken
   </td>
   <td>This function is called when an Artist used decided to sign a contract proposal made by their Label. This mints the ERC721 token.
   </td>
   <td>tokenId – uint265 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>rejectProposal
   </td>
   <td>This function is called when an Artist user rejects a contract proposed by their Label. This sets the status of the MRT item to 4. This means the contract proposal has been rejected.
   </td>
   <td>tokenId – uint265
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>transferETH
   </td>
   <td>This function transfers the input amount into the recipientAddress from the senders wallet
   </td>
   <td>recipientAddress – address payable 
<p>
amount –uint 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>transferBuyout
   </td>
   <td>This function is called when a Client user wants to buy a commercial contract listed to the Marketplace. Calls the transferETH function to split the total fee according to the percentages assigned to the Label and Artist
   </td>
   <td>tokenId – uint256
<p>
total_fee – uint256 
<p>
percent_label – uint256 
<p>
percent_artist – uint 256 
<p>
artist – address payable 
<p>
label – address payable 
   </td>
   <td>transferETH
   </td>
  </tr>
  <tr>
   <td>getStatus
   </td>
   <td>This function returns the status of the MRC struct that the input token id corresponds to
   </td>
   <td>tokenID – uint256 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getTokenLength
   </td>
   <td>This functions returns the total number of tokens that is stored in the smart contract
   </td>
   <td>N/A
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getTokens
   </td>
   <td>This function returns the array of token ids that are stored in the smart contract
   </td>
   <td>N/A
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getMRC
   </td>
   <td>This function returns the MRC struct that corresponds to the given token id input
   </td>
   <td>tokenID – uint256
   </td>
   <td>N/A
   </td>
  </tr>
</table>


**RoleAccess.sol**


<table>
  <tr>
   <td><strong>Function</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Input</strong>
   </td>
   <td><strong>Invokes</strong>
   </td>
  </tr>
  <tr>
   <td>giveRole
   </td>
   <td>This function assigns a role to the given address input and stores this information into the smart contract
   </td>
   <td>roleAddress – string calldata 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>hasRole
   </td>
   <td>This function checks if the user already has a role stored in the smart contract. Returns 0 if the user does not have a role (not registered)
   </td>
   <td>roleAddress – String calldata
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getAddresses
   </td>
   <td>This function returns all the string addresses that have a corresponding User in the smart contracts.
   </td>
   <td>N/A
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getAlias
   </td>
   <td>This function returns the alias that corresponds to the input user address
   </td>
   <td>roleAddress – string calldata
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getRole
   </td>
   <td>This function returns the role that corresponds to the input user address
   </td>
   <td>roleAddress – string calldata
   </td>
   <td>N/A
   </td>
  </tr>
</table>


**Stream.sol**


<table>
  <tr>
   <td><strong>Function</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Input</strong>
   </td>
   <td><strong>Invokes</strong>
   </td>
  </tr>
  <tr>
   <td>addStream
   </td>
   <td>This function adds a new stream struct into the smart contract with its corresponding ipfsHash input. It returns the index of the newly added streaming contract
   </td>
   <td>ipfsHash – string calldata 
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>simulateStreams
   </td>
   <td>This function adds a number of nStreams to the stream count of the streaming contract that corresponds to the streamId. It returns the number of streams that must be paid for.
   </td>
   <td>nStreams – uint256
<p>
streamId – uint256
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getStream
   </td>
   <td>This function returns the following information:
<ol>

<li>prevStream - number of streams updated/paid for previously

<li>currStream - total number of streams

<li>ipfsHash - corresponding ipfs hash 

<li>streamId
</li>
</ol>
   </td>
   <td>streamId – uint256
   </td>
   <td>N/A
   </td>
  </tr>
  <tr>
   <td>getAllStreams
   </td>
   <td>This function returns all the stream structs that are stored into the smart contract.
   </td>
   <td>N/A
   </td>
   <td>N/A
   </td>
  </tr>
</table>
