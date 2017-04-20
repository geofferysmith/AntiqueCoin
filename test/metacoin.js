const AntiqueCoin = artifacts.require("./AntiqueCoin.sol");
var keythereum = require("keythereum");
let meta;
let allocations;

contract('AntiqueCoin', function (accounts) {
  const owner = accounts[0]

  it("should put  10000000000*10^18 AntiqueCoin in the first account", function (done) {
    AntiqueCoin.new(owner, 10000000000 * 10 ^ 18).then((_meta) => {
      meta = _meta;
      return meta.balanceOf.call(owner);
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
      assert.strictEqual(token_address, owner);
    }).then(() => meta.totalSupply.call({
      from: owner
    })).then((totalSupply) => {
      assert.strictEqual(totalSupply.toNumber(), 10000000000 * 10 ^ 18)
    }).then(done).catch(done)
  })
  it("should migrate token allocations for all token holders", function (done) {
    const data = require('../data.json')
    var numeral = require('numeral');
    data.forEach((customer, i) => {
      data[i].token_value = numeral(customer.total_alocate_amount).value() / Number(customer.rate)
      data[i].token_value = data[i].token_value.toFixed()
    })

    const lists = []
    data.forEach((customer) => {
      const stack = customer
      const index = lists.map((s) => s.customer_id).indexOf(customer.customer_id)

      stack.total_deposit = numeral(customer.total_alocate_amount).value()
      stack.total_alocation = numeral(customer.token_value).value()

      if (index > -1) {
        lists[index].total_deposit += numeral(customer.total_alocate_amount).value()
        lists[index].total_alocation += numeral(customer.token_value).value()
      } else {
        lists.push(stack)
      }
      // console.log(stack.cutomer_name, stack.total_alocate_amount, stack.rate, stack.token_value)
    })
    lists.forEach((list) => {
      console.log(list.cutomer_name, list.total_deposit, list.total_alocation)
    })

    allocations = lists
    done()
  })
  it("should deploy allocations for all token holders", function (done) {
    const data = []
    const balance_start = web3.eth.getBalance(owner)
    allocations.forEach((customer, i) => {
      var params = {
        keyBytes: 32,
        ivBytes: 16
      };
      var dk = keythereum.create(params);
      const address = keythereum.privateKeyToAddress(dk.privateKey)

      //  / console.log(address, dk.privateKey.toString('hex'))
      const meta = {
        name: customer.cutomer_name,
        deposit_jpy: customer.total_deposit,
        address: address,
        privkey: dk.privateKey.toString('hex'),
        allocate: customer.total_alocation
      }
      data.push(meta)
    })
    console.log(JSON.stringify(data, null, '\t'))
    data.forEach((cutomer) => {
      meta.transfer(cutomer.address, cutomer.allocate * 10 ^ 18, {
        from: owner,
        gas: 122388,
        gasPrice: 20000000000
      })

    })
    const balance = web3.eth.getBalance(owner)
    console.log(bbalance_start.toNumber(), alance.toNumber())
  })
})