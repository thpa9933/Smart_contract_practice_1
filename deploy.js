require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    process.env.NMENONIC,
    process.env.INFURA
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from acount', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: bytecode,
            arguments: ['Deploying account!']
        })
        .send({ 
            gas: '1000000',
            gasPrice: '5000000000',
            from: accounts[0]
        });

    console.log('Contract deployed to: ', result.options.address);
};

deploy();