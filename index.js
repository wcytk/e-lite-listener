const { Web3 } = require('web3');

class EthereumListener {
    constructor(websocketProvider) {
        this.web3 = new Web3(websocketProvider);
    }

    // Listen to new blocks
    listenToNewBlocks(callback) {
        console.log('Subscribing to new block headers...');
        this.web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
            if (error) {
                console.error('Error in block header subscription:', error);
                return;
            }
            callback(blockHeader);
        });
    }

    // Listen to contract events
    listenToContractEvents(contractAddress, abi, eventName, callback) {
        const contract = new this.web3.eth.Contract(abi, contractAddress);
        contract.events[eventName]((error, event) => {
            if (error) {
                console.error(`Error in ${eventName} event subscription:`, error);
                return;
            }
            callback(event);
        });
    }

    // Listen to contract events with filters
    listenToContractEventsWithFilter(contractAddress, abi, eventName, filter, callback) {
        const contract = new this.web3.eth.Contract(abi, contractAddress);
        contract.events[eventName]({ filter }, (error, event) => {
            if (error) {
                console.error(`Error in ${eventName} event subscription with filter:`, error);
                return;
            }
            callback(event);
        });
    }

    // Get past events
    getPastEvents(contractAddress, abi, eventName, fromBlock, toBlock, callback) {
        const contract = new this.web3.eth.Contract(abi, contractAddress);
        contract.getPastEvents(eventName, { fromBlock, toBlock }, (error, events) => {
            if (error) {
                console.error(`Error in getting past ${eventName} events:`, error);
                return;
            }
            callback(events);
        });
    }

    // Get past events with filters
    getPastEventsWithFilter(contractAddress, abi, eventName, filter, fromBlock, toBlock, callback) {
        const contract = new this.web3.eth.Contract(abi, contractAddress);
        contract.getPastEvents(eventName, { filter, fromBlock, toBlock }, (error, events) => {
            if (error) {
                console.error(`Error in getting past ${eventName} events with filter:`, error);
                return;
            }
            callback(events);
        });
    }

    // Get transaction receipt
    getTransactionReceipt(txHash, callback) {
        this.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
            if (error) {
                console.error(`Error in getting transaction receipt for ${txHash}:`, error);
                return;
            }
            callback(receipt);
        });
    }

    // Get transaction
    getTransaction(txHash, callback) {
        this.web3.eth.getTransaction(txHash, (error, transaction) => {
            if (error) {
                console.error(`Error in getting transaction ${txHash}:`, error);
                return;
            }
            callback(transaction);
        });
    }

    // Get block
    getBlock(blockHash, callback) {
        this.web3.eth.getBlock(blockHash, (error, block) => {
            if (error) {
                console.error(`Error in getting block ${blockHash}:`, error);
                return;
            }
            callback(block);
        });
    }
}

module.exports = EthereumListener;
