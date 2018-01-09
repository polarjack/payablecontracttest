pragma solidity ^0.4.11;

contract Pay {
  address public owner;
  address public user;
  address public pay;
  uint public inputmoney;
  uint togo = 10000000000000000;

  function Pay(address _user) public payable{
    inputmoney = msg.value;
    owner = msg.sender;
    user = _user;
  }
  function addMoney() public payable {
    pay = msg.sender;
  }
  function sendtome() public {
    require(msg.sender == user);
    msg.sender.transfer(togo);
  }

  function () public payable { }
}