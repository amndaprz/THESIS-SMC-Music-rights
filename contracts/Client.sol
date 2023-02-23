pragma solidity >=0.8.2;

contract Client {
    
    address public payer;
    address public payee;
    uint public amount;
    
    constructor(address _payee, uint _amount) payable {
        payer = msg.sender;
        payee = _payee;
        amount = _amount;
    }
    
    function confirmPayment() public {
        require(msg.sender == payee, "Only the payee can confirm payment.");
        payable(payee).transfer(amount);
    }
    
    function cancelPayment() public {
        require(msg.sender == payer, "Only the payer can cancel payment.");
        payable(payer).transfer(address(this).balance);
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}