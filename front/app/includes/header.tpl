<!DOCTYPE html>
<html lang="en" ng-app="mewApp">
<head>
  <meta charset="utf-8">
  <title>XNC Wallet</title>
  <link rel="canonical" href="" />
  <meta name="description" content="Universal Wallet">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/etherwallet-master.min.css">
  <script type="text/javascript" src="js/etherwallet-static.min.js"></script>
  <script type="text/javascript" src="js/etherwallet-master.js"></script>


  <link rel="manifest" href="images/fav/manifest.json">
  <link rel="shortcut icon" href="images/favicon.ico">
  <meta name="msapplication-TileColor" content="#2e4868">
  <meta name="msapplication-TileImage" content="images/fav/mstile-144x144.png">
  <meta name="msapplication-config" content="images/fav/browserconfig.xml">
  <meta name="theme-color" content="#2e4868">
</head>

<body>

<header ng-controller='tabsCtrl'>
  @@if (site === 'cx' ) {
    <a href="" class="small announcement annoucement-warning" target="_blank">
      <div class="container" translate="CX_Warning_1">Make sure you have <strong>external backups</strong> of any wallets you store here. Many things could happen that would cause you to lose the data in this Chrome Extension, including uninstalling the extension. This extension is a way to easily access your wallets, <strong>not</strong> a way to back them up.</div>
    </a>
  }
  <section class="container-fluid bg-gradient header-branding">
    <section class="container">

      @@if (site === 'mew' ) { <a class="brands" style="padding:12px;width:90px"  href=""><img src="images/xnccoin.png" height="60px" width="auto" alt="XNCWallet" /><a style="font-size:28px;font-family:'cursive'"> XNC Wallet</a></a> }
      @@if (site === 'cx' ) { <a class="brand" href="/cx-wallet.html"><img src="images/etherwalletcx-logo.svg" height="64px" width="auto" alt="MyEtherWallet" /></a> }


      <div class="tagline">
        <span class="dropdown" ng-cloak>
          <a class="dropdown-toggle" ng-click="dropdown = !dropdown"> {{curLang}} <span class="caret"></span></a>
          <ul class="dropdown-menu" ng-show="dropdown">
            <li><a ng-class="{true:'active'}[curLang=='English']" ng-click="changeLanguage('en','English')">English</a></li>
            <li><a ng-class="{true:'active'}[curLang=='日本語']" ng-click="changeLanguage('ja','日本語')">日本語</a></li>
            <li><a ng-class="{true:'active'}[curLang=='中文']" ng-click="changeLanguage('zh','中文')">中文</a></li>
          </ul>
        </span>

        &nbsp;&nbsp;

       <!-- <span class="dropdown" ng-cloak>
          <a class="dropdown-toggle" ng-click="dropdownNode = !dropdownNode"> {{curNode.name}} <small>({{curNode.service}})</small> <span class="caret"></span></a>
          <ul class="dropdown-menu" ng-show="dropdownNode">
            <li ng-repeat="(key, value) in nodeList"><a ng-class="{true:'active'}[curNode == key]" ng-click="changeNode(key)">
              {{value.name}}
              <small> ({{value.service}}) </small>
              <img ng-show="value.service=='Custom'" img src="images/icon-remove.svg" class="node-remove" title="Remove Custom Node" ng-click="removeNodeFromLocal(value.name)"/>
            </a></li>
            <li><a ng-click="customNodeModal.open(); dropdownNode = !dropdownNode;"> Add Custom Node </a></li>
          </ul>
        </span>
        -->

      </div>
    </section>
  </section>
  <div class="small announcement annoucement-warning" ng-show="!nodeIsConnected">
    <div class="container">Unable to connect to node. See the help page for troubleshooting suggestions.</div>
  </div>
  <section class="container nav-container overflowing" >
    <a ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);" ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
    <div class="nav-scroll">
      <nav class="nav-inner">
        @@if (site === 'mew' ) {
        <span ng-repeat="tab in tabNames track by $index" class="nav-item" ng-class="{active: $index==activeTab}" ng-show="{{tab.mew}}" ng-click="tabClick($index)"> <a translate="{{tab.name}}"></a></span>
        }
        @@if (site === 'cx' ) {
        <span ng-repeat="tab in tabNames track by $index" class="nav-item" ng-class="{active: $index==activeTab}" ng-show="{{tab.cx}}" ng-click="tabClick($index)"> <a translate="{{tab.name}}"></a></span>
        }
      </nav>
    </div>
    <a ng-show="showRightArrow" class="nav-arrow-right" ng-click="scrollRight(100);" ng-mouseover="scrollHoverIn(false,2);" ng-mouseleave="scrollHoverOut()">&#187;</a>
  </section>


  <!-- Info Modal -->
  <div class="modal fade" id="customNodeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title"> Set Up Your Custom Node </h4>
        </div>
        <div class="modal-body row">
        <div class="col-xs-12">
          <!-- Only show this if they are NOT on https -->
          <p ng-show="browserProtocol!='https:'">
            <strong>To connect to a local node...</strong>
            <ul>
              <li> URL: http://127.0.0.1</li>
              <li> Port: 8545 </li>
              <li> Run geth: <code>geth --rpc --rpccorsdomain "null" --keystore "dont_put_secret_files_here_ever"</code></li>
              <li> Run Parity: <code>parity --rpccorsdomain "*" --keys-path "dont_put_secret_files_here_ever"</code></li>
            </ul>
          </p>
          <div ng-show="browserProtocol=='https:'" class="alert alert-danger">Your node must be HTTPS in order to connect to it via MyEtherWallet.com. You can <a href="https://github.com/kvhnuke/etherwallet/releases/latest" target="_blank">download the MyEtherWallet repo & run it locally</a> to connect to any node. Or, get free SSL certificate via <a href="https://letsencrypt.org/" target="_blank">LetsEncrypt</a>.</div>
        </div>
          <div class="form-group col-xs-12">
            <label>Node Name</label>
            <input class="form-control" type="text" placeholder="My ETH Node" ng-model="customNode.name"  ng-class="Validator.isAlphaNumericSpace(customNode.name) ? 'is-valid' : 'is-invalid'">
          </div>
          <div class="form-group col-xs-9">
            <label>URL</label>
            <input class="form-control" type="text" placeholder="https://127.0.0.1" ng-model="customNode.url" ng-class="checkNodeUrl(customNode.url) ? 'is-valid' : 'is-invalid'">
          </div>
          <div class="form-group col-xs-3">
            <label>Port</label>
            <input class="form-control" type="text" placeholder="8545" ng-model="customNode.port" ng-class="Validator.isPositiveNumber(customNode.port) || customNode.port=='' ? 'is-valid' : 'is-invalid'">
          </div>
          <div class="form-group col-xs-12">
            <label>Options</label>
            <span class="radio">
              <label><input name="options" type="radio" ng-model="customNode.options" value="eth"> ETH </label>
              <label><input name="options" type="radio" ng-model="customNode.options" value="etc"> ETC </label>
              <label><input name="options" type="radio" ng-model="customNode.options" value="rop"> Ropsten </label>
              <label><input name="options" type="radio" ng-model="customNode.options" value="cus"> Custom </label>
              <label ng-show="customNode.options=='cus'"><input type="checkbox" ng-model="customNode.eip155" value="true">  Supports EIP-155</label><br>
            </span>
          </div>
          <div class="col-sm-4 col-xs-12" ng-show="customNode.eip155">
            <label>Chain ID</label>
            <input class="form-control" type="text" placeholder="" ng-model="customNode.chainId" ng-class="Validator.isPositiveNumber(customNode.chainId) ? 'is-valid' : 'is-invalid'">
          </div>
          <div class="form-group" ng-bind-html="addNodeStatus"></div>
        </div>

        <div class="modal-footer text-center">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" ng-click="saveCustomNode()">Save & Use Custom Node</button>
        </div>

      </div>
    </div>
  </div>
  <!-- / Info Modal -->

</header>
