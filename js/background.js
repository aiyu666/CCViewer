function setTabId(tabId){
  var storage = chrome.storage.local;
  storage.get("tabIdList", function(result) {
    console.log(result.listenTabId);
    console.log("I can get listentab list in content script ");
  });
}

function backgroundWoker(listenTabId) {
  chrome.tabs.sendMessage(
    parseInt(listenTabId),
    { action: "getLyrics" },
    function(response) {
      var ccMessageFL = response.ccMessage.dataFL;
      var ccMessageSL = response.ccMessage.dataSL;
      if (ccMessageFL == undefined) {
        ccMessageFL = null;
      }
      if (ccMessageSL == undefined) {
        ccMessageSL = null;
      }
      if (localStorage.getItem("ccMessageFL") != ccMessageFL) {
        chrome.tabs.sendMessage(
          parseInt(tabId),
          { action: "UpdateDiv", id: "ccViewFL", ccMessage: ccMessageFL },
          function(res) {
            localStorage[tabId.toString() + "ccMessageFL"] = ccMessageFL;
          }
        );
      }
      if (
        localStorage.getItem(tabId.toString() + "ccMessageSL") != ccMessageSL
      ) {
        chrome.tabs.sendMessage(
          parseInt(tabId),
          { action: "UpdateDiv", id: "ccViewSL", ccMessage: ccMessageSL },
          function(res) {
            localStorage[tabId.toString() + "ccMessageSL"] = ccMessageSL;
          }
        );
      }
    }
  );
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "Set listenTabId"){
     chrome.storage.local.set({"listenTabId":request.listenTabId},function(result){
        sendResponse({
          content: "Set listenTabId success"
        })
     })
  }
  if (request.action == "Set tabId") {
    console.log("I get tabId's requests>>>>>>>>" + sender.tab.id);
    setTabId(sender.tab.id);
    sendResponse({
      action: "I get tabId in backgound"
    });
  }
  if (request.action == "Start Timer") {
    var timerId = setInterval(function() {
      backgroundWoker(request.listenTabId);
    }, 250);
    sendResponse({
      content: "Response from Background action: " + request.action,
      timerId: timerId
    });
  }
  if (request.action == "Stop Timer") {
    clearInterval(request.timerId);
    chrome.tabs.sendMessage(parseInt(request.tabId), {
      action: "UpdateDiv",
      ccMessage: ""
    });
    sendResponse({
      content: "Response from Background action: " + request.action
    });
  }
  sendResponse({
    content: "Response from Background action: " + request.action
  });
});
