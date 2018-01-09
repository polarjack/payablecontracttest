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
  fs.readFileSync("pay.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("pay.bin", "utf8");


// 欲獲得之 address
var user_address = info.host_address;
var user_password = info.host_password;


const Lock = eth.contract(contract_abi);


function deploy() {
  Lock.new(info.host_address, 500, {
    from: eth.coinbase,
    data: contract_bytecode,
    gas: 1000000
  }, function (err, contract) {
    if (typeof contract.address != 'undefined') {
      console.log("Address: " + contract.address + " Transaction Hash: " + contract.transactionHash);
    } else {
      console.log(err)
    }
  })
}

function rawtx() {

  var user_address = "0x7bb2b8512feffb423ae62618042c9ca50f4467f9";
  var user_password = "123456"

  // var user_address = eth.coinbase;
  // var user_password = "techfin"

  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, __dirname);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  const contractData = Lock.new.getData(eth.coinbase ,{
    data: contract_bytecode
  })

  var rawTx = {
    // nonce => maintain by ourself
    nonce: web3.eth.getTransactionCount(user_address),
    gasLimit: 1000000,
    data: contractData,
    value: 10000000000000000
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
  
  setTimeout(() => {
    var receipt = web3.eth.getTransactionReceipt(txhash)
    console.log(receipt.contractAddress)
  }, 6000)
}

rawtx()