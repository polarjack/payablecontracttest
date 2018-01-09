var Web3 = require('web3')
var fs = require('fs')
var keythereum = require("keythereum");
var Tx = require("ethereumjs-tx");


//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

var eth = web3.eth;

var contract_abi = JSON.parse(
  fs.readFileSync("Test.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("Test.bin", "utf8");


// 欲獲得之 address
var user_address = "0x52da64497cc678d5fe56379e93fbc3a25293b0cc";
console.log(user_address)
var user_password = "techfin"

// find file form __dirname + '/keystore' => assign file address to import file
//__dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
var keyObject = keythereum.importFromFile(user_address, __dirname);

// 算出 privateKey
var privateKey = keythereum.recover(user_password, keyObject); 

const Test = eth.contract(contract_abi).at("0x8ed0639851390a0fd0bfadd2e8fd5324b4121f97");

// Test.updateBlockNumber("353700", {
//   from: eth.coinbase,
//   gas: 1000000
// }, function (err, result) {
//   if(!err) {
//     console.log(result);
//   }
//   else {
//     console.log(err)
//   }
// })

// var result = Test.registblock()
// console.log(result)

// Test.addMoney({
//   from: eth.coinbase,
//   value: web3.toWei("10", "ether"),
//   gas: 1000000
// }, function (err, result) {
//   if(!err) {
//     console.log(result);
//   }
//   else {
//     console.log(err)
//   }
// })


// Test.getBalance({
//   from: eth.coinbase,
//   gas: 100000
// }, function(err, result) {
//   if(!err) {
//     console.log(result)
//   }
// })

// const result = Test.getBlockNumber({
//   from: eth.coinbase,
//   gas: 1000000
// })

// console.log(result);


