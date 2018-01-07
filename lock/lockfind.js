var Web3 = require('web3')
var fs = require('fs')
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var keythereum = require("keythereum");
var Tx = require("ethereumjs-tx");
var info = require('./info.js');

//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

var eth = web3.eth;

var txhash = "0xb4ced150b7753416861272067db81a5bd9ba0834b62890db234455cc03b34c6f"

var result = web3.eth.getTransactionReceipt(txhash)
console.log(result.contractAddress)