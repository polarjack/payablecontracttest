pragma solidity ^0.4.11;

contract Pay {
  address public user;
  address public usersend;
  uint public inputmoney;
  uint togo = 10000000000000000;

  function Pay() public {
    user = msg.sender;
  }

  function sendmoney() public payable {
    usersend = msg.sender;
    inputmoney = msg.value;
  }
  function sendtome() public {
    msg.sender.transfer(togo);
  }
  function () public payable { }
}