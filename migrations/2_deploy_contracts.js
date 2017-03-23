var AntiqueCoin = artifacts.require("./AntiqueCoin.sol");

module.exports = function(deployer) {

  deployer.deploy(AntiqueCoin, "0x0b5e5828a77f5a2c2f671d0a7d17df34c6daa8c9", 120000000*1000000000000000000);
};
