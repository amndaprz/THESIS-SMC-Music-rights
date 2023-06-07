// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;




// Role Access Contract
contract RoleAccess {


    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct User{
        string r_address;
        string r_alias;
        uint256 role; // 1-Label, 2-Artist, 3-Client
    }

    User[] public _Users;

    constructor() {  
    }


    function giveRole(string calldata r_add, string calldata r_alias, uint256 role) public {

        bool unique = true;

        //CHECK IF ALIAS ALREADY EXISTS
          for (uint x =0; x < _Users.length; x++){
            if(keccak256(abi.encodePacked((_Users[x].r_address))) == keccak256(abi.encodePacked((r_add))))
                unique = false;
            if (keccak256(abi.encodePacked((_Users[x].r_alias))) == keccak256(abi.encodePacked((r_alias))))
                unique = false;
            
          }

          if (unique)
            _Users.push(User(r_add,r_alias, role));
                
    }




    // Checking funcs

    //returns role, 0 if no role or user does not exist
    function hasRole(address r_Add) public view returns (uint256){
        uint256 r = 0;
        for (uint x =0; x < _Users.length; x++){
            if(keccak256(abi.encodePacked((_Users[x].r_address))) == keccak256(abi.encodePacked((r_Add))))
                r = _Users[x].role;
        }

        return r;

    }

    function _removeRoles (address r_Add) public {
        for (uint x =0; x < _Users.length; x++){
            if(keccak256(abi.encodePacked((_Users[x].r_address))) == keccak256(abi.encodePacked((r_Add))))
                _Users[x].role = 0;
        }
    }

    function deleteUser (string calldata r_Add) public {// Leaves an empty space sa array kung san nadelete ung user
        for (uint x =0; x < _Users.length; x++){
            if(keccak256(abi.encodePacked((_Users[x].r_address))) == keccak256(abi.encodePacked((r_Add))))
                delete _Users[x];
        }
    }

    function getUsers() public view returns (User[] memory){
        return _Users;
    }


    modifier onlyLabel() {
        require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == LABEL_ROLE, "Access denied. Only Label.");
        _;
    }


    modifier onlyArtist() {
        require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == ARTIST_ROLE, "Access denied. Only Artist.");
        _;
    }

    modifier onlyClient() {
        require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == CLIENT_ROLE, "Access denied. Only Client.");
        _;
    }

    modifier onlyAdmin() {
        require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == ADMIN_ROLE, "Access denied. Only Admin.");
        _;
    }

    
    
}
    