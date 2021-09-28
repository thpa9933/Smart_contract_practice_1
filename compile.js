const path = require('path');
const fs = require('fs');
const solc = require('solc');

// because inbox.sol is solidity, JS doesnt like it,
// to access it we have to
// read in the source code from the file system
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

// (<source code>, <# of contracts to compile>)
// get the Inbox contract from the object
// console.log(solc.compile(source, 1)) if youd like to see
module.exports = solc.compile(source, 1).contracts[':Inbox'];  