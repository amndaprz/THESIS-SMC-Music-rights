// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;




// Role Access Contract
contract RoleAccess {


    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct User{
        string roleAlias;
        uint256 role; // 1-Label, 2-Artist, 3-Client
    }

    mapping(string => User) internal _Users;
    string [] public addresses;
    uint256 public length;

    constructor() {  
        length = 0;
    }

/*
    giveRole Function
    Called when a new user signs in to the dApp
    
    Parameters:
        roleAddress       | STRING  input address of the new user
        roleAlias         | STRING  input alias of the new user
        role              | UINT256 input role of the new user   

*/
    function giveRole(string calldata roleAddress, string calldata roleAlias, uint256 role) public {
        _Users[roleAddress] = User(roleAlias, role);
        addresses.push(roleAddress);
        length += 1;

     
                
    }

/*
    hasRole Function
    Called when a new user signs in to the dApp
    
    Parameters:
        roleAddress       | STRING  input address of the new user
    
    Returns:
        uint256           | returns the role of the user
                            0 - No role
                            1 - Label
                            2 - Artist
                            3- Client
                            4 - Admin

*/
    function hasRole(string calldata roleAddress) public view returns (uint256){
    
        return _Users[roleAddress].role;
    }

/*
    getAddresses Function
    Returns the array of addresses that are stoed in the smart contract
    
    Returns: 
        String[]         | An array of string that corresponds to the array of addresses

*/
     function getAddresses() public view returns (string[] memory){
        return addresses;
    }

/*
    getAlias Function
    Returns the alias of the user corresponding to the roleAddress input
    
    Parameters:
        roleAddress      | STRING input for the address corresponding to the index of the USER that is being queried
   
    Returns:  
        string           | alias of the user

*/  
    function getAlias(string calldata roleAddress) public view returns (string memory) {
        
        return _Users[roleAddress].roleAlias;
    }

/*
    getRole Function
    Returns the alias of the user corresponding to the roleAddress input
    
    Parameters:
        roleAddress      | STRING input for the address corresponding to the index of the USER that is being queried
   
    Returns:  
        uitn256           | role of the user

*/
    function getRole(string calldata roleAddress) public view returns (uint256) {
        

        return _Users[roleAddress].role;
    
    }

    
    // The following functions are overrides required by Solidity.


    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     override(AccessControl)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }



}