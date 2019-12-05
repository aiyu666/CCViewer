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
      if (
        localStorage.getItem(tabId.toString() + "ccMessageFL") != ccMessageFL
      ) {
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

chrome.runtime.onMessage.addListener(function(request, sendResponse) {
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
    chrome.tabs.sendMessage(
      parseInt(request.tabId),
      { action: "UpdateDiv", ccMessage: "" },
      function(res) {}
    );
    sendResponse({
      content: "Response from Background action: " + request.action
    });
  }
  sendResponse({
    content: "Response from Background action: " + request.action
  });
});
