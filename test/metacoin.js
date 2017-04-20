var AntiqueCoin = artifacts.require("./AntiqueCoin.sol");

let meta;



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
      console.log(stack.cutomer_name, stack.total_alocate_amount, stack.rate, stack.token_value)
    })
    lists.forEach((list) => {
      console.log(list.cutomer_name, list.allocations, list.total_alocate_amount, list.plus, list.rate)
    })
  })
})