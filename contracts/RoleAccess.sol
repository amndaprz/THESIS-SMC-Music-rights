// SPDX-License-Identifier: DLSU--TINA
pragma solidity >=0.5.17;




// Role Access Contract
contract RoleAccess {


    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct User{
        string r_alias;
        uint256 role; // 1-Label, 2-Artist, 3-Client
    }

    mapping(string => User) internal _Users;
    string [] public addresses;
    uint256 public length;

    constructor() {  
        length = 0;
    }


    function giveRole(string calldata r_add, string calldata r_alias, uint256 role) public {
        _Users[r_add] = User(r_alias, role);
        addresses.push(r_add);
        length += 1;

     
                
    }

    // Checking funcs

    //returns role, 0 if no role or user does not exist
    function hasRole(string calldata r_Add) public view returns (uint256){
    
        return _Users[r_Add].role;
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



    // modifier onlyLabel() {
    //     require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == LABEL_ROLE, "Access denied. Only Label.");
    //     _;
    // }


    // modifier onlyArtist() {
    //     require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == ARTIST_ROLE, "Access denied. Only Artist.");
    //     _;
    // }

    // modifier onlyClient() {
    //     require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == CLIENT_ROLE, "Access denied. Only Client.");
    //     _;
    // }

    // modifier onlyAdmin() {
    //     require(keccak256(abi.encodePacked((hasRole(msg.sender)))) == ADMIN_ROLE, "Access denied. Only Admin.");
    //     _;
    // }

    
    
}