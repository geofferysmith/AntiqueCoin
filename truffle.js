module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  },
  networks: {
    "parity": {
      network_id: 1, // Ethereum public network
      host: "localhost", // Random IP for example purposes (do not use)
      port: 8545,
      gas: 3712388
        // optional config values
        // host - defaults to "localhost"
        // port - defaults to 8545
        // gas
        // gasPrice
        // from - default address to use for any transaction Truffle makes during migrations
    },
    "geth": {
      network_id: 1, // Official Ethereum test network
      host: "localhost",
      port: 8545,
      gas: 3712388
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
