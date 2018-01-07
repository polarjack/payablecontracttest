pragma solidity ^0.4.11;

contract Lock {
  address public admin;
  bool life;

  address public host;
  string public availableStartTime;
  string public availableEndTime;
  uint public pricePerDay;
  bool public ifbook;

  address public user;
  string public validStartTime;
  string public validEndTime;

  string lockendblock;

  modifier onlyadmin() {
    require(admin == msg.sender);
    _;
  }

  modifier onlyhost() {
    require(host == msg.sender);
    _;
  }

  modifier onlyuser() {
    require(user == msg.sender);
    _;
  }

  function Lock(address _host, string _startTime, string  _endTime, uint _price) public {
    admin = msg.sender;

    host = _host;
    availableStartTime = _startTime;
    availableEndTime = _endTime;
    pricePerDay = _price;
    
    life = true;
    ifbook = false;
  }

  function book(address _user, string _startTime, string _endTime) public {
    user = _user;
    validStartTime = _startTime;
    validEndTime = _endTime;
    ifbook = true;
  }

  function cancel(address _user) public {
    require(user == _user);
    user = 0x0;
    validStartTime = "";
    validEndTime = "";
    ifbook = false;
  }

  function disableContract() public onlyadmin {
    life = false;
  }

  function setlock(string _blockNumber) public {
    lockendblock = _blockNumber;
  }

  function getlock() public view returns (string) {
    require(user == msg.sender);
    return lockendblock;
  }
}
