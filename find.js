var Web3 = require('web3')

//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));
var eth = web3.eth;

// this is txhash
var tofind = "0x6ec34bcb0642c301c051518132e6c87fd1edf69d728fc709f47e283d24d2a5ed"


var result = web3.eth.getTransactionReceipt(tofind)


console.log(result)

// require result
// { blockHash: '0x2a739492ab6788166ccd48ac72b98b6ae2da8bd0551417f787dd9394c7ae62af',
//   blockNumber: 348209,
//   contractAddress: '0xbff305c787a6aea620b15cadd882ad622b981fd5',
//   cumulativeGasUsed: 216379,
//   from: '0x52da64497cc678d5fe56379e93fbc3a25293b0cc',
//   gasUsed: 216379,
//   logs: [],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   status: '0x1',
//   to: null,
//   transactionHash: '0x6ec34bcb0642c301c051518132e6c87fd1edf69d728fc709f47e283d24d2a5ed',
//   transactionIndex: 0 }