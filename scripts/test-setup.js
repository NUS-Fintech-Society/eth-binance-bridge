const Web3 = require('web3');
const TestContract = require('../build/contracts/TestContract.json')
/* pending contracts implementation
const BridgeEth = require('../build/contracts/BridgeEth.json');
const BridgeBsc = require('../build/contracts/BridgeBsc.json');
*/

//deploying on local testnet
const init = async() => {
    const provider = new Web3.providers.WebsocketProvider('http://localhost:9545');
    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    const deployedNetwork = TestContract.networks[id];
    const contract = new web3.eth.Contract(
        TestContract.abi,
        deployedNetwork.address
    );

    const addresses = await web3.eth.getAccounts();
    await contract.methods.emitEvent('hello').send({
        from: addresses[0]
    });
    contract.events.TestEvent({fromBlock:0}, function(event) {console.log(event);})
    .on('data', event => console.log(event));
}

init();
