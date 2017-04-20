var Antique = artifacts.require("./AntiqueCoin.sol");

module.exports = function (deployer) {
  // deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(Antique, 0x675cfbde546e7ef7a2a4c7470010ee5166622af2, 100000 * 10^18);
};