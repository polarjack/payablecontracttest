var Web3 = require('web3')
var fs = require('fs')
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var keythereum = require("keythereum");
var Tx = require("ethereumjs-tx");


//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

var eth = web3.eth;

//generate contractData from contract_abi & contract_bytecode
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

//算出 privateKey
var privateKey = keythereum.recover(user_password, keyObject); 


const Test = eth.contract(contract_abi);

const contractData = Test.new.getData({
  data: contract_bytecode
});

var rawTx = {
  //nonce => maintain by ourself
  nonce: web3.eth.getTransactionCount(user_address),
  value: web3.toWei("10", "ether"),
  gasLimit: 1000000,
  data: contractData
};

// using ethereumjs-tx function
var tx = new Tx(rawTx);

//sign your transaction
tx.sign(privateKey);

//unknown function need to check
var serializedTx = tx.serialize();

var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
// var receipt = web3.eth.getTransactionReceipt(txhash)

console.log(txhash)