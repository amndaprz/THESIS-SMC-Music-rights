// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;


import "@openzeppelin/contracts@4.8.2/access/AccessControl.sol";


// Role Access Contract
contract RoleAccess is AccessControl {


    // bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE"); //Implement for security
    // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE"); // Label = Minter same
    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor() {  
    }



    function giveRoleLabel (address a) public {
        _grantRole(LABEL_ROLE, a);
    }

      function giveRoleArtist (address a) public {
        _grantRole(ARTIST_ROLE, a);
    }

      function giveRoleClient (address a) public {
        _grantRole(LABEL_ROLE, a);
    }


      function giveRoleAdmin (address a) public {
        _grantRole(ADMIN_ROLE, a);
    }


    // Checking funcs

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


    function _isAdmin (address from) public view returns (bool) {
        require(hasRole(ADMIN_ROLE, from), "User is not a ADMIN");
        return true;
    }


    function _removeRoles (address to) public {
        _revokeRole(DEFAULT_ADMIN_ROLE, to);
        _revokeRole(CLIENT_ROLE, to);
        _revokeRole(LABEL_ROLE, to);
        _revokeRole(ARTIST_ROLE, to);
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
    