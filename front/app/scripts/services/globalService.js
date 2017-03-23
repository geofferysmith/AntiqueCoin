'use strict';
var globalService = function($http, $httpParamSerializerJQLike) {
    globalFuncs.checkAndRedirectHTTPS();
    ajaxReq.http = $http;
    ajaxReq.postSerializer = $httpParamSerializerJQLike;
    ajaxReq.getETHvalue = nodes.ethPrice.getETHvalue;

  var tabs = {
    generateWallet: {
      id: 0
    },
    myWallet: {
      id: 1
    },
    addWallet: {
      id: 2
    },
    sendTransaction: {
      id: 3,
      name: "NAV_SendEther",
      url: "send-transaction",
      mew: true,
      cx: true
    },
    swap: {
      id: 4
    },
    offlineTransaction: {
      id: 5
    },
    contracts: {
      id: 6
    },
    viewWalletInfo: {
      id: 7,
      name: "NAV_ViewWallet",
      url: "view-wallet-info",
      mew: true,
      cx: false
    }
  };
  var currentTab = 0;
  if(typeof chrome != 'undefined')
    currentTab = chrome.windows === undefined ? 0 : 3;
  return {
    tabs: tabs,
    currentTab: currentTab
  };
};
module.exports = globalService;
