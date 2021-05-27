pragma solidity ^0.8.0;

contract Wallet {
    
    address payable public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor (address payable _owner) {
        owner = _owner;
    }
    
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    function deposit() public payable {
        
    }

    function withdraw(uint256 _amount) public payable onlyOwner{
        require(getBalance() >= _amount);
        owner.transfer(_amount);
    }

    function sendMoney(address payable _to, uint256 _amount) public payable onlyOwner{
        require(getBalance() >= _amount);
        _to.transfer(_amount);
    }

}