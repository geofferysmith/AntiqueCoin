var AntiqueCoin = artifacts.require("./AntiqueCoin.sol")

/*
const Converter = require("csvtojson").Converter;
const converter = new Converter({});

const read = (filename) => {
  return new Promise((resolve, reject) => {
    converter.fromFile(filename, function (err, resource) {
      if (err) return reject(err)
      resolve(resource)
    })
  })
}

var data = {
  contract: undefined
}

contract('AntiqueCoin', function (accounts) {
  describe('is Not Owner', function () {
    const owner = accounts[0]

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


    it('should correct TokenHolder balance and additionnal btps', (done) => {
      const owner = accounts[0]
       read("../../test/customers.csv").then((lists) => {
      lists.forEach((person) => {
        if (!person['ETHアドレス']) return
        console.log(person['名前'], person['ETHアドレス'], person['Normal purchase token'], person['Bonus token'])
        data.contract.register(
          person['ETHアドレス'],
          person['Normal purchase token'],
          person['Bonus token'], {
            from: owner
          }
        ).then((result) => console.log(result))
      })
    })
  })

  it('should be allocated token to all holders  = accounts[0]', (done) => {

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

  });
})
*/