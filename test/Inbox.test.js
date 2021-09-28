const assert = require('assert');

// Our local test network
// Creates unlocked accounts to use
const ganache = require('ganache-cli');

// Web3 is uppercase because it is a constructor (lowercase is obj instance)
// Ensure you're using V1.x.x
const Web3 = require('web3');

// ganache is local test net
// provider is the communication layer to connect ganache --> Web3
const web3 = new Web3(ganache.provider());

// get contract information you exported in compile.js
const { interface, bytecode } = require('../compile');

// DEMO
// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// // 'it' statements are individual tests / assertions
// // 'describe' groups together 'it' statements
// // 'before each' executes general code set up that is common to all tests
// let car;
// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('has park function', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('has drive function', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
    // get a list of all ganache accounts
    accounts = await web3.eth.getAccounts();
        
    // use one of those accounts to deploy the contract
    // .deploy creates an object to deply
    // .send actually sends the transation to the network
    // inbox is your object to communicate with the contract! 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: bytecode,
            arguments: [INITIAL_STRING]
        })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('New message').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'New message')
    });
});