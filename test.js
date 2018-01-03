var Web3 = require('web3')
var fs = require('fs')
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

var eth = web3.eth;


//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(
  fs.readFileSync("Test.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("Test.bin", "utf8");

// const test = web3.eth.contract(contract_abi)

// test.new({
//   from: eth.coinbase,
//   data: contract_bytecode,
//   value: web3.toWei("10", "ether"),
//   gas: 1000000
// }, function(err, contract) {
//   if(typeof contract.address !== 'undefined') {
//     console.log(contract.address)
//     console.log(contract.transactionHash);
//   }
// })

const test = web3.eth.contract(contract_abi).at("0xff78b08c0307ddc9c5dac4cc2caddcae328a3eda")

const want = test.getContractBalance()

// console.log(want)


// const receipt = web3.eth.getTransactionReceipt("0xe1fccdecc0269b94fc1f0493843c416bd3ffe7b15de4dfcfddbbad4e6e96642a")
// console.log(receipt)

// console.log(eth.coinbase)

