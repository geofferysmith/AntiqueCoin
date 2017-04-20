var Antique = artifacts.require("./AntiqueCoin.sol");

const owner = web3.eth.accounts[0]

module.exports = function (deployer, network, accounts) {
  // deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(Antique, owner, web3.toWei(100000000, 'ether'));

};