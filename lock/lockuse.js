var Web3 = require('web3')
var fs = require('fs')
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var keythereum = require("keythereum");
var Tx = require("ethereumjs-tx");
var info = require('./info.js');

var BigNumber = require('bignumber.js')

//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

var eth = web3.eth;

//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(
  fs.readFileSync("Lock.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("Lock.bin", "utf8");

// 欲獲得之 address
var user_address = info.user_address;
var user_password = info.user_password;

// find file form __dirname + '/keystore' => assign file address to import file
// __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
var keyObject = keythereum.importFromFile(user_address, __dirname);

// 算出 privateKey
var privateKey = keythereum.recover(user_password, keyObject);


const Lock = eth.contract(contract_abi).at("0x5fe0f132b00c99f4f25395c9455c111bd5a149e4");

function book() {
  Lock.book(info.user_address, {
    from: eth.coinbase,
    gas: 1000000
  }, function (err, txhash) {
    if (!err) {
      console.log(txhash)
    } else {
      console.log(err)
    }
  })
}

function ifbook() {
  var result = Lock.ifbook()
  console.log(result)
}

function iflife() {
  var result = Lock.life()
  console.log(result)
}

function setLock() {
  Lock.setlock("367838", {
    from: eth.coinbase,
    gas: 1000000
    // value: web3.toWei("1.00001", "ether")
  }, function (err, txhash) {
    if (!err) {
      console.log(txhash)
    }
    else {
      console.log(err)
    }
  })
}

function getPricePerDay() {
  var result = new BigNumber(Lock.pricePerDay())
  result = result.plus(21).toString(10);
  console.log(result)
}

function userEndTime() {
  var result = Lock.life();
  console.log(result)
}
// setLock()
// ifbook()

// iflife()

function testall() {
  var output = {}
  output.admin = Lock.admin();
  output.life = Lock.life();
  output.host = Lock.host();

  var temp = new BigNumber(Lock.pricePerDay());
  temp = temp.toString()

  output.pricePerDay = temp;
  output.ifbook = Lock.ifbook();
  output.user = Lock.user();
  output.locendblock = Lock.lockendblock();

  console.log(output)
}

// book()
// testall();
setLock();
