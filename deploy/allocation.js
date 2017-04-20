const AntiqueCoin = artifacts.require("./AntiqueCoin.sol");
const fs = require('fs')
const keythereum = require("../node_modules/keythereum");
const numeral = require('../node_modules/numeral');
const json2csv = require('../node_modules/json2csv');
const owner = web3.eth.accounts[0]
const data = require('../data.json')
let meta;
let allocations;

module.exports = function () {

    AntiqueCoin.deployed().then((instance) => {
        meta = instance;
        console.log(meta.address)
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

        const base = []
        const b = web3.eth.getBalance(owner)
        const balance_start = b.toNumber()
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
            base.push(meta)
        })
        console.log(JSON.stringify(data, null, '\t'))
        base.forEach((cutomer) => {
            const value = web3.toWei(cutomer.allocate, 'ether');
            meta.transfer(cutomer.address, value, {
                from: owner,
                gas: 51388,
                gasPrice: 20000000000
            })
        })
        var fields = ['name', 'deposit_jpy', 'address', 'privkey', 'allocate'];

        try {
            var csv = json2csv({
                data: base,
                fields: fields
            });
            fs.writeFile('data.csv', csv, function (err) {
                if (err) throw err;
                console.log('file saved');
            });
        } catch (err) {
            // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
            // Be sure to provide fields if it is possible that your data array will be empty. 
            console.error(err);
        }

        setTimeout(() => {
            const balance = web3.eth.getBalance(owner).toNumber()
            console.log(balance_start, balance, balance_start - balance)

            base.forEach((customer) => {
                meta.balanceOf.call(customer.address).then((result) => {
                    console.log(result.toNumber())
                })
            })
        }, 12000)
    })
}