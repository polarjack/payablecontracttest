pragma solidity ^0.4.11;

contract Test {
  address owner; 
  uint logbalance;

  function Test() public payable{
    owner = msg.sender;
    logbalance = msg.value;
  }

  function getContractBalance() public returns (uint) {
    return logbalance;
  }

  function getBalance() public returns (uint) {
    return this.balance;
  }
}
