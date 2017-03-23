var AntiqueCoin = artifacts.require("./AntiqueCoin.sol")

var data = {
  contract: undefined
}
contract('AntiqueCoin', function(accounts) {
  describe('is Not Owner', function() {
    const owner = accounts[1]

    it('should not changes token params that depends owner = accounts[0]', (done) => {
      AntiqueCoin.new("0xf8752a97918bafc48e7f4725aa7a8b2ac73a0b47", 1000000).then((_meta) => {
        data.contract = _meta
       // console.log(data.contract);
        return data.contract.founder.call({
          from: owner
        })
      }).then((token_address) => {
        console.log(token_address);
        assert.strictEqual(token_address, "0xf8752a97918bafc48e7f4725aa7a8b2ac73a0b47");
      }).then(() => data.contract.totalSupply.call({
        from: owner
      })).then((totalSupply) => {
        assert.strictEqual(totalSupply.toNumber(), 1000000)
      }).then(done).catch(done)
    })

    it('should not changes token params that depends owner = accounts[0]', (done) => {
      data.contract.balanceOf.call("0xf8752a97918bafc48e7f4725aa7a8b2ac73a0b47", {
        from: owner
      }).then((balance) => {
      //  console.log(balance)
        assert.strictEqual(balance.toNumber(), 1000000);
      }).then(() => data.contract.totalSupply.call({
        from: owner
      })).then((totalSupply) => {
        assert.strictEqual(totalSupply.toNumber(), 1000000)
      }).then(done).catch(done)
    })
  })
});
