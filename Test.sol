pragma solidity ^0.4.11;

contract Test {
  address public owner; 
  uint public logbalance;

  string public registblock;

  function Test() public payable {
    owner = msg.sender;
    logbalance = msg.value;
  }

  function getContractBalance() public returns (uint) {
    return logbalance;
  }

  function getBalance() constant public returns (uint) {
    return this.balance;
  }

  function addMoney() public payable {
    logbalance = this.balance;
  }

  function updateBlockNumber(string _block) public {
    registblock = _block;
  }

  function getBlockNumber() constant public returns (string) {
    return registblock;
  }
}
