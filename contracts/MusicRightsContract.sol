pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";

 contract MusicRightsContract {

     //gas fee reduction stuff idk
    using ABDKMath64x64 for int128;
    using ABDKMath64x64 for uint16;

    bytes32 public constant CLIENT_ROLE = keccak256("CLIENT_ROLE");
    bytes32 public constant LABEL_ROLE = keccak256("LABEL_ROLE");
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");

    // Struct
    struct MRC {
        uint percent_label;
        uint16 percent_artist;
        uint total_fee;
        uint schedule;
        uint creation_date;

        //should these be changed to address?
        uint client_id; 
        uint label_id;
        uint artist_id;

        string contract_type; //commercial or streaming
        string status; //pending, completed, cancelled

        address owner; //address of label
    }

    // Mapping array of mrc
    mapping(uint8 => MRC) private mrc_array;

    // ownership: study openzeppelin




    // FUNCTIONS
    //CreateMRC: onlyLabel
    function createContract(uint _percent_label, 
                            uint _percent_artist,
                            uint _total_fee,
                            uint _schedule,
                            uint _creation_date,
                            uint _client_id,
                            uint _label_id,
                            uint _artist_id,
                            string memory _contract_type,
                            string memory _status) public {

        MRC mrc = new MRC(  _percent_label, 
                            _percent_artist,
                            _total_fee,
                            _schedule,
                            _creation_date,
                            _client_id,
                            _label_id,
                            _artist_id,
                            _contract_type,
                            _status,
                            address(msg.sender));
            mrc_array.push(contracts);
        }

    // SIGN MRS??
    // RejectMRC
    //BuyMRC: onlyClient

}

