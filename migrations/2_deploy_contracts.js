var AntiqueCoin = artifacts.require("./AntiqueCoin.sol");

module.exports = function(deployer) {

  deployer.deploy(AntiqueCoin, "0xF7cd4E7Fcc2df182804656a43cBC0172a9eFa133", 120000000*1000000000000000000);
};
