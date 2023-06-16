// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;




// Role Access Contract
contract RoleAccess {


    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() {  
        length = 0;
    }


    function giveRole(string calldata r_add, string calldata r_alias, uint256 role) public {
        _Users[r_add] = User(r_alias, role);
        addresses.push(r_add);
        length += 1;

     
                
    }

    // Checking funcs

     function _isClient (address from) public view returns (bool) {
        require(hasRole(CLIENT_ROLE, from), "User is not a CLIENT");
        return true;
    }

    function _removeRoles (string calldata r_Add) public {
        
        _Users[r_Add].role = 0;
    }

     function getAddresses() public view returns (string[] memory){
        return addresses;
    }
    function getAlias(string calldata r_Add) public view returns (string memory) {
        
        return _Users[r_Add].r_alias;
    }


    function getRole(string calldata r_Add) public view returns (uint256) {
        

        return _Users[r_Add].role;
    
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