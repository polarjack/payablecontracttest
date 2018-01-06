pragma solidity ^0.4.11;

contract Test {
  address owner; 
  uint logbalance;

  uint registblock;

  function Test() public payable{
    owner = msg.sender;
    logbalance = msg.value;
    registblock = block.number;
  }

  function getContractBalance() public returns (uint) {
    return logbalance;
  }

  function getBalance() public returns (uint) {
    return this.balance;
  }

  function addMoney() public {
    logbalance = this.balance;
  }

  function getBlockNumber() public returns (uint) {
    return registblock;
  }
}
