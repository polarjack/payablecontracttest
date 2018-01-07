var Web3 = require('web3')
var fs = require('fs')
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var keythereum = require("keythereum");
var Tx = require("ethereumjs-tx");
var info = require('./info.js');

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

const contract_address = "0x1d89412f46a157617e640b9b726c7bc5039e55f3"

const Lock = eth.contract(contract_abi).at("0x1d89412f46a157617e640b9b726c7bc5039e55f3");

function book() {
  Lock.book(info.user_address, "1234556", "endtime", {
    from: eth.coinbase, 
    gas: 1000000
  },function(err, txhash) {
    if(!err) {
      console.log(txhash)
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
    gas: 1000000,
    value: web3.toWei("1.00001", "ether")
  }, function (err, txhash) {
    if(!err) {
      console.log(txhash)
    }
  })
}

function getLock() {
  var result = Lock.availableStartTime()
  console.log(result)
}

// setLock()
// ifbook()

iflife()

