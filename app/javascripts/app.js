var accounts;
var account;
var account1

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function setStatus2(message) {
  var status = document.getElementById("status2");
  status.innerHTML = message;
};

function setStatus3(message) {
  var status = document.getElementById("status3");
  status.innerHTML = message;
};

function setStatus4(message) {
  var status = document.getElementById("status4");
  status.innerHTML = message;
};

function setStatus5(message) {
  var status = document.getElementById("status5");
  status.innerHTML = message;
};

function setStatus6(message) {
  var status = document.getElementById("status5");
  status.innerHTML = message;
};


function refreshBalance() {
  AntiqueCoin.setNetwork("1");
  var meta = AntiqueCoin.deployed()
  console.log(meta, account);
  meta.balanceOf.call(account, {
    from: account
  }).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf() * 10**-18;
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = AntiqueCoin.deployed();

  var amount = document.getElementById("amount").value;
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");
  var XNC_amount = web3.toWei(amount, 'ether')
  console.log(XNC_amount);
  meta.approve(receiver, XNC_amount, {
    from: account
  }).then(function(data) {
    return meta.allowance(account, receiver, {
      from: account
    })
  }).then(function(data) {
    console.log(data.toNumber());
    return meta.transferFrom(account, receiver, XNC_amount, {
      from: receiver
    })
  }).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

function registerAntique() {
  var meta = AntiqueCoin.deployed();

  var filehash = document.getElementById("filehash").value

  setStatus2("Initiating transaction... (please wait)");
  console.log(filehash);
  meta.founder.call().then(function(data) {
    str2 = web3.sha3(filehash)
    console.log("founder: ", data, "account", account);
    console.log(str2, str2.length);
    return meta.registerAntique(str2, {
      from: account
    })

  }).then(function(dataq) {
    console.log(dataq)
    return meta.antiques.call(str2)
  }).then(function(data) {

    setStatus2("Transaction complete!" + `  hash: ${str2}
                                            address: ${data}`);
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus2("Error sending coin; see log.");
  });
};

function transferAntique() {
  var meta = AntiqueCoin.deployed();

  var filehashhex = document.getElementById("transfer_filehash").value
  var to = document.getElementById("to").value;

  setStatus3("Initiating transaction... (please wait)");
  console.log(filehash);
  meta.founder.call().then(function(data) {
    console.log("founder: ", data, "account", account);
    console.log(to, filehashhex);
    return meta.transferAntique(to, filehashhex, {
      from: account
    })

  }).then(function(data) {
    console.log(data)

    setStatus3("Transaction complete!" + `newowner is : ${to}`);
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus3("Error sending coin; see log.");
  });
};

function whosAntique() {
  var meta = AntiqueCoin.deployed();

  var filehashhex = document.getElementById("filehashhex").value

  setStatus4("Initiating transaction... (please wait)");
  console.log(filehashhex);
  meta.founder.call().then(function(data) {
    console.log("founder: ", data, "account", account, filehashhex);
    return meta.antiques.call(filehashhex)

  }).then(function(data) {
    console.log(data)

    setStatus4("Transaction complete! owner is " + `: ${data}`);
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus4("Error sending coin; see log.");
  });
};

function getBalance() {
  var meta = AntiqueCoin.deployed();

  var address = document.getElementById("get_address").value


  setStatus5("Initiating transaction... (please wait)");
  console.log(address);
  meta.balanceOf.call(String(address)).then(function(data) {
    setStatus5(`address: ${address}, balance: ${data.toNumber()} = ${data.toNumber() * 10**-18} XNC`);

    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus5("Error sending coin; see log.");
  });
};

function changeOwner(){
  var meta = AntiqueCoin.deployed();


  var address = document.getElementById("next_owner_address").value

  setStatus6("Initiating transaction... (please wait)");
  console.log(address);
  meta.changeFounder(address ,{  from: account}).then(function(data) {
    setStatus6(`address: ${address}`);

    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus6("Error sending coin; see log.");
  });
}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    account1 = accounts[1];

    var account_view = document.getElementById("account");
    account_view.innerHTML = account.valueOf();



    refreshBalance();
  });
}
