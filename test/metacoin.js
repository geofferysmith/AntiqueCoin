var AntiqueCoin = artifacts.require("./AntiqueCoin.sol");

let meta;

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

contract('AntiqueCoin', function (accounts) {
  const owner = accounts[0]
  it("should put  10000000000*10^18 AntiqueCoin in the first account", function (done) {
    AntiqueCoin.new("0xf8752a97918bafc48e7f4725aa7a8b2ac73a0b47", 10000000000 * 10 ^ 18).then((_meta) => {
      meta = _meta;
      return meta.balanceOf.call('0xf8752a97918bafc48e7f4725aa7a8b2ac73a0b47');
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 10000000000 * 10 ^ 18, "10000 wasn't in the first account");
      done()
    });
  });
  it("should call a function that take founder", function (done) {
    meta.founder.call({
      from: owner
    }).then((token_address) => {
      console.log(token_address);
      assert.strictEqual(token_address, "0xf8752a97918bafc48e7f4725aa7a8b2ac73a0b47");
    }).then(() => meta.totalSupply.call({
      from: owner
    })).then((totalSupply) => {
      assert.strictEqual(totalSupply.toNumber(), 10000000000 * 10 ^ 18)
    }).then(done).catch(done)
  })
  it("should migrate token allocations for all token holders", function (done) {
    read('../test/data.csv').then((data) => {
      console.log(data)
      done()
    })
   
  })
})