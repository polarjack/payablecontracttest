var Web3 = require('web3')
var fs = require('fs')
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var keythereum = require("keythereum");
var Tx = require("ethereumjs-tx");
var info = require('./info.js');

var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('ws://140.119.163.105:8546');

//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

var eth = web3.eth;

//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(
  fs.readFileSync("pay.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("pay.bin", "utf8");

const Lock = eth.contract(contract_abi).at("0xb3119f6f4547e29566da3befaaaa57f241329db1");

function sendMoney() {
  console.log("sendMoney")

  var user_address = "0x57b422e4c938cdec022288db581f0444bdf992ec"
  var user_password = "qwer"
  
  // var user_address = eth.coinbase
  // var user_password = "techfin"

  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, __dirname);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  // console.log(Lock)
  const contractData = Lock.sendtome.getData({
    data: contract_bytecode
  })

  console.log(contractData)

  var rawTx = {
    nonce: web3.eth.getTransactionCount(user_address),
    gasLimit: 2000000,
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
  // console.log("end")
}


function sendMoneyv2() {
  Lock.sendtome({
    from: "0x19660efca284687351bf051cad2dcfec98240114",
    gas: 1000000
  }, function(err, txhash) {
    if(!err) {
      console.log(txhash)
    }
    else {
      console.log(err)
    }
  })
}
function testing() {
  // var user = Lock.sendtome.getData({
  //   data: contract_bytecode
  // });
  // var sendmoney = Lock.sendmoney();

  console.log(user)
}

function valuetest() {
  var user_address = eth.coinbase
  var user_password = "techfin"

  // var user_address = eth.coinbase
  // var user_password = "techfin"

  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, __dirname);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  var rawTx = {
    // nonce => maintain by ourself
    nonce: web3.eth.getTransactionCount(user_address),
    gasLimit: 2000000,
    to: "0xb3119f6f4547e29566da3befaaaa57f241329db1",
    value: 30000000000000000
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
  // console.log("end")
}

sendMoneyv2()


// eth.sendTransaction({
//   from: "0x7bb2b8512feffb423ae62618042c9ca50f4467f9", 
//   to: "0xb9a2f0400f6534bb43411279f3a9d9cbe0aee895",
//   gas: 1000000,
//   value: 50000000000000000
// })
// eth.sendTransaction({
//   to: "0x7bb2b8512feffb423ae62618042c9ca50f4467f9", 
//   from: eth.coinbase,
//   gas: 1000000,
//   value: 1000000000000000000
// })

// sendMoney()
// testing()