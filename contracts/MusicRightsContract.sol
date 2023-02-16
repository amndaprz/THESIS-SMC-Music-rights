pragma solidity ^0.6.0;


 contract MusicRightsContract {

     address public owner;

    constructor() public {
         owner = msg.sender;
    }
    

    // Struct
    struct MRC {
        uint percent_label;
        uint percent_artist;
        uint total_fee;
        // Auint schedule; //need pa ba? nakalagay sa paper 6mnths, 1yr, 1.5yrs or sumn
        uint creation_date;


        address client; //address of client
        address label; //address of label
        address artist; //address of artist

        string contract_type; //commercial or streaming
        string status; //pending, completed, cancelled

        address owner; //address of network kung san nadeploy yung smc
    }

    // Mapping array of mrc
    MRC[] public mrc_array;

    // ownership + MODIFIERS
    mapping(address => bool) public LABEL_ROLE;
    mapping(address => bool) public CLIENT_ROLE;
    mapping(address => bool) public ARTIST_ROLE;

    //add roles to users, storing the address sa mapping then classifying them as a certain role
    function addLabel ( address _address) public {
        require(msg.sender == owner, "Owner only");
        LABEL_ROLE[_address] = true;
    }

    function addClient ( address _address) public {
        require(msg.sender == owner, "Owner only");
        CLIENT_ROLE[_address] = true;
    }

    function addArtist ( address _address) public {
        require(msg.sender == owner, "Owner only");
        ARTIST_ROLE[_address] = true;
    }

    //modifiers
     modifier onlyLabel(){
        require(LABEL_ROLE[msg.sender], "Label only.");
        _;
    }

    modifier onlyClient(){
        require(CLIENT_ROLE[msg.sender], "Client only.");
        _;
    }

     modifier onlyArtist(){
        require(ARTIST_ROLE[msg.sender], "Artist only.");
        _;
    }

    




    // FUNCTIONS
    //CreateMRC: onlyLabel
    function createContract(uint _percent_label, 
                            uint _percent_artist,
                            // uint _schedule,
                            address _label,
                            address _artist,
                            string memory _contract_type) public onlyLabel {
                            
        require (_percent_artist + _percent_label == 100, "Percent must be equal to 100");
        MRC memory mrc = MRC(  _percent_label, 
                            _percent_artist,
                            0,
                            // _schedule,
                            block.timestamp,
                            address(0),
                            _label,
                            _artist,
                            _contract_type,
                            "Listed", // listed means listed na sa marketplace
                            address(msg.sender));
        mrc_array.push(mrc);
        }

    

    //FUNCTION: CLIENT PROPOSES A TOTAL FEE

    function proposeTotalFee (uint _id, uint _totalFee) public onlyClient {
        //check if MRC exists

        mrc_array[_id].total_fee = _totalFee;
        mrc_array[_id].status = "Pending";
        mrc_array[_id].client = msg.sender;
    }

    //FUNCTION: LABEL & ARTIST SIGNS PROPOSED MRC WITH TOTAL FEE

    function signMRC(uint _id) public onlyLabel onlyArtist {
        //check if mrc exists

        //do agreedOnThatData

        mrc_array[_id].status = "Complete";
    }


}

