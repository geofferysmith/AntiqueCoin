module.exports = {

  networks: {
    "dev": {
      network_id: 11, // Ethereum public network
      host: "localhost", // Random IP for example purposes (do not use)
      port: 8557,
      gas: 912388,
      gasPrice: 20000000000
       
    },
    "testrpc": {
      network_id: 12, // Official Ethereum test network
      host: "localhost",
      port: 8545,
      gas: 2400000

    },
    "production": {
      network_id: 1, // Official Ethereum  network
      host: "54.190.29.244",
      port: 8545,
      gas: 2400000
    },
    "staging": {
      network_id: 1337 // custom private network
        // use default rpc settings
    },
    "development": {
      network_id: "default"
    }
  }
};
